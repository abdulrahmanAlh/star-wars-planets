import { useEffect, useState } from "react";
import { createEmitter } from "./emitter";
import produce from "immer";

let store: any = null;

export const createStore = (init: any) => {
  // create an emitter
  const emitter = createEmitter();

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

  const useSelector = (filter?: (state: any) => any) => {
    const { state } = useStore();

    return filter ? filter(state) : state;
  };
  return { useSelector, useStore, dispatch: store.dispatch };
};

export const configureStore = (state: any) =>
  createStore((get: any, set: any) => ({
    state,
    dispatch: ({
      action,
      payloadAction,
      groupName,
    }: {
      payloadAction: any;
      action: (state: any, action: PayloadAction) => void;
      groupName: string;
    }) => {
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

export type PayloadAction<
  P = any,
  T extends string = string,
  M = never,
  E = never
> = {
  payload: P;
  type: T;
} & ([M] extends [never]
  ? {}
  : {
      meta: M;
    }) &
  ([E] extends [never]
    ? {}
    : {
        error: E;
      });

export interface GropuAttributes<Type> {
  reducers: Record<string, (state: Type, action: PayloadAction) => void>;
  initialState: Type;
  name: string;
}

export interface Group<Type = any> {
  actions: Record<
    string,
    (payload?: any) => {
      payloadAction: any;
      action: (state: Type, action: PayloadAction) => void;
      groupName: string;
    }
  >;
  state: Type;
  name: string;
}

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

// export const useStore = (state: any, reduce: any) =>
//   createStore((get: any, set: any) => ({
//     state,
//     dispatch: (action: any) =>
//       set((store: any) => ({
//         state: reduce(store.state, action),
//         dispatch: store.dispatch,
//       })),
//   }))();
