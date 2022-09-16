import { useEffect, useState } from "react";
import { createEmitter } from "./emitter";

export const createStore = (init: any) => {
  // create an emitter
  const emitter = createEmitter();

  let store: any = null;
  const get = () => store;
  const set = (op: any) => (
    (store = op(store)),
    // notify all subscriptions when the store updates
    emitter.emit(store)
  );
  store = init(get, set);

  const useStore = () => {
    // intitialize component with latest store
    const [store, setStore] = useState(get());

    // update our local store when the global
    // store updates.
    useEffect(() => {
      emitter.subscribe(setStore);
    }, []);
    return store;
  };
  return useStore;
};
export const useStore = (state: any, reduce: any) =>
  createStore((get: any, set: any) => ({
    state,
    dispatch: (action: any) =>
      set((store: any) => ({
        state: reduce(store.state, action),
        dispatch: store.dispatch,
      })),
  }))();
