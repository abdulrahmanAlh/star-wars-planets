import { FC, ReactElement } from "react";
import { CustomText } from "../components";

export interface LayoutProps {
  children: ReactElement | ReactElement[] | string;
  className?: string;
}

export const Layout: FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div className="md:container md:mx-auto px-4">
      <CustomText className="text-center text-3xl my-5	">Star War</CustomText>
      {children}
    </div>
  );
};
