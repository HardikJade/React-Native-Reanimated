import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import ColorPicker from '../Components/ColorPicker';
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const COLORS = ["red", "purple", "blue", "cyan", "green", "yellow", "orange", "black", "white"];
const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";

const { width } = Dimensions.get("window");
const outSideCircle = width * 0.8;

const ColorPickerBasic = () => {
  const pickedColor = useSharedValue(COLORS[0]);
  const rPickedColor = useAnimatedStyle(() => {
    return { backgroundColor: pickedColor.value };
  });
  const onColorChanged = useCallback((colorValue) => {
    'worklet'
    pickedColor.value = colorValue;
  }, [])

  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rPickedColor]}></Animated.View>
      </View>
      <View style={styles.bottomContainer}>
        <ColorPicker
          color={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          onColorChanged={onColorChanged}
        />
      </View>
    </>
  )
}

export default ColorPickerBasic

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    height: outSideCircle,
    width: outSideCircle,
    borderRadius: (outSideCircle / 2),
    borderWidth: 10,
    borderColor: '#fff'
  }
})