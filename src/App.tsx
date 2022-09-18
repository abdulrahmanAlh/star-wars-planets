import { useEffect } from "react";
import "./App.css";
import { CustomCard, CustomText } from "./components";
import { FetchPlanets, Planet } from "./core/groups/planet";
import { useSelector, useStore } from "./core/store";

// interface gender {
//   game: number;
//   gender: string;
// }

// const initial: gender = {
//   game: 1,
//   gender: "man",
// };
// const genderGroup = createGroup<gender>({
//   initialState: initial,
//   name: "details",
//   reducers: {
//     setGender: (state, { payload }: PayloadAction<string>) => {
//       state.gender = state.gender === "women" ? "man" : "women";
//     },
//   },
// });

// interface product {
//   name: string;
//   price: number;
//   isLoading: boolean;
// }

// const initialProduct: product = {
//   price: 10,
//   name: "t-shirt",
//   isLoading: false,
// };
// const productGroup = createGroup<product>({
//   initialState: initialProduct,
//   name: "products",
//   reducers: {
//     setProduct: (state, { payload }: PayloadAction<string>) => {
//       state.name = payload;
//       state.price = 20;
//     },
//     setIsloading: (state) => {
//       console.log(!state.isLoading);

//       state.isLoading = !state.isLoading;
//     },
//   },
// });

// const groups = combindGroups({
//   reducers: {
//     genderReducer: genderGroup,
//     productReducer: productGroup,
//   },
// });

// export const { useStore, useSelector, dispatch } = configureStore(groups);

// const getFromApi = async () => {
//   dispatch(productGroup.actions.setIsloading());
//   try {
//     await axios.get("https://swapi.dev/api/planets/");
//     dispatch(productGroup.actions.setIsloading());
//   } catch (error) {}
// };

function App() {
  const { isLoading, planets } = useSelector((state) => state.planet);

  useEffect(() => {
    FetchPlanets();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl text-center">Star War</h2>
      <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {isLoading
          ? "loading"
          : planets.map((plant: Planet) => (
              <CustomCard>
                <CustomText variant="primary">{plant.name}</CustomText>
              </CustomCard>
            ))}
      </div>
      {/* {gender + " "}
      <button onClick={() => dispatch(genderGroup.actions.setGender("woman"))}>
        change
      </button>
      {name} {price}
      <button
        onClick={() => dispatch(productGroup.actions.setProduct("Laptop"))}
      >
        change product
      </button> */}
    </div>
  );
}

export default App;
