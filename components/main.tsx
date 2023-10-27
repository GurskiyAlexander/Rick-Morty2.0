import { StackScreenProps } from '@react-navigation/stack';
import { TRootStackParamList } from '../navigation/types';
import {StyleSheet, Text, View, Image, TextInput, FlatList, TouchableHighlight, ActivityIndicator,SafeAreaView} from 'react-native';
import {useState, useEffect} from 'react'
import axios from 'axios';
import { Empty_view } from './empty_view';
import { Character_Item } from './character_item';

export type Data = {
    info: Info
    results: Item[],
}

type Info = {
    count: number,
    pages: number,
    next: string
}

type Origin = {
    name: string,
    url: string
}
type Location = {
    name: string,
    url: string
}
export type Item = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: Origin,
    location: Location,
    image: string,
    episode: string[],
    url: string,
    created: string
}

type MainProps = StackScreenProps<TRootStackParamList, 'main'>

export const Main = ( { navigation } : MainProps) =>  {
    let countLastCharacter = 0
    const [isLoading, setIsLoading] = useState(true)
    const [characters, setCharacters] = useState<Item[]>([]);
    const [filterText, setFilterText] = useState('');
    const [loadNumberPage, setLoadNumberPage] = useState(1)
    useEffect(() => {
         axios.get<Data>(`https://rickandmortyapi.com/api/character`, {params: {page: loadNumberPage, name: filterText}})
        .then(data => {
            countLastCharacter = data.data.info.count
            setCharacters([...characters, ...data.data.results]);
        })
        .finally(() => {
            setIsLoading(false)
            }
        )

    }, [loadNumberPage, filterText]);

    const changeText = (text: string) => {
        setIsLoading(true)
        setCharacters([])
            setFilterText(text)
            setLoadNumberPage(1);
    }

    const tapedView = (item: Item) => {
        navigation.navigate('character', {item, titleHeader: item.name})
    }

    const loadMore = () => {
        if (countLastCharacter < characters.length) {
            setLoadNumberPage(loadNumberPage + 1)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => changeText(text)}
                value={filterText}
                placeholder="Введите имя"
            />
            { isLoading && (
                <View style={styles.wrapper}>
                    <ActivityIndicator size="large" color="#050510"/>
                </View>
            ) }
            { !isLoading && (
                <FlatList
                    data={characters}
                    onEndReachedThreshold={1}
                    onEndReached={loadMore}
                    ListEmptyComponent={
                            <Empty_view/>
                    }
                    renderItem={({item}) =>
                        <Character_Item 
                            item = { item } 
                            callback = { tapedView }
                        />
                    }
                />
            ) }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        borderColor: "gray",
        height: 50,
        borderWidth: 1,
        borderRadius: 18,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
    },
    wrapper: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    }
} );


