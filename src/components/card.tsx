import { FC, ReactElement } from "react";

export interface CustomCardProps {
  children: ReactElement | ReactElement[] | string;
}

export const CustomCard: FC<CustomCardProps> = ({ children }) => {
  return <div className="bg-neutral-700 p-3 rounded-lg ">{children}</div>;
};
