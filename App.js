import React from 'react'
import { StyleSheet, View } from 'react-native'
import Routes from "./src/Navigation/Routes";
import ColorPickerBasic from './src/Screens/ColorPickerBasic';

const App = () => {
  return (
    <View style={styles.container}>
      {/* <Routes /> */}
      <ColorPickerBasic />
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 }
});
