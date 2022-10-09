import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { Dimensions } from "react-native";
import { GestureHandlerRootView, TapGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
const backImage = "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80";
const likeImage = "https://o.remove.bg/downloads/126381fe-84b4-413e-aa87-9039483a6a03/heart-image-13-removebg-preview.png";

const { width: SIZE } = Dimensions.get('window');
const AnimatedImage = Animated.createAnimatedComponent(Image);

const TapGesture = () => {

  const doubleTapRef = useRef();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }]
    };
  });

  const ballonStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value }
  });

  const singleTap = useCallback(() => {
    opacity.value = withTiming(1, undefined, (finished) => {
      if (finished) { opacity.value = withDelay(500, withTiming(0)); }
    });
  }, [])

  const doubleTap = useCallback(() => {
    scale.value = withSpring(1,
      {},
      () => { scale.value = withDelay(500, withSpring(0)); }
    );
  }, [])

  return (
    <GestureHandlerRootView style={styles.container}>

      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={singleTap}
      >

        <TapGestureHandler
          numberOfTaps={2}
          ref={doubleTapRef}
          maxDelayMs={250}
          onActivated={doubleTap}
        >

          <Animated.View
            style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >

            <ImageBackground
              style={styles.imageStyle}
              source={{ uri: backImage }}
            >
              <AnimatedImage
                style={[styles.likeStyle, rStyle]}
                source={{ uri: likeImage }}
              />

            </ImageBackground>

            <Animated.Text style={[styles.icon, ballonStyle]}>🎈🎈🎈🎈🎈🎈🎈🎈</Animated.Text>

          </Animated.View>


        </TapGestureHandler>

      </TapGestureHandler>

    </GestureHandlerRootView >
  )
}

export default TapGesture

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center'
  },
  likeStyle: {
    height: SIZE / 2,
    width: SIZE / 2,
    resizeMode: 'contain',
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowOpacity: 0.3,
    shadowRadius: 35,
    elevation: 10
  },
  icon: {
    fontSize: 30,
    marginTop: 5
  }
})