import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import HomePage from "./pages/HomePage/HomePage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import NotFound from "./components/NotFound";
import AuthTemplate from "./templates/AuthTemplate/AuthTemplate";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import SignInPage from "./pages/AuthPages/SignInPage";
import TitlePage from "./pages/TitlePage/TitlePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import InfoUserPage from "./pages/Profile/InfoUserPage";
import AdminDashPage from "./pages/Dashboard/AdminDashPage";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="categories/:id" element={<CategoriesPage />} />
          <Route path="detail/:id" element={<DetailPage />} />
          <Route path="result/:slug" element={<ResultPage />} />
          <Route path="title/:id" element={<TitlePage />} />
          <Route path="profile" element={<InfoUserPage />} />
          <Route path="update" element={<ProfilePage />} />
        </Route>
        <Route path="/auth" element={<AuthTemplate />}>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
        </Route>
        <Route path="/admin" element={<AdminTemplate />}>
          <Route path="dashboard" element={<AdminDashPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
