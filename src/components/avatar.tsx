import { FC, ReactElement } from "react";

export interface CustomAvatarProps {
  children: ReactElement | ReactElement[] | string;
  className?: string;
}

export const CustomAvatar: FC<CustomAvatarProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`inline-flex w-12 h-12  justify-center items-center  bg-gray-100 rounded-full dark:bg-gray-600 ${className}`}
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {children}
      </span>
    </div>
  );
};
