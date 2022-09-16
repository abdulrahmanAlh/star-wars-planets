import { FC, useReducer } from "react";
import { useStore } from "./utils";

export interface Action {
  payload: any;
  type: string;
}

export interface SMProviderProps {
  children: React.ReactNode;
  store: { state: any; reducer: (state: any, action: Action) => any };
}
export const SMProvider: FC<SMProviderProps> = ({ store, children }) => {
  const { state, dispatch } = useStore(store.state, store.reducer);
  return <>{children}</>;
};
