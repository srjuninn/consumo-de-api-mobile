import { StyleSheet, View } from 'react-native';
import { Home } from './screens/home';

export default function App() {
  return (
    <View style={styles.container}>
      <Home></Home>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272b33',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
