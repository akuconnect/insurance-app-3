import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Quote } from "./components/Quote";
import { PrivateMotor } from "./components/PrivateMotor";
import { CommercialMotor } from "./components/CommercialMotor";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "quote", Component: Quote },
      { path: "private-motor", Component: PrivateMotor },
      { path: "commercial-motor", Component: CommercialMotor },
    ],
  },
]);