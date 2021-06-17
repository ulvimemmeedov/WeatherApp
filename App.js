import React,{useState} from 'react';
import { Image, StyleSheet, Text, View} from 'react-native';
import { Appearance } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [CityName,SetCityName] = useState('');
  const [Country,SetCountry] = useState('');
  const [Icon,SetIcon] = useState('');
  const [Temp,SetTemp] = useState('');
  const [Textcon,SetTextcon] = useState('');
  const [Cloud,SetCloud] = useState('');
  const [En,SetEn] = useState('');
  const [Uzun,SetUzun] = useState('');
  const key = "44219db8c6ef46639fc133442211406";
  const getloc = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});  
    SetEn(location.coords.latitude.toString());
    SetUzun(location.coords.longitude.toString());
  }
  getloc()
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${En},${Uzun}&aqi=no`;
  fetch(url)
      .then(res => res.json())
      .then(res => {
        SetTemp(res.current.temp_c);
        SetCityName(res.location.name);
        SetCountry(res.location.country);
        SetIcon(res.current.condition.icon);
        SetTextcon(res.current.condition.text);
        SetCloud(res.current.cloud)
      })
      .catch(error => console.log(error));
  return (
    <View style={styles.weatherContainer}>
    <View style={styles.headerContainer}>
      <Image
        style={styles.logo}
        source={{uri: `https:${Icon}`}}
      />
      <Text style={styles.tempText}>{Temp}˚</Text>
      <Text style={styles.cloud} >Cloud {Cloud} </Text>
    </View>
    <View style={styles.bodyContainer}>
      <Text style={styles.title}>{Textcon}</Text>
      <Text style={styles.subtitle}>{CityName}, {Country}</Text>
    </View>
  </View>
  );
};
const colorScheme = Appearance.getColorScheme();

if (colorScheme === 'dark') {
  const styles = StyleSheet.create({
    logo: {
      width: 65,
      height: 58,
    },
    weatherContainer: {
      flex: 1,
      backgroundColor: 'black'
    },
    headerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    tempText: {
      fontSize: 48,
      color: '#fff'
    },
    bodyContainer: {
      flex: 2,
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      paddingLeft: 25,
      marginBottom: 40
    },
    title: {
      fontSize: 48,
      color: '#fff'
    },
    subtitle: {
      fontSize: 24,
      color: '#fff'
    },
    cloud: {
      fontSize: 24,
      color: '#fff'
    }
  });
}
const styles = StyleSheet.create({
  logo: {
    width: 65,
    height: 58,
  },
  weatherContainer: {
    flex: 1,
    backgroundColor: '#f7b733'
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempText: {
    fontSize: 48,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 48,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  },
  cloud: {
    fontSize:20,
    color: '#fff'
  }
});