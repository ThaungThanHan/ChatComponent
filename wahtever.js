import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function App() {
  const [errorMsg, setErrorMsg] = React.useState('');
  const [location, setLocation] = React.useState(null);
  const [CheckText, setCheckText] = React.useState('');

  React.useEffect(() => {
    setCurrentLocation();
  }, []);

  const setCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  return (
    <View style={styles.container}>
      {location ? <Text>latitude = {location.coords.latitude}</Text> : null}
      {location ? <Text>longitude = {location.coords.longitude}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems: 'center',
  },
});
