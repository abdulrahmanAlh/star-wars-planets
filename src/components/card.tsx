import { FC, ReactElement } from "react";

export interface CustomCardProps {
  children: ReactElement | ReactElement[] | string;
  className?: string;
}

export const CustomCard: FC<CustomCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`bg-neutral-700 p-3 rounded-lg ${className}`}>
      {children}
    </div>
  );
};
