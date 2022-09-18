import { useEffect } from "react";
import { Loader } from "../components";
import { FetchPlanets, Planet } from "../core/groups/planet";
import { useSelector } from "../core/store";
import { PlanetCard } from "../widget";

function PlanetPage() {
  const { isLoading, planets } = useSelector((state) => state.planet);

  useEffect(() => {
    FetchPlanets();
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 ">
      <Loader loading={isLoading}>
        {planets.map((planet: Planet) => (
          <PlanetCard key={planet.url} planet={planet} />
        ))}
      </Loader>
    </div>
  );
}

export default PlanetPage;
