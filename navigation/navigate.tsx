import { Main } from "../components/main"; 
import { Character } from "../components/character";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { TRootStackParamList } from "./types";

const Stack = createStackNavigator<TRootStackParamList>();

export const Navigate = () => {
    return <NavigationContainer>
        <Stack.Navigator screenOptions={{ 
            headerTintColor: '#000'
        }}>
            <Stack.Screen
                name = 'main'
                component= { Main }
                options = {{title:'Персонажи'}}
            />
            <Stack.Screen
                name = 'character'
                component= { Character }
                options = {{title:''}}
            />
        </Stack.Navigator>
    </NavigationContainer>
}