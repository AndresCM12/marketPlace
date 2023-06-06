//(description, price, category, promotional picture, and the user name of who is publishing this offer).
export interface Offer {
  id: number;
  description: string;
  name: string;
  price: number;
  category: String;
  userName: string;
  date: string;
  userId: number;
  saved?: boolean;
}

export interface Category {
  id: 0 | 1 | 2 | 3 | 4;
  name: "All" | "Home" | "Electronics" | "Health And Personal Care" | "Clothes";
}

export interface User{
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
}
