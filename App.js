import React from 'react'
import { StyleSheet, View } from 'react-native'
import Routes from "./src/Navigation/Routes";
import RippleAnimation from "./src/Screens/RippleAnimation";

const App = () => {
  return (
    <View style={styles.container}>
      <Routes />
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 }
});
