import { FC, ReactElement } from "react";

export interface CustomSpinnerProps {}

export const CustomSpinner: FC<CustomSpinnerProps> = ({}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-white border-8 h-32 w-32"></div>
      </div>
    </div>
  );
};
