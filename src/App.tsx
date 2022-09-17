import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  combindGroups,
  configureStore,
  createGroup,
  PayloadAction,
} from "./core";

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
}

const initialProduct: product = {
  price: 10,
  name: "t-shirt",
};
const productGroup = createGroup<product>({
  initialState: initialProduct,
  name: "products",
  reducers: {
    setProduct: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
      state.price = 20;
    },
  },
});

const groups = combindGroups({
  reducers: {
    genderReducer: genderGroup,
    productReducer: productGroup,
  },
});

const { useStore, useSelector } = configureStore(groups);

function App() {
  const { dispatch } = useStore();

  const { gender } = useSelector((state) => state.details);
  const { name, price } = useSelector((state) => state.products);

  return (
    <div>
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
