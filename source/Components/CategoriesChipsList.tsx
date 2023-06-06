import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Category } from "../Models";

//Add a selectedList prop to the component

export default function CategoriesChipsList(props: any) {
  const categories: Array<Category> = [
    { id: 0, name: "All" },
    { id: 1, name: "Home" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Health And Personal Care" },
    { id: 4, name: "Clothes" },
  ];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  React.useEffect(() => {
    setSelectedCategory(props.getSelectedCategory);
  }, [props.selectedList]);

  const checkIfSelected = (category: String) => {
    return selectedCategory === category;
  };

  const selectCategory = (category: String) => {
    setSelectedCategory("" + category);
    props.setSelectedCategory(category);
  };

  return (
    <View>
      <View>
        <FlatList
          data={categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => selectCategory(item.name)}
              style={
                checkIfSelected(item.name)
                  ? styles.selectedFilterChip
                  : styles.filtersChip
              }
            >
              <Text
                style={{
                  color: checkIfSelected(item.name) ? "#fff" : "#000",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersChip: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    margin: 10,
    marginRight: 4,
  },
  selectedFilterChip: {
    backgroundColor: "tomato",
    borderRadius: 10,
    padding: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    margin: 10,
    marginRight: 4,
  },
  separator: {
    height: 10,
  },
});
