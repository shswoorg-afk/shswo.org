import Hamburger from "./hamburger";
const NavBar = () => {
    return (
        <header>
            <nav className="flex flex-col items-center justify-center space-y-2 border border-neutral-600/20">
                <div className="flex md:flex-col items-center gap-x-2 px-2 mt-5">
                    <img src="logo.webp" alt="logo" className="xl:h-28 xl:w-28 h-20 w-20" />
                    <p className="uppercase font-black text-base md:text-2xl xl:text-2xl text-center font-eth text-blue-900">saving humanity social work organization</p>
                    <Hamburger />
                </div>
                <div className="flex justify-center w-full">
                    <p className="font-medium text-xs ml-10">A Non-Profit Organization</p>
                </div>
                <div>
                </div>
                <div className="w-full md:block hidden">
                    <ul className="flex bg-blue-500 flex-wrap gap-x-2 md:text-base xl:text-base text-sm text-white md:p-10 xl:p-10 p-2 rounded-lg 
                font-bold justify-center w-full">
                        <li>Home &bull;</li>
                        <li>About us &bull;</li>
                        <li>Our Activites &bull;</li>
                        <li>Our Team &bull;</li>
                        <li>Members &bull;</li>
                        <li>Advisors &bull;</li>
                        <li>Events &bull;</li>
                        <li>Gallery &bull;</li>
                        <li>Support us &bull;</li>
                        <li>Contact us &bull;</li>
                        <li>Member Login</li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default NavBar