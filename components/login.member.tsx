import { Link } from "@tanstack/react-router"

const MemberLogin = () => {
  return (
    <div className='min-h-screen w-full bg-blue-800 rounded-lg font-bold flex justify-center items-center px-6 flex-col'>
      <div>
        <h1 className="text-white text-xl mb-4">Login Page</h1>
      </div>
      <form action="" className="bg-blue-300 border border-blue-950 flex flex-col max-w-xl mx-auto gap-y-2 p-20">
        <label htmlFor="username">Your Phone Number</label>
        <input type="tel" className="custom-input" placeholder="1234567890" />
        <label htmlFor="password">Password</label>
        <input type="password" className="custom-input" placeholder="Your password" />
        <button type="submit" className="bg-blue-950 text-white rounded-2xl p-1">Login</button>
        <div className="flex justify-center items-center">
          <Link to="/signup/member" className="text-sm underline underline-offset-2 text-center">
            Sign up as a Member?
          </Link>
        </div>
      </form>
    </div>
  )
}

export default MemberLogin