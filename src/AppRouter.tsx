import {
  createHashRouter,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import MyHeader from "./components/MyHeader";
import App from "./App";
import BasicPage from "./pages/basic";
import { urlBase } from "./utils";

const ErrorPage = () => {
  const error: any = useRouteError();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
        <p>
          <a href={urlBase}>Go back to the home page</a>
        </p>
      </p>
    </div>
  );
};

const router = createHashRouter([
  {
    path: urlBase,
    errorElement: <ErrorPage />,

    element: (
      <>
        <MyHeader />
        <div style={{ marginTop: "2rem" }}>
          <div>
            <Outlet />
          </div>
        </div>
      </>
    ),
    children: [
      {
        path: "app",
        element: <App />,
      },
      {
        path: "",
        element: <BasicPage />,
      },
      {
        path: "about",
        element: <h1>About us!!</h1>,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
