import React, { useEffect } from "react";
import {StyleSheet, Text, View, Image} from 'react-native';
import { Label } from "./label";
import { TRootStackParamList } from "../navigation/types";
import { StackScreenProps } from "@react-navigation/stack";

type CharacterProps = StackScreenProps<TRootStackParamList, 'character'>

export const Character = ({route, navigation}: CharacterProps) => {
    const { item } = route.params
    const { image, name, species, type } = item

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: image,
                    }}
                />
                <Text style={styles.text}>{name}</Text>
            </View>
            <Label
                title='Species'
                subtitle={species}
            ></Label>
            <Label
                title='Type'
                subtitle={type}
            ></Label>
            <Label
                title='Origin name'
                subtitle={name}
            ></Label>
            <Label
                title='Location name'
                subtitle={name}
            ></Label>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: '#fff',
        paddingLeft: 16,
        paddingRight: 16,
        height: '100%',
        paddingTop: 20
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: 5,
    },
    imageContainer: {
        marginBottom: 30,
        display: "flex",
        alignItems: "center"
    },
    text: {
        fontSize: 24,
        color: '#050510',
        fontWeight: "bold",
        marginLeft: 5,
        textAlign: "center",
    }
})