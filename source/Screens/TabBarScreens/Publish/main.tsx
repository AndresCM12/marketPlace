import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
} from "react-native";
import CategoriesChipsList from "../../../Components/CategoriesChipsList";
import { useSelector, useDispatch } from "react-redux";
import { uploadOffer } from "../../../Utilities";

export default function PublishPage() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  //Store user information
  const user = useSelector((state: any) => state.user);

  const onChangeTitle = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setTitle(value);
  };
  const onChangeDescription = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setDescription(value);
  };
  const onChangePrice = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setPrice(value);
  };

  const buttonIsDisabled = () => {
    return (
      title === "" ||
      description === "" ||
      price === "" ||
      category === "" ||
      loading
    );
  };

  const sendNewOffer = async (
    title: String,
    description: String,
    price: number,
    category: String
  ) => {
    const createNewOffer = {
      description: description,
      name: title,
      price: price,
      category: category,
      userName: user.name,
      userId: user.id,
    };
    const response: any = await uploadOffer(createNewOffer);
    if (response.message === "Offer created") {
      alert("Offer created");
    } else {
      alert("Error creating offer");
    }
    console.log("⚡Debug: data", response);
  };
  // user should be able to publish the product(Offer) with: title description of the product, the price, and the category of the product
  //Title
  //Description
  //Price
  //Category

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>Offer information</Text>
      <View style={styles.postOfferCardContainerFlex}>
        <View style={styles.postOfferCardContainerItem}>
          <TextInput
            value={title}
            onChange={onChangeTitle}
            placeholder="Title"
          ></TextInput>
        </View>
        <View style={styles.postOfferCardContainerItem}>
          <TextInput
            value={price}
            onChange={onChangePrice}
            placeholder="Price"
          ></TextInput>
        </View>
      </View>
      <View style={styles.postOfferCardContainer}>
        <TextInput
          value={description}
          onChange={onChangeDescription}
          placeholder="Description"
          multiline={true}
        ></TextInput>
      </View>
      <Text style={styles.listTitleCategory}>Offer category</Text>
      <CategoriesChipsList
        setSelectedCategory={setCategory}
        getSelectedCategory={category}
      />
      <View style={styles.postButtonOffer}>
        <TouchableOpacity
          disabled={buttonIsDisabled()}
          style={
            buttonIsDisabled()
              ? styles.confirmButtonDisabled
              : styles.confirmButton
          }
          onPress={() => {
            setLoading(true);
            sendNewOffer(title, description, Number(price), category);
            setLoading(false);
          }}
        >
          <Text style={styles.buttonText}>Upload Offer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 10 },
  postOfferCardContainerFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 10,
  },
  postOfferCardContainerItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "black",
    marginBottom: 10,
    width: "48%",
  },
  listTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
  },
  listTitleCategory: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 10,
  },
  postOfferCardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "black",
    marginBottom: 10,
  },
  buttonStyle: {
    marginTop: 10,
  },
  postButtonOffer: {
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: "tomato",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    margin: 10,
    textAlign: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    margin: 10,
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
