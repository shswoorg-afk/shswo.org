import { Link } from "@tanstack/react-router"

const Login = () => {
    return (
        <main className="bg-linear-to-b from-neutral-500 to-blue-400 h-screen flex items-center justify-center text-white">
            <div>
                <div className="flex justify-center">
                    <h1 className="text-3xl font-bold">Who are you?</h1>
                </div>
                <div className="bg-blue-900 py-16 p-10 md:w-120 md:text-xl xl:text-xl font-medium rounded-xl border border-blue-300">
                    <ul className="flex flex-col justify-center items-center gap-y-3">
                        <li>
                            <Link to="/admin" className="underline">Are you a admin?</Link>
                        </li>
                        <li>
                            <Link to="/login/member" className="underline">Are you a member?</Link>
                        </li>
                        <li>
                            <Link to="/login/advisor" className="underline">Are you a advisor?</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default Login