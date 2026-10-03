import { Link } from "@tanstack/react-router"
import { PiUserCircleDuotone } from "react-icons/pi"
import { RxCross1 } from "react-icons/rx"

const DropDownMenu = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className="p-2 text-sm bg-blue-900 text-white absolute w-full z-20 rounded-xl">
            <div className="flex justify-between">
                <button>
                    <Link to="/login" className="flex items-center gap-x-1 font-bold">
                    <PiUserCircleDuotone size={35} />
                    <span>Login</span>
                    </Link>
                </button>
                <button className="border border-white rounded-full p-3" onClick={onClick}>
                    <RxCross1 size={10} />
                </button>
            </div>
            <ul className="text-base flex flex-col items-center font-bold p-2">
                <Link to="/">Home</Link>
                <Link to="/about">About us</Link>
                <Link to="/activites">Our Activites</Link>
                <Link to="/ourteam">Our Team</Link>
                <Link to="/members">Members</Link>
                <Link to="/advisors">Advisors</Link>
                <Link to="/events">Events</Link>
                <Link to="/gallery">Gallery</Link>
                <Link to="/support">Support us</Link>
                <Link to="/contact">Contact us</Link>
            </ul>
        </div>
    )
}

export default DropDownMenu