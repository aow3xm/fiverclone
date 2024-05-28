import React from 'react'
import { NavLink } from 'react-router-dom'
import { pagePaths } from '../../paths'

const UserNavLogOut = () => {
  return (
    <div>
      <nav className="header-nav order-3 md:order-2">
          <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-5">
              <li>
                <NavLink to="#">Become a Seller</NavLink>
              </li>
              <li>
                <NavLink to={pagePaths.signIn}>Sign In</NavLink>
              </li>
              <li>
                <button className="px-4 py-1 rounded-sm border border-white shadow-md hover:bg-white hover:text-black duration-300">
                  <NavLink to={pagePaths.signUp}>Join</NavLink>
                </button>
              </li>
            </ul>
        </nav>
    </div>
  )
}

export default UserNavLogOut
