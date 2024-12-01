import { RegistrationWindow } from "./components/Registration/RegistrationWindow";
import { LoginWindow } from "./components/Login/LoginWindow";
import { LoginOrRegistrationWindow } from "./components/LoginOrRegistrationWindow/LoginOrRegistrationWindow";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { WebApi, WebApiProvider } from "./WebApi";
import CategoryList from "./components/Categories/Categories";

export const App = () => {
  return (
    <WebApiProvider value={WebApi.create()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<LoginOrRegistrationWindow />} />
          <Route path="/auth/login" element={<LoginWindow />} />
          <Route path="/auth/register" element={<RegistrationWindow />} />
          <Route path="/categories" element={<CategoryList />} />
        </Routes>
      </BrowserRouter>
    </WebApiProvider>
  );
};

export default App;
