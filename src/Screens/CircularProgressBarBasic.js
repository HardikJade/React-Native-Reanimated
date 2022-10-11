import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { Svg, Circle } from 'react-native-svg';
import { Dimensions } from "react-native";
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { ReText } from "react-native-redash";
const BACKGROUND_COLOR = "#444B6F";
const STROKE_COLOR = "#A6E1FA";
const BACKGROUND_STROKE_COLOR = "#303858";

const { height, width } = Dimensions.get('window');
const CIRCUMFERENCE = 800;
const RADIUS = CIRCUMFERENCE / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgressBarBasic = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return { strokeDashoffset: (CIRCUMFERENCE * progress.value) };
  });

  const progressText = useDerivedValue(() => {
    return Math.floor(progress.value * 100);
  });

  const onPressCallback = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 1000 });
  });

  return (
    <View style={styles.container}>

      {/* <ReText style={styles.textStyle} text={progressText}/> */}

      <Svg style={{ position: 'absolute' }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={RADIUS}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={20}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={RADIUS}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCUMFERENCE}
          animatedProps={animatedProps}
          strokeLinecap='round'
        />
      </Svg>

      <TouchableOpacity
        onPress={onPressCallback}
        style={styles.button}>
        <Text style={styles.buttonText}>RUN</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CircularProgressBarBasic

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR
  },
  textStyle: {
    fontSize: 80,
    color: '#fff',
    opacity: 0.7,
    fontWeight: 'bold',
    position: 'relative',
    bottom: 10,
    right: 5
  },
  button: {
    position: 'absolute',
    height: 60,
    width: width * 0.7,
    bottom: 80,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  buttonText: {
    fontSize: 25,
    letterSpacing: 2,
    color: '#fff'
  }

})