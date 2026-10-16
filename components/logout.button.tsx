
import { useNavigate } from "@tanstack/react-router";
import { logout } from "../serverFunc/logout";

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logout();
    await navigate({ to: "/" });
  };

  return (
    <button type="button" onClick={handleLogOut} className="bg-blue-500 text-white p-2 rounded-full active:bg-blue-400 border border-black px-5">
      Log out
    </button>
  );
};

export default LogOutButton;
