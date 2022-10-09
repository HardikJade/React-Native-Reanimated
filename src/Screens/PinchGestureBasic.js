import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Dimensions } from "react-native";

const imageUri = "https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80";
const AnimatedImage = Animated.createAnimatedComponent(Image);
const { height, width } = Dimensions.get('window');

const PinchGestureBasic = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);


  const pinchEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = (event.scale >= 2) ? 2 : ((event.scale <= 0.5) ? 0.5 : event.scale);
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => { scale.value = withTiming(1); }
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ]
    }
  })

  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler onGestureEvent={pinchEvent}>
        <AnimatedImage
          style={[styles.imageStyle, rStyle]}
          source={{ uri: imageUri }} />
      </PinchGestureHandler>
    </GestureHandlerRootView >
  )
}

export default PinchGestureBasic

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    height: "100%",
    width
  }
})