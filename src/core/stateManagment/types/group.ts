import { PayloadAction } from "./store";

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
