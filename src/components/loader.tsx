import { FC, ReactElement } from "react";
import { CustomSpinner } from "./spinner";

export interface LoaderProps {
  children: ReactElement | ReactElement[] | string;
  loading: boolean;
}

export const Loader: FC<LoaderProps> = ({ children, loading }) => {
  return loading ? <CustomSpinner /> : <>{children}</>;
};
