import { FC, ReactElement, useMemo } from "react";

export interface CustomTextProps {
  children: ReactElement | ReactElement[] | string;
  variant?: "primary" | "secondary" | "normal" | "gray";
  className?: string;
}

export const CustomText: FC<CustomTextProps> = ({
  children,
  variant = "primary",
  className = "",
}) => {
  const fontColor = useMemo(() => {
    switch (variant) {
      case "primary":
        return "text-yellow-400";
      case "gray":
        return "text-gray-600";
      case "normal":
        return "text-white";
      case "secondary":
        return "text-orange-400";
      default:
        return "text-white";
    }
  }, [variant]);
  return <div className={`${fontColor} ${className}`}>{children}</div>;
};
