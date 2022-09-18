import { useEffect } from "react";
import { CustomPaginator, CustomText, Loader } from "../components";
import { FetchPlanets } from "../core/groups/planet";
import { Planet } from "../core/models";
import { useSelector } from "../core/store";
import { PlanetCard } from "../widget";

function PlanetPage() {
  const { isLoading, planets, meta } = useSelector((state) => state.planet);

  useEffect(() => {
    FetchPlanets();
  }, []);

  const handleChangePage = (num: number, type: "NEXT" | "PREVIOUS") => {
    FetchPlanets(num);
  };

  return (
    <div>
      <Loader loading={isLoading}>
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 ">
          {planets.length > 0 ? (
            planets.map((planet: Planet) => (
              <PlanetCard key={planet.url} planet={planet} />
            ))
          ) : (
            <CustomText>No Plants have films</CustomText>
          )}
        </div>
      </Loader>
      <CustomPaginator
        totalPage={meta?.count ? meta?.count / 10 : 0}
        onChangePage={handleChangePage}
      />
    </div>
  );
}

export default PlanetPage;
