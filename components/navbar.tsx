import { useState } from "react";
import Hamburger from "./hamburger";
import DropDownMenu from "./drop.down.menu";
import { Link } from "@tanstack/react-router";
import type { getCurrentUser } from "../serverFunc/auth";

type NavBarProps = {
  user: Awaited<ReturnType<typeof getCurrentUser>>;
};

const NavBar = ({ user }: NavBarProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {showMenu && (
        <DropDownMenu onClick={() => setShowMenu(false)} user={user} />
      )}

      <header>
        <nav className="flex flex-col items-center justify-center space-y-2 border border-neutral-600/20">
          <div className="mt-5 flex items-center gap-x-2 px-2 md:flex-col">
            <img
              src="/logo.webp"
              alt="logo"
              className="h-20 w-20 xl:h-28 xl:w-28"
            />

            <p className="text-center font-eth text-base font-black uppercase text-blue-900 md:text-2xl">
              Saving Humanity Social Work Organization
            </p>

            <Hamburger onClick={() => setShowMenu(true)} />
          </div>

          <div className="flex w-full justify-center">
            <p className="ml-10 text-xs font-medium">
              A Non-Profit Organization
            </p>
          </div>

          <div className="hidden w-full md:block">
            <ul className="flex w-full flex-wrap justify-center gap-x-2 rounded-lg bg-blue-500 p-2 text-sm font-bold text-white md:p-10 md:text-base">
              <Link to="/">Home &bull;</Link>
              <Link to="/about">About us &bull;</Link>
              <Link to="/activites">Our Activities &bull;</Link>
              <Link to="/ourteam">Our Team &bull;</Link>
              <Link to="/members">Members &bull;</Link>
              <Link to="/advisors">Advisors &bull;</Link>
              <Link to="/events">Events &bull;</Link>
              <Link to="/gallery">Gallery &bull;</Link>
              <Link to="/support">Support us &bull;</Link>
              <Link to="/contact">Contact us &bull;</Link>

              {user ? (
                <Link to="/dashboard">Dashboard</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;