import { FC, ReactElement } from "react";
import { CustomAvatar, CustomCard, CustomText } from "../components";
import { Planet } from "../core/groups/planet";
import moment from "moment";
import { nFormatter } from "../utils";

export interface PlanetCardProps {
  planet: Planet;
}

export const PlanetCard: FC<PlanetCardProps> = ({ planet }) => {
  return (
    <CustomCard className="flex flex-col gap-2 transition transform hover:scale-105 ease-out">
      <div className="flex justify-between ">
        <CustomText variant="primary">{planet.created}</CustomText>
        <CustomText variant="primary">
          {moment(planet.created).format("ddd mm, A")}
        </CustomText>
      </div>
      <div className="flex gap-2 grow-0">
        <CustomAvatar>{nFormatter(planet.population, 2)}</CustomAvatar>

        <div className="flex-col grow">
          <CustomText className="font-bold">{planet.name}</CustomText>
          <div className="flex justify-between ">
            <div className="hidden md:block">
              {planet.films.map((film: string) => (
                <CustomText variant="gray" key={film}>
                  {film}
                </CustomText>
              ))}
            </div>
            <CustomText variant="gray">{planet.climate}</CustomText>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        {planet.films.map((film: string) => (
          <CustomText className="font-bold" key={film}>
            {film}
          </CustomText>
        ))}
      </div>
    </CustomCard>
  );
};
