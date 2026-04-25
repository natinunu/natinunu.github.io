import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ProjectPage from "./pages/ProjectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <WorkPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "work/:slug", element: <ProjectPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
