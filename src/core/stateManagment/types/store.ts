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

export type Action = (state: any, action: PayloadAction) => void;

export interface DispatchParams {
  payloadAction: any;
  action: Action;
  groupName: string;
}

export type SetFunction = (op: Function) => void;
export type GetFunction = () => Store;

export type Store = {
  state: any;
  dispatch: Function;
};
