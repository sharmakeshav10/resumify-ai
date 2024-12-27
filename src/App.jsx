import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import SignInPage from "./auth/sign-in/SignIn";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/dash",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
