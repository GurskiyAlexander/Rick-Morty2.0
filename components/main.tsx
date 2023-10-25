import { StackScreenProps } from '@react-navigation/stack';
import { TRootStackParamList } from '../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {StyleSheet, Text, View, Image, TextInput, FlatList, TouchableHighlight, ActivityIndicator,SafeAreaView} from 'react-native';
import {useState, useEffect} from 'react'
import axios from 'axios';

export type TMainProps = NativeStackScreenProps<TRootStackParamList, 'main'>
export type Data = {
    info: Info
    results: [Item],
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
    erpisode: [string],
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
        const data = axios.get<Data>(`https://rickandmortyapi.com/api/character`, {params: {page: loadNumberPage, name: filterText}})
        data.then(data => {
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
        navigation.push('character', {item})
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
                    // contentContainerStyle={{ flex: 1 }}
                    ListEmptyComponent={
                            <View style={styles.wrapper}>
                                <Text style={styles.title}>Мы никого не нашли</Text>
                                <Text style={styles.subtitle}>Попробуй скорректировать запрос</Text>
                            </View>
                    }
                    renderItem={({item}) =>
                        <TouchableHighlight
                            activeOpacity = {0.7}
                            onPress={() => tapedView(item)}
                        >
                            <View key={item.id} style={styles.item}>
                                <Image
                                    style={styles.characterLogo}
                                    source={{
                                        uri: item.image,
                                    }}
                                />
                                <Text style={styles.titleCharacter}>{item.name}</Text>
                            </View>
                        </TouchableHighlight>
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
    titleCharacter: {
        fontSize: 20,
        color: '#050510',
        fontWeight: "bold",
        marginLeft: 16,
        flexShrink: 1,
    },
    characterLogo: {
        width: 72,
        height: 72,
        borderRadius: 36,
        margin: 5,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingTop: 10,
        padding: 10,
        // paddingBottom: 10,
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
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 12,
    },
    subtitle: {
        color: '#97979B',
        fontSize: 16
    },
    wrapper: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    }
} );


