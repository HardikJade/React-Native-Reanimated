import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import Page from "./../Components/Page";

const WORD = ["What's", "up", "mobile", "dev?"];

const InterpolateWithScroll = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(
    (event) => { translateX.value = event.contentOffset.x; }
  );

  return (

    <Animated.ScrollView

      style={styles.container}
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      onScroll={scrollHandler}
    >
      {
        WORD.map((word, index) => <Page title={word} key={index} index={index} translateX={translateX}></Page>)
      }
    </Animated.ScrollView>
  )
}

export default InterpolateWithScroll

const styles = StyleSheet.create({
  container: { flex: 1 }
})