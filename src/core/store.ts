import { combindGroups, configureStore } from "./stateManagment";
import PlanetReducer from "./groups/planet";

// create store
const groups = combindGroups({
  reducers: {
    planet: PlanetReducer,
  },
});

export const { useStore, useSelector, dispatch } = configureStore(groups);
