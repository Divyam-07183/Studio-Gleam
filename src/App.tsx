import { RouterProvider } from "react-router";
import { router } from "./routes";
import { BuilderProvider } from "./context/BuilderContext";

export default function App() {
  return (
    <BuilderProvider>
      <RouterProvider router={router} />
    </BuilderProvider>
  );
}