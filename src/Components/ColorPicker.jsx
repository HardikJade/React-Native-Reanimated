import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width: PICKER_WIDTH } = Dimensions.get("window");
const PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = PICKER_SIZE / 2;

const ColorPicker = ({ color, start, end, onColorChanged }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const adjustTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      PICKER_WIDTH * 0.9 - PICKER_SIZE
    );
  });

  const panEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      translateY.value = withSpring(-PICKER_SIZE);
      scale.value = withSpring(1.2);
      context.x = adjustTranslateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.x + event.translationX;
    },
    onEnd: () => {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: adjustTranslateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  const rInternalPicker = useAnimatedStyle(() => {
    const inputRange = color.map((_, index) => {
      return (index / color.length) * (PICKER_WIDTH * 0.9);
    });
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      color
    );
    onColorChanged(backgroundColor);
    return { backgroundColor };
  });

  const tapEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      translateY.value = withSpring(-PICKER_SIZE);
      scale.value = withSpring(1.2);
      translateX.value = withSpring(event.absoluteX);
    },
    onEnd: () => {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    },
  });
  return (
    <GestureHandlerRootView style={styles.container}>
      <TapGestureHandler onGestureEvent={tapEvent}>
        <Animated.View style={styles.container}>
          <LinearGradient
            colors={color}
            start={start}
            end={end}
            style={styles.linearGradient}
          ></LinearGradient>
          <PanGestureHandler onGestureEvent={panEvent}>
            <Animated.View style={[styles.picker, rStyle]}>
              <Animated.View style={[styles.internalPicker, rInternalPicker]} />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  linearGradient: {
    height: 50,
    width: PICKER_WIDTH * 0.9,
    backgroundColor: "red",
    height: 40,
    borderRadius: 20,
  },
  picker: {
    position: "absolute",
    height: PICKER_SIZE,
    width: PICKER_SIZE,
    borderRadius: PICKER_SIZE / 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  internalPicker: {
    height: INTERNAL_PICKER_SIZE,
    width: INTERNAL_PICKER_SIZE,
    borderRadius: INTERNAL_PICKER_SIZE / 2,
  },
});
