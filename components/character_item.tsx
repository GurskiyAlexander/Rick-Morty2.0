import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Item } from './main';

type props = { item: Item, callback: (item: Item) => void }

export const Character_Item = ({ item, callback }: props) => {
    const { image, name, species, type } = item

    return (
    <TouchableHighlight
        activeOpacity = {0.7}
        onPress={() => callback(item)}
     >
        <View key={item.id} style={styles.item}>
        <Image
            style={styles.characterLogo}
            source={{
                uri: image,
            }}
        />
        <Text style={styles.titleCharacter}>{name}</Text>
        </View>
    </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
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
        padding: 10,
        backgroundColor: '#fff',
    },
} );







