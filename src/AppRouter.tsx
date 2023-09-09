import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import MyHeader from "./components/MyHeader";
import App from "./App";
import BasicPage from "./pages/basic";

const ErrorPage = () => {
  const error: any = useRouteError();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
        <p>
          <a href="/">Go back to the home page</a>
        </p>
      </p>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,

    element: (
      <>
        <MyHeader />
        <div style={{ marginTop: "2rem" }}>
          <div style={{ float: "left" }}>
            <ul>
              <li>
                <a href="/basic">Basic</a>
              </li>
              <li>
                <a href="/app">App</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </div>
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
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
