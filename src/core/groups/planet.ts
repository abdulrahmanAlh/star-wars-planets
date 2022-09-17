import axios from "axios";
import { createGroup, PayloadAction, store } from "../stateManagment";
// import { dispatch } from "../store";

export interface Planet {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string;
  people: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}

interface InitState {
  isLoading: boolean;
  error?: string;
  planets: Planet[];
}

const initialState: InitState = {
  isLoading: false,
  planets: [],
};
const productGroup = createGroup<InitState>({
  initialState,
  name: "planet",
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    setPlanets: (state, { payload }: PayloadAction<Planet[]>) => {
      state.planets = payload;
    },
  },
});

const { actions } = productGroup;

const { toggleLoading, setError, setPlanets } = actions;

export const FetchPlanets = async () => {
  let dispatch = store.dispatch;
  dispatch(toggleLoading());
  try {
    const res = await axios.get("https://swapi.dev/api/planets");
    let planets: Planet[] = res.data.results;
    // planets = planets.filter((planet) => planet.films.length > 0);
    // let operations = [];
    // planets.forEach((plant)=>{

    // })
    dispatch(setPlanets(planets));
  } catch (error) {
    dispatch(setError("Error on fetch planets.."));
  } finally {
    dispatch(toggleLoading());
  }
};

export default productGroup;
