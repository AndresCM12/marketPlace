import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationProp } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function SettingsHomeScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  //Store user information
  const userInformation = useSelector((state: any) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>User information</Text>
      <View style={styles.informationContainer}>
        <Text>Username: {userInformation.name} </Text>
        <View style={styles.separator} />
        <Text>Email: {userInformation.email}</Text>
        <View style={styles.separator} />
        <Text>Phone: {userInformation.phone}</Text>
      </View>

      {/* Published offers */}
      <Text style={styles.offersTitle}>Published offers</Text>
      <TouchableOpacity
        style={styles.savedOffersContainer}
        onPress={() => {
          navigation.navigate("publishedOffers");
        }}
      >
        <Text style={{}}>See all published offers</Text>
        <Ionicons name={"chevron-forward-outline"} size={20} color={"grey"} />
      </TouchableOpacity>

      {/* Saved offers */}
      <Text style={styles.offersTitle}>Saved offers</Text>
      <TouchableOpacity
        style={styles.savedOffersContainer}
        onPress={() => {
          navigation.navigate("savedOffers");
        }}
      >
        <Text style={{}}>See all saved offers</Text>
        <Ionicons name={"chevron-forward-outline"} size={20} color={"grey"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 10 },
  listTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
  },
  offersTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 20,
  },
  informationContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
    opacity: 0.5,
  },
  savedOffersContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
