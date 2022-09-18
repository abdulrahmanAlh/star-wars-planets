import { lazy } from "react";
import { Layout } from "./widget/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const PlanetsPage = lazy(() => import("./page/Planets"));

function App() {
  // const { isLoading, planets } = useSelector((state) => state.planet);

  // useEffect(() => {
  //   FetchPlanets();
  // }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PlanetsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
