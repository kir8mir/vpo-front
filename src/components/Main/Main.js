import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserMain from "../UserMain/UserMain";
import AdminMain from "../AdminMain/AdminMain";

let router = createBrowserRouter([
  {
    path: "/",
    Component() {
      return <UserMain />;
    },
  },
  {
    path: "/admin",
    Component() {
      return <AdminMain />;
    },
  },
]);

export default function Main() {
  return (
    <RouterProvider router={router} />
  );
}
