import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { lazyImport } from "@/utils/lazy-import";

const { Clock } = lazyImport(() => import("@/features/clock"), "Clock");
function App() {
  return (
    <div>
      <Suspense fallback={<div className="app-suspense">loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export const publicRoutes = () => [
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <Clock /> }],
  },
];
