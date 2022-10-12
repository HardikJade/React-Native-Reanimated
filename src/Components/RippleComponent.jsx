import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const CIRCLE_RADIUS = 20;
const RippleComponent = ({ style, onTap, children }) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);

  const tapEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      centerX.value = event.x;
      centerY.value = event.y;
      console.log(centerX.value, centerY.value);
    },
    onActive: () => {
      onTap();
    },
    onEnd: () => {},
  });

  const rStyle = useAnimatedStyle(() => {
    const translateX = centerX.value - CIRCLE_RADIUS;
    const translateY = centerY.value - CIRCLE_RADIUS;
    return {
      width: CIRCLE_RADIUS * 2,
      height: CIRCLE_RADIUS * 2,
      borderRadius: CIRCLE_RADIUS,
      backgroundColor: "red",
      position: "absolute",
      opacity: 0.5,
      transform: [
        { scale: 0.7 },
        { translateX: translateX },
        { translateY: translateY },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1, width: "100%" }}>
      <TapGestureHandler onGestureEvent={tapEvent}>
        <Animated.View style={style}>
          <View>{children}</View>
          <Animated.View style={[rStyle]}></Animated.View>
        </Animated.View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};

export default RippleComponent;

const styles = StyleSheet.create({});
