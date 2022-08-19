import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
const initialState = { user: null };

if (localStorage.getItem("token")) {
  const decodedToken = jwtDecode(localStorage.getItem("token"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}
export const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return { ...state };
  }
};

const AuthContextProvider = (props) => {
  const [AuthState, dispatch] = useReducer(AuthReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch({ type: "LOGIN", payload: userData });
  };
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ user: AuthState.user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
