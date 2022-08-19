import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/Auth";
import { Container } from "semantic-ui-react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/UI/Navbar";
import PostDetail from "./pages/PostDetail";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Routes>
    </Container>
  );
}

export default App;
