import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
const { width } = Dimensions.get('window');

const ReanimatedIntro = () => {
  const progress = useSharedValue(0.5);
  const scale = useSharedValue(0.5);
  const rotate = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * 100) / 2,
      transform: [
        { scale: scale.value },
        { rotate: rotate.value + 'deg' }
      ]
    };
  })
  useEffect(() => {
    progress.value = withRepeat(withSpring(1), 3, true)
    scale.value = withRepeat(withSpring(1), 3, true)
    rotate.value = withRepeat(withSpring(60), 2, true)
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedView,
          rStyle
        ]}
      ></Animated.View>
    </View>
  )
}

export default ReanimatedIntro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  animatedView: {
    height: width * 0.5,
    width: width * 0.5,
    backgroundColor: 'orange'
  }
})