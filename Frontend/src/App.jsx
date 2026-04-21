import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatSection from "./components/ChatSection";
import Login from "./components/Login"; // your login component
import Signup from "./components/Signup"; // your signup component
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute"; // your auth wrapper
import ChatPage from "./Frontpage/ChatPage";
import NotFound from "./components/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <ChatSection />
        </ProtectedRoute>
      ),
    },
    {
      path: "/chatpage",
      element: <ChatPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },

    // ✅ Catch-all route (invalid URLs ke liye)
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
