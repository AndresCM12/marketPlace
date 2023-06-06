import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logInUser, signUpUser } from "../../../Utilities";
import { userSlice } from "../../../Store/Slices/UserSlices";

export default function SignUpScreen() {
  //User Data
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [userData, setUserData] = React.useState({});

  //user errors
  const [emailError, setEmailError] = React.useState(false);

  //petition loading
  const [loading, setLoading] = React.useState(false);

  //Store
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  //Functions
  const onChangeName = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setName(value);
  };
  const onChangeEmail = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setEmailError(false);
    setEmail(value);
  };
  const onChangePassword = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setPassword(value);
  };
  const onChangePhone = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setPhone(value);
  };

  const saveToStore = (userData: any) => {
    dispatch(userSlice.actions.setUser(userData));
  };

  const checkForErrors = (userData: { message: String; data: {} }) => {
    if (userData.message == "User already exists") {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setUserData(userData.data);
    saveToStore(userData.data);
  };

  const buttonIsDisabled = () => {
    return (
      email === "" ||
      password === "" ||
      emailError ||
      loading ||
      name === "" ||
      phone === ""
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the shop!</Text>
      <View style={styles.textInputBackground}>
        <TextInput placeholder="Name" value={name} onChange={onChangeName} />
      </View>
      <View style={styles.textInputBackground}>
        <TextInput placeholder="Email" value={email} onChange={onChangeEmail} />
      </View>
      {emailError && (
        <Text style={styles.errorMessage}>Email already on use</Text>
      )}
      <View style={styles.textInputBackground}>
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChange={onChangePassword}
        />
      </View>
      <View style={styles.textInputBackground}>
        <TextInput placeholder="Phone" value={phone} onChange={onChangePhone} />
      </View>
      <TouchableOpacity
        style={
          buttonIsDisabled()
            ? styles.confirmButtonDisabled
            : styles.confirmButton
        }
        disabled={buttonIsDisabled()}
        onPress={async () => {
          setLoading(true);
          const userData = await signUpUser(name, email, password, phone);
          checkForErrors(userData);
          setLoading(false);
        }}
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={"black"} />
        ) : (
          <Text
            style={{
              color: buttonIsDisabled() ? "gray" : "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Sign Up
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  textInputBackground: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "tomato",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  confirmButtonDisabled: {
    backgroundColor: "#F8709234",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
});
