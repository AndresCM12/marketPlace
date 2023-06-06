import { Text, View } from "react-native";
import { Offer } from "../../../../Models";
import { StyleSheet } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

export default function SavedOffersScreen() {
  const [offers, setOffers] = React.useState<Array<Offer>>([]);
  //Store
  const savedOffers = useSelector((state: any) => state.userSavedOffers);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getOffers();
  }, []);

  const getOffers = () => {
    setOffers(savedOffers);
  };

  const generateOfferImage = (category: String) => {
    let color = "green";
    let icon: any = "test";
    switch (category) {
      case "Home":
        icon = "home";
        color = "red";
        break;
      case "Electronics":
        icon = "desktop";
        color = "blue";
        break;
      case "Health And Personal Care":
        icon = "medkit";
        color = "green";
        break;
      case "Clothes":
        icon = "shirt";
        color = "purple";
        break;
      default:
        icon = "cloud-offline";
        color = "gray";
        break;
    }
    return (
      <View
        style={{
          backgroundColor: color,
          height: 150,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          marginBottom: 10,
          opacity: 0.5,
        }}
      >
        <Ionicons name={icon} size={24} color={"white"} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Offers list */}
      <Text style={styles.listTitle}>Offers</Text>
      <View style={styles.offerListContainer}>
        {offers.length > 0 ? (
          <FlatList
            refreshing={true}
            data={offers}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.offerCard} key={item.id}>
                {generateOfferImage(item.category)}
                <View style={styles.titleWrapper}>
                  <Text style={styles.offerCardTitle}>{item.name}</Text>
                  <Text style={styles.offerCardPrice}>$ {item.price}</Text>
                </View>
                <Text style={styles.offerCardDescription}>
                  {item.description}
                </Text>

                <Text style={styles.offerCardDate}>{item.date}</Text>
                <Text style={styles.offerCardUserName}>{item.userName}</Text>
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.offerCard}>
                {generateOfferImage("")}
                <View style={styles.titleWrapper}>
                  <Text style={styles.offerCardTitle}>Loading</Text>
                  <Text style={styles.offerCardPrice}>$ 0</Text>
                </View>
                <Text style={styles.offerCardDescription}>...</Text>

                <Text style={styles.offerCardDate}>
                  {new Date().toUTCString()}
                </Text>
                <Text style={styles.offerCardUserName}>...</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <Text style={{ textAlign: "center", margin: 10 }}>No items</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: "100%" },
  offerListContainer: { flex: 1 },
  offerCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
  offerCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  offerCardDate: {
    fontSize: 10,
    color: "gray",
    margin: 10,
    marginVertical: 0,
  },
  offerCardDescription: {
    fontSize: 12,
    margin: 10,
  },
  offerCardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
  offerCardUserName: {
    fontSize: 10,
    color: "gray",
    margin: 10,
  },
  filtersChips: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    margin: 10,
  },
  listTitle: {
    fontSize: 12,
    fontWeight: "bold",
    margin: 10,
  },
  separator: {
    height: 10,
  },
});
