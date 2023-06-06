const API_URL =
  "https://us-central1-marketplaceproject-iv.cloudfunctions.net/widgets/api/";
const USER_LOGIN_URL = API_URL + "logIn/User";
const USER_SIGNUP_URL = API_URL + "signUp/User";
const OFFER_URL = API_URL + "getAllOffers";
const UPLOAD_OFFER_URL = API_URL + "offers";
const USER_OFFER_URL = API_URL + "offers/user";

export const logInUser = async (email: String, password: String) => {
  try {
    const response = await fetch(USER_LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const signUpUser = async (
  name: String,
  email: String,
  password: String,
  phone: String
) => {
  try {
    const response = await fetch(USER_SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

//TODO: Check why this is not working
// Sends the category but the backend doesnt receive it
export const getAllOffers = async (category: String) => {
  try {
    const response = await fetch(OFFER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const gettAllUserOffers = async (userId: String) => {
  try {
    const response = await fetch(USER_OFFER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const uploadOffer = async (newOffer: any) => {
  const response = await fetch(UPLOAD_OFFER_URL, {
    method: "POST",
    body: JSON.stringify(newOffer),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
