import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const RADIUS = 300;
const SIDE = 100;

const PanGestureHandlerBasic = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.startXPosition = translateX.value;
            context.startYPosition = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = context.startXPosition + event.translationX;
            translateY.value = context.startYPosition + event.translationY;
        },
        onEnd: () => {
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
            if (distance < 200) {
                translateX.value = withSpring(0, { mass: 0.5 });
                translateY.value = withSpring(0, { mass: 0.5 });
            }
        }
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ]
        };
    });

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.circle}>
                <PanGestureHandler onGestureEvent={panGestureEvent}>
                    <Animated.View style={[styles.box, rStyle]}></Animated.View>
                </PanGestureHandler>
            </View>

        </GestureHandlerRootView>
    )
}

export default PanGestureHandlerBasic

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        height: SIDE,
        width: SIDE,
        backgroundColor: 'orange',
        borderRadius: 20,
        opacity: 0.8
    },
    circle: {
        height: RADIUS,
        width: RADIUS,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RADIUS / 2,
        borderWidth: 5,
        borderColor: 'red'
    }
})