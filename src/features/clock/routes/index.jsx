import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router-dom";
import ScrollWithClock from "../components/ScrollWithClock";

export function Clock() {
  return (
    <>
      <Helmet>
        <title> clock</title>
      </Helmet>

      <Routes>
        <Route path="/" element={<ScrollWithClock />} />
      </Routes>
    </>
  );
}
