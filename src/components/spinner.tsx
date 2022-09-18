import { FC, ReactElement } from "react";

export interface CustomSpinnerProps {}

export const CustomSpinner: FC<CustomSpinnerProps> = ({}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="my-10">
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-white border-8 h-32 w-32"></div>
      </div>
    </div>
  );
};
