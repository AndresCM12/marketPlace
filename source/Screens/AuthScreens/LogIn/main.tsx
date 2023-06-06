import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { logInUser } from "../../../Utilities";
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from "../../../Store/Slices/UserSlices";

export default function LogInScreen() {
  //User Data
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userData, setUserData] = React.useState({});

  //user errors
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  //petition loading
  const [loading, setLoading] = React.useState(false);

  //Store
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

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
    setPasswordError(false);
    setPassword(value);
  };

  const checkForErrors = (userData: { message: String; data: {} }) => {
    if (userData.message == "User not found") {
      setEmailError(true);
      setPasswordError(false);
      return;
    }

    if (userData.message == "Password is incorrect") {
      setEmailError(false);
      setPasswordError(true);
      return;
    }

    if (userData.message == "User not found") {
      setEmailError(true);
      setPasswordError(false);
      return;
    }

    setEmailError(false);
    setPasswordError(false);
    setUserData(userData.data);
    saveToStore(userData.data);
  };

  const saveToStore = (newData: any) => {
    dispatch(userSlice.actions.setUser(newData));
  };

  const buttonIsDisabled = () => {
    return email === "" || password === "" || emailError || passwordError;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <View style={styles.textInputBackground}>
        <TextInput placeholder="Email" value={email} onChange={onChangeEmail} />
      </View>
      {emailError && <Text style={styles.errorMessage}>User not found</Text>}

      <View style={styles.textInputBackground}>
        <TextInput
          placeholder="password"
          value={password}
          secureTextEntry={true}
          onChange={onChangePassword}
        />
        {passwordError && (
          <Text style={styles.errorMessage}>Password is incorrect</Text>
        )}
      </View>
      <TouchableOpacity
        style={
          buttonIsDisabled() || loading
            ? styles.confirmButtonDisabled
            : styles.confirmButton
        }
        disabled={buttonIsDisabled() || loading}
        onPress={async () => {
          setLoading(true);
          const userData = await logInUser(email, password);
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
            Log In
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
