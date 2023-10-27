import { Text, View, StyleSheet } from 'react-native';


export const Empty_view = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Мы никого не нашли</Text>
            <Text style={styles.subtitle}>Попробуй скорректировать запрос</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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


