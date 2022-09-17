import axios from "axios";
import { createGroup, PayloadAction, store } from "../stateManagment";
// import { dispatch } from "../store";

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
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
    planets = planets.filter((planet) => planet.films.length > 0);
    let operations: any = [];
    for (let index = 0; index < planets.length; index++) {
      const plant = planets[index];
      plant.residents.forEach((person) => {
        operations.push(axios.get(person));
      });
      await Promise.all(operations).then((values) => {
        // TODO Set condtion here
        console.log(values);
      });
      operations = [];
    }

    dispatch(setPlanets(planets));
  } catch (error) {
    dispatch(setError("Error on fetch planets.."));
  } finally {
    dispatch(toggleLoading());
  }
};

export default productGroup;
