import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  combindGroups,
  configureStore,
  createGroup,
  PayloadAction,
} from "./core";
import axios from "axios";

interface gender {
  game: number;
  gender: string;
}

const initial: gender = {
  game: 1,
  gender: "man",
};
const genderGroup = createGroup<gender>({
  initialState: initial,
  name: "details",
  reducers: {
    setGender: (state, { payload }: PayloadAction<string>) => {
      state.gender = state.gender === "women" ? "man" : "women";
    },
  },
});

interface product {
  name: string;
  price: number;
  isLoading: boolean;
}

const initialProduct: product = {
  price: 10,
  name: "t-shirt",
  isLoading: false,
};
const productGroup = createGroup<product>({
  initialState: initialProduct,
  name: "products",
  reducers: {
    setProduct: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
      state.price = 20;
    },
    setIsloading: (state) => {
      console.log(!state.isLoading);

      state.isLoading = !state.isLoading;
    },
  },
});

const groups = combindGroups({
  reducers: {
    genderReducer: genderGroup,
    productReducer: productGroup,
  },
});

export const { useStore, useSelector, dispatch } = configureStore(groups);

const getFromApi = async () => {
  dispatch(productGroup.actions.setIsloading());
  try {
    await axios.get("https://swapi.dev/api/planets/");
    dispatch(productGroup.actions.setIsloading());
  } catch (error) {}
};

function App() {
  const { dispatch } = useStore();

  const { gender } = useSelector((state) => state.details);
  const { name, price, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    getFromApi();
  }, []);

  return (
    <div>
      {isLoading ? "loading" : "done"} <br />
      {gender + " "}
      {/* {state.game} */}
      <button onClick={() => dispatch(genderGroup.actions.setGender("woman"))}>
        change
      </button>
      {name} {price}
      <button
        onClick={() => dispatch(productGroup.actions.setProduct("Laptop"))}
      >
        change product
      </button>
    </div>
  );
}

export default App;
