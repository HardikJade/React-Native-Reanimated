import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import RippleComponent from '../Components/RippleComponent'

const RippleAnimation = () => {
  const tapFunction = useCallback(() => {
    'worklet';
    console.log("tap on the component");
  });

  return (
    <View style={styles.container}>
      <View style={styles.ripple}>
        <RippleComponent
          style={styles.rippleStyle}
          onTap={tapFunction}
        >
          <Text style={styles.textStyle}>TAP</Text>

        </RippleComponent>
      </View>
    </View>
  )
}

export default RippleAnimation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  ripple: {
    height: 200,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rippleStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: { fontSize: 25, }
})