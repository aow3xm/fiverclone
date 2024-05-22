import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getUserInfo } from "../../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const InfoUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state?.auth);
  console.log("info: ", info);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await dispatch(getUserInfo(id));
        setShowInfo(true);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, [dispatch, id]);

  useEffect(() => {
    if (info) {
      setUserInfo(info);
    }
  }, [info]);
  
  const initial = info?.name ? info.name.charAt(0).toUpperCase() : "";
  const gender = info?.gender
    ? info.gender === "male"
      ? "Male"
      : "Female"
    : "";
  return (
    <div>
      <div
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
        onClick={() => setShowInfo(!showInfo)}
        style={{ cursor: "pointer" }}
      >
        <div className="flex items-center justify-center w-44 h-44 bg-gray-500 rounded-full text-white text-3xl ml-24 my-8">
          <h1 style={{ fontSize: "50px" }}>{initial}</h1>
        </div>
        <h1 className="block mt-1 text-lg leading-tight font-medium text-black text-center">
          {info.name}
        </h1>
        <h1 className="flex items-center justify-center mt-2">
          <button>
            <NavLink to="profile">
              <FontAwesomeIcon icon={faPen} />
            </NavLink>
          </button>
        </h1>
        <hr className="mt-10" />
        <div className="flex justify-between">
          <div className="flex">
            <p className="ml-4 mt-2">
              <FontAwesomeIcon icon={faLocationDot} />
            </p>
            <p className="mt-2 ml-2 text-gray-500 text-center">From</p>
          </div>
          <div>
            <p className="mt-2 mr-4 text-gray-500 text-center">Vietnam</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <p className="ml-4 mt-2">
              <FontAwesomeIcon icon={faUser} />
            </p>
            <p className="mt-2 ml-2 text-gray-500 text-center">Position</p>
          </div>
          <div>
            <p className="mt-2 mr-4 text-gray-500 text-center">Member</p>
          </div>
        </div>
      </div>

      {showInfo && (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-6">
          <div className="p-4">
            <div className="flex justify-between mb-10">
              <p className="mt-6 font-semibold">Description</p>
              <a href="#" className="mt-6 text-blue-400">
                Edit Description
              </a>
            </div>
            <hr />
            <div className="flex justify-between mb-10">
              <div>
                <p className="mt-6 mb-2 font-semibold">Languages</p>
                <p>Basic - English</p>
              </div>
              <div className="pt-8">
                <a href="#" className="text-blue-400">
                  Add Now
                </a>
              </div>
            </div>
            <hr />
            <div className="mt-10">
              <h2 className="font-semibold text-center mb-8">
                User Information
              </h2>
              <div className="flex my-4 mx-2 font-semibold">
                <p className="mr-3">Email:</p>
                <p className="text-gray-500">{info?.email}</p>
              </div>
              <div className="flex my-4 mx-2 font-semibold">
                <p className="mr-3">Phone:</p>
                <p className="text-gray-500">{info?.phone}</p>
              </div>
              <div className="flex my-4 mx-2 font-semibold">
                <p className="mr-3">Birthday:</p>
                <p className="text-gray-500">{info?.birthday}</p>
              </div>
              <div className="flex my-4 mx-2 font-semibold">
                <p className="mr-3">Gender:</p>
                <p className="text-gray-500">{gender}</p>
              </div>
              <div className="flex my-4 mx-2 font-semibold">
                <p className="mr-3">Role:</p>
                <p className="text-gray-500">{info?.role}</p>
              </div>
              <div className="mt-4 mx-2">
                <p className="font-semibold mb-2">Skills</p>
                {info?.skill.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-500">
                    {info?.skill.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No skills listed</p>
                )}
              </div>
              <div className="mt-4 mx-2">
                <p className="font-semibold mb-2">Certifications</p>
                {info?.certification.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-500">
                    {info?.certification.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No certifications listed</p>
                )}
              </div>
            </div>
            <div className="mt-10">
              <h2 className="font-semibold mb-2">Linked Accounts</h2>
              <div className="flex mx-4">
                <a
                  href="https://facebook.com"
                  className="text-blue-400 font-semibold mr-3"
                >
                  +
                </a>
                <a href="https://facebook.com" className="text-blue-400">
                  Facebook
                </a>
              </div>
              <div className="flex mx-4">
                <a
                  href="https://google.com"
                  className="text-blue-400 font-semibold mr-3"
                >
                  +
                </a>
                <a href="https://google.com" className="text-blue-400">
                  Google
                </a>
              </div>
              <div className="flex mx-4">
                <a
                  href="https://dribbble.com"
                  className="text-blue-400 font-semibold mr-3"
                >
                  +
                </a>
                <a href="https://dribbble.com" className="text-blue-400">
                  Dribbble
                </a>
              </div>
              <div className="flex mx-4">
                <a
                  href="https://stackoverflow.com"
                  className="text-blue-400 font-semibold mr-3"
                >
                  +
                </a>
                <a href="https://stackoverflow.com" className="text-blue-400">
                  Stack Overflow
                </a>
              </div>
              <div className="flex mx-4">
                <a
                  href="https://github.com"
                  className="text-blue-400 font-semibold mr-3"
                >
                  +
                </a>
                <a href="https://github.com" className="text-blue-400">
                  Github
                </a>
              </div>
              <div className="flex mx-4">
                <a
                  href="https://twitter.com"
                  className="text-blue-400 font-semibold mr-3"
                >
                  +
                </a>
                <a href="https://twitter.com" className="text-blue-400">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoUser;
