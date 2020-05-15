import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }
    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <MapView initialRegion={currentRegion} style={Styles.map}>
      <Marker coordinate={{ latitude: -23.7080804, longitude: -46.6933107 }}>
        <Image
          style={Styles.avatar}
          source={{
            uri: "https://avatars1.githubusercontent.com/u/48262427?s=460&v=4"
          }}
        />
        <Callout
          onPress={() => {
            navigation.navigate("Profile", {
              githun_username: "vininribeiro23"
            });
          }}
        >
          <View style={Styles.callout}>
            <Text style={Styles.devName}>Vinicius Ribeiro</Text>
            <Text style={Styles.devBio}>Full-Stack desenvolvedor</Text>
            <Text style={Styles.devTechs}> ReactJS, Node.js</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}

const Styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#24292e"
  },
  callout: {
    width: 260
  },

  devName: {
    fontWeight: "bold",
    fontSize: 16
  },
  devBio: {
    color: "#666",
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  }
});
export default Main;
