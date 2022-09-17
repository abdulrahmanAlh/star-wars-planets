import { useEffect, useState } from "react";
import { createEmitter } from "./utils/emitter";
import produce from "immer";
import {
  DispatchParams,
  GetFunction,
  GropuAttributes,
  Group,
  SetFunction,
  Store,
} from "./types";

let store: Store;

export const createStore = (init: Function) => {
  // create an emitter
  const emitter = createEmitter();

  const get: GetFunction = () => store;
  const set: SetFunction = (op: Function) => (
    (store = op(store)),
    // notify all subscriptions when the store updates
    emitter.emit(store)
  );
  store = init(set);

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

  const useSelector = (filter?: (state: any) => any) => {
    const { state } = useStore();

    return filter ? filter(state) : state;
  };
  return { useSelector, useStore, dispatch: store.dispatch };
};

export const configureStore = (state: any) =>
  createStore((set: SetFunction) => ({
    state,
    dispatch: ({ action, payloadAction, groupName }: DispatchParams) => {
      return produce(set)((store: any) => {
        store.state[groupName] = produce(action)(store.state[groupName], {
          payload: payloadAction,
          type: action.name,
        });
        return {
          state: store.state,
          dispatch: store.dispatch,
        };
      });
    },
  }));

export function createGroup<Type = any>(
  attributes: GropuAttributes<Type>
): Group<Type> {
  const actions: any = {};
  Object.keys(attributes.reducers).forEach((key: string) => {
    actions[key] = (payload: any) => ({
      payloadAction: payload,
      action: attributes.reducers[key],
      groupName: attributes.name,
    });
  });
  return { actions, state: attributes.initialState, name: attributes.name };
}

export interface CombindGroupsAttriburs {
  reducers: Record<string, Group>;
}

export function combindGroups(attributes: CombindGroupsAttriburs) {
  const { reducers } = attributes;
  const state: any = {};
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    state[reducer.name] = reducer.state;
  });
  return state;
}
