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
import SigninForm from "./components/Auth/SigninForm";
import SignInPage from "./pages/AuthPages/SignInPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="categories/:id" element={<CategoriesPage />} />
          <Route path="detail/:id" element={<DetailPage />} />
          <Route path="result/:slug" element={<ResultPage />} />
        </Route>
        <Route path="/auth" element={<AuthTemplate />}>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
