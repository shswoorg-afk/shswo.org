import { Link } from "@tanstack/react-router";
import { PiUserCircleDuotone } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import type { getCurrentUser } from "../serverFunc/auth";

type DropDownMenuProps = {
  onClick: () => void;
  user: Awaited<ReturnType<typeof getCurrentUser>>;
};

const DropDownMenu = ({ onClick, user }: DropDownMenuProps) => {
  return (
    <div className="absolute z-20 w-full rounded-xl bg-blue-900 p-2 text-sm text-white">
      <div className="flex justify-between">
        <Link
          to={user ? "/dashboard" : "/login"}
          onClick={onClick}
          className="flex items-center gap-x-1 font-bold"
        >
          <PiUserCircleDuotone size={35} />
          <span>{user ? "Dashboard" : "Login"}</span>
        </Link>

        <button
          type="button"
          aria-label="Close menu"
          className="rounded-full border border-white p-3"
          onClick={onClick}
        >
          <RxCross1 size={10} />
        </button>
      </div>

      <ul className="flex flex-col items-center gap-y-2 p-2 text-base font-bold">
        <Link to="/">Home &bull;</Link>
        <Link to="/about">About us &bull;</Link>
        <Link to="/activites">Our Activities &bull;</Link>
        <Link to="/ourteam">Our Team &bull;</Link>
        <Link to="/signup/member">Member registration &bull;</Link>
        <Link to="/events">Events &bull;</Link>
        <Link to="/gallery">Gallery &bull;</Link>
        <Link to="/donate">Donate us &bull;</Link>
        <Link to="/contact">Contact us &bull;</Link>
      </ul>
    </div>
  );
};

export default DropDownMenu;