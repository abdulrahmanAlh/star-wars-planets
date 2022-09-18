import axios from "axios";
import { MetaResponseAttributs, Planet } from "../models";
import { createGroup, PayloadAction, store } from "../stateManagment";

interface InitState {
  isLoading: boolean;
  error?: string;
  planets: Planet[];
  meta?: MetaResponseAttributs;
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
    setMeta: (state, { payload }: PayloadAction<MetaResponseAttributs>) => {
      state.meta = payload;
    },
  },
});

const { actions } = productGroup;

const { toggleLoading, setError, setPlanets, setMeta } = actions;

export const FetchPlanets = async (page = 1) => {
  let dispatch = store.dispatch;
  let state = store.state;

  try {
    //Start loading
    dispatch(toggleLoading());

    //check pagnation status
    let getUrl = "https://swapi.dev/api/planets";

    const res = await axios.get(getUrl, { params: { page } });
    const { results, ...rest } = res.data;

    let planets: Planet[] = results;
    // Condition one : Planet had been appeared in at least one movie
    planets = planets.filter((planet) => planet.films.length > 0);
    // Opeartions array...
    let operations: any = [];
    for (let index = 0; index < planets.length; index++) {
      const plant = { ...planets[index], haveReptiles: false };
      plant.residents.forEach((person) => {
        operations.push(axios.get(person));
      });
      let values = await Promise.all(operations);
      // Condition tow : If one of planet's people has reptiles the the planet has reptiles.
      // If you need ever person on planet has reptiles then you can use every function rethar than some function
      const haveReptiles = values.some((val) => val.data.species.length > 0);
      if (haveReptiles) {
        planets[index] = { ...plant, haveReptiles: true };
      }
      // Clear opertation for the next plant...
      operations = [];
    }
    // filter planets
    planets = planets.filter((planet) => planet.haveReptiles);

    //Get films titles for each planet

    // It's return names but it make response very slow
    let films: any = {};
    for (let index = 0; index < planets.length; index++) {
      const plant = planets[index];
      plant.films.forEach((film) => {
        if (!films[film]) {
          films.push(film);
          operations.push(axios.get(film));
        }
      });
      let values = await Promise.all(operations);
      planets[index] = { ...plant, films: values.map((val) => val.data.title) };
      operations = [];
    }

    dispatch(setMeta({ ...rest }));
    dispatch(setPlanets(planets));
  } catch (error) {
    dispatch(setError("Error on fetch planets.."));
  } finally {
    dispatch(toggleLoading());
  }
};

export default productGroup;
