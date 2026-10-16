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
        <Link to="/" onClick={onClick}>Home</Link>
        <Link to="/about" onClick={onClick}>About us</Link>
        <Link to="/activites" onClick={onClick}>Our Activities</Link>
        <Link to="/ourteam" onClick={onClick}>Our Team</Link>
        <Link to="/members" onClick={onClick}>Members</Link>
        <Link to="/advisors" onClick={onClick}>Advisors</Link>
        <Link to="/events" onClick={onClick}>Events</Link>
        <Link to="/gallery" onClick={onClick}>Gallery</Link>
        <Link to="/support" onClick={onClick}>Support us</Link>
        <Link to="/contact" onClick={onClick}>Contact us</Link>
      </ul>
    </div>
  );
};

export default DropDownMenu;