import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from '../Components/ListItem';

const TITLES = [
    "Record the dismissible tutorial",
    "Leave 👍 to video",
    "Check YouTube comments",
    "Subscribe to our channel 🚀",
    "Subscribe to our channel 🚀",
    "Subscribe to our channel 🚀",
    "Leave a ⭐ on GitHub repo"
];

const SwipeToDeleteBasic = () => {
    const onDismissCallback =
        useCallback((index) => {
            console.log(`item at index position ${index} deleted`);
        });
    const scrollRef = useRef(null);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollRef}
                style={{ flex: 1 }}>
                {
                    TITLES.map(
                        (item, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    task={{
                                        index,
                                        item,
                                        onDismissCallback,
                                        simultaneousHandlers: scrollRef
                                    }}>{item}</ListItem>
                            );
                        }
                    )
                }
            </ScrollView>
        </View>
    )
};
const BACKGROUND_COLOR = "#FAFBFF";

export default SwipeToDeleteBasic

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        paddingTop: (Platform.OS === 'android') ? StatusBar.currentHeight : 0
    }
})