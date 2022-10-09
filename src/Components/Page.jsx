import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");
const Page = ({ title, index, translateX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, (width * 0.7) / 2, 0],
      Extrapolate.CLAMP
    );

    const size = interpolate(translateX.value, inputRange, [0, 1, 0]);

    return {
      borderRadius: borderRadius,
      transform: [{ scale: size }],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, inputRange, [
      height / 2,
      0,
      -(height / 2),
    ]);
    const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2]);
    return {
      transform: [{ translateY }],
      opacity,
    };
  });
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(0,0,256,0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]}>
        <Animated.View style={rTextStyle}>
          <Text style={styles.titleText}>{title}</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: width * 0.7,
    width: width * 0.7,
    backgroundColor: "rgba(0, 0, 256, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 70,
    color: "#fff",
    fontWeight: "bold",
  },
});
