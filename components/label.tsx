import {StyleSheet, Text, View} from "react-native";
import React from "react";

type Props = {
    title: string,
    subtitle: string,
}

export const Label = ({ title, subtitle }: Props) => {
    return (
        <View>
            {subtitle !== '' && (
                <View style={styles.container}>
                <Text
                    style={styles.titleText}
                >{title}:</Text>
                <Text style={styles.valueText}>{subtitle}</Text>
            </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: '#fff',
        marginBottom: 20
    },
    titleText: {
        fontSize: 20,
        color: '#050510',
        fontWeight: "bold",
        marginLeft: 5,
    },
    valueText: {
        fontSize: 20,
        color: '#050510',
        marginLeft: 5,
        flexShrink: 1,
    },
})