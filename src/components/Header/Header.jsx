import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import WithResponsive from "../../HOC/Responsive/WithResponsive";
import Drawer from "./Drawer";
import JobsList from "./JobsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../redux/actions/jobsActions";
import UserNavLogIn from "./UserNavLogIn";
import UserNavLogOut from "./UserNavLogOut";
import { pagePaths } from "../../paths";

const Header = ({ isMobile, isTablet, isDesktop }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const renderUserNav = () => {
    if (user) {
      return <UserNavLogIn />;
    } else {
      return <UserNavLogOut />;
    }
  };

  useEffect(() => {
    dispatch(fetchJobs());
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(pagePaths.result(search));
  };

  return (
    <header
      className={`${
        isHomePage ? "fixed" : "sticky top-0"
      } z-50 w-full py-5 duration-300 space-y-5 ${
        isScrolled || !isHomePage ? "bg-white text-black" : "text-white"
      }`}
    >
      {isMobile && (
        <div className="header-content container mx-auto flex justify-between items-center font-bold text-2xl">
          <Drawer />
          <div className="header-logo text-4xl">
            <NavLink to="/">
              fiverr<span className="text-green-500">.</span>
            </NavLink>
          </div>
        </div>
      )}
      {(isDesktop || isTablet) && (
        <div className="header-content container mx-auto flex flex-col md:flex-row justify-between items-center font-bold">
          <div className="header-logo-search flex items-center mb-4 md:mb-0">
            <div className="header-logo text-2xl md:text-4xl">
              <NavLink to="/">
                fiverr<span className="text-green-500">.</span>
              </NavLink>
            </div>
            {(isScrolled || !isHomePage) && (
              <div className="header-search ml-4 text-base font-normal">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="Search for anything"
                    className="border border-r-0 rounded-l-md p-2 outline-none w-24 lg:w-60"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="border border-l-0 rounded-r-md p-2 bg-green-700 hover:bg-green-800 duration-300 text-white"
                  >
                    Search
                  </button>
                </form>
              </div>
            )}
          </div>

          <nav className="header-nav order-3 md:order-2">{renderUserNav()}</nav>
        </div>
      )}
      {(isScrolled || !isHomePage) && isDesktop && <JobsList />}
    </header>
  );
};

export default WithResponsive(Header);
