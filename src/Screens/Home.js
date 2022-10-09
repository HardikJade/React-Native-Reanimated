import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Reanimated Introduction') }}
                style={styles.buttonStyle}>
                <Text>Reanimated Intro</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { navigation.navigate('Pan Gesture Handler Basic') }}
                style={styles.buttonStyle}>
                <Text>Pan Gesture Handler</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { navigation.navigate('Interpolate') }}
                style={styles.buttonStyle}>
                <Text>Interpolate</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { navigation.navigate('Pinch Gesture Handler Basic') }}
                style={styles.buttonStyle}>
                <Text>Pinch Gesture</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { navigation.navigate('Tap Gesture') }}
                style={styles.buttonStyle}>
                <Text>Tap Gesture</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { navigation.navigate('Color Picker') }}
                style={styles.buttonStyle}>
                <Text>Color Picker</Text>
            </TouchableOpacity>

        </View>

    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        flexWrap: 'wrap'
    },
    buttonStyle: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 10,
        width: 150
    }
})