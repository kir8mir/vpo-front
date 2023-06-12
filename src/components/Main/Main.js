import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserMain from "../UserMain/UserMain";
import AdminMain from "../AdminMain/AdminMain";
import DontaionCellRendererOg from "../DonationCellRendererOg/DonationCellRendererOg";

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
  {
    path: "/wannadonate/:id",
    Component() {
      return <DontaionCellRendererOg />;
    },
  },
]);

export default function Main() {
  return (
    <RouterProvider router={router} />
  );
}
