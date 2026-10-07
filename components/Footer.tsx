import { Link } from "@tanstack/react-router"
import { MdWhatsapp } from "react-icons/md"
import { PiFacebookLogo, PiGithubLogoFill, PiInstagramLogo, PiLinkedinLogo } from "react-icons/pi"
const Footer = () => {
    return (
        <footer>
            <div className="bg-cyan-800 text-white h-48 border-2 border-cyan-300">
                <div className="flex justify-center gap-x-4 mt-5">
                    <a href="https://chat.whatsapp.com/FaGbaVhDjm39WRcwJRncmM?s=cl&p=a&mlu=4&ilr=4" target="_blank" className="bg-cyan-100 p-1 rounded-full">
                        <MdWhatsapp color="black" size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/saving-humanity-social-work-organization-01a77a407?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                        target="_blank" className="bg-cyan-100 p-1 rounded-full">
                        <PiLinkedinLogo color="black" size={20} />
                    </a>
                    <a href="https://www.facebook.com/savingHumanitysocialworkorganization" target="_blank" className="bg-cyan-100 p-1 rounded-full">
                        <PiFacebookLogo color="black" size={20} />
                    </a>
                    <a href="https://www.instagram.com/shsocialworkorganization?stkn=MjVrczJ4MTc3aDY2" target="_blank" className="bg-cyan-100 p-1 rounded-full">
                        <PiInstagramLogo color="black" size={20} />
                    </a>
                </div>
                <div>
                    <p className="text-sm text-center mt-5">&copy; {new Date().getFullYear()} SHSWO. All Rights Reserved.</p>
                    <p className="text-xs text-center">Powered by NorthEast Digital Lab</p>
                    <p className="text-xs flex gap-x-2 items-center justify-center">Developed by Mafjiur Ali.
                        <a href="https://github.com/lilmoficodes" target="_blank" className="bg-neutral-300 rounded-full p-0.5">
                            <PiGithubLogoFill color="#24292E" size={20} />
                        </a>
                    </p>
                </div>
                <div className="flex text-[13px] font-semibold gap-x-3 px-2 mt-3 justify-center">
                    <span>
                        <Link to="/about">
                            About us
                        </Link>
                    </span>
                    <span>
                        <Link to="/contact">
                            Contact us
                        </Link>
                    </span>
                    <span>
                        <Link to="/privacy">
                            Privacy Policy
                        </Link>
                    </span>
                    <span>
                        <Link to="/disclaimer">
                            Disclaimer
                        </Link>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer