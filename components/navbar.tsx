import { useState } from "react";
import Hamburger from "./hamburger";
import DropDownMenu from "./drop.down.menu";
import { Link } from "@tanstack/react-router";
const NavBar = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    return (
        <>
            {
                showMenu && (
                    <DropDownMenu onClick={() => setShowMenu(false)} />
                )
            }
            <header>
                <nav className="flex flex-col items-center justify-center space-y-2 border border-neutral-600/20">
                    <div className="flex md:flex-col items-center gap-x-2 px-2 mt-5">
                        <img src="logo.webp" alt="logo" className="xl:h-28 xl:w-28 h-20 w-20" />
                        <p className="uppercase font-black text-base md:text-2xl xl:text-2xl text-center font-eth text-blue-900">saving humanity social work organization</p>
                        <Hamburger onClick={() => setShowMenu(true)} />
                    </div>
                    <div className="flex justify-center w-full">
                        <p className="font-medium text-xs ml-10">A Non-Profit Organization</p>
                    </div>
                    <div>
                    </div>
                    <div className="w-full md:block hidden">
                        <ul className="flex bg-blue-500 flex-wrap gap-x-2 md:text-base xl:text-base text-sm text-white md:p-10 xl:p-10 p-2 rounded-lg  font-bold justify-center w-full">
                            <Link to="/">Home &bull;</Link>
                            <Link to="/about">About us &bull;</Link>
                            <Link to="/activites">Our Activites &bull;</Link>
                            <Link to="/ourteam">Our Team &bull;</Link>
                            <Link to="/members">Members &bull;</Link>
                            <Link to="/advisors">Advisors &bull;</Link>
                            <Link to="/events">Events &bull;</Link>
                            <Link to="/gallery">Gallery &bull;</Link>
                            <Link to="/support">Support us &bull;</Link>
                            <Link to="/contact">Contact us &bull;</Link>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default NavBar