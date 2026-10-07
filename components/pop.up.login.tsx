import { useEffect } from "react";
import MemberLogin from "./login.member";

const PopUpLogin = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-999 backdrop-blur-sm bg-black/60">
      <div className="flex min-h-full items-center justify-center px-5">
        <div className="h-[50vh] min-h-fit w-96 max-w-lg border border-black">
          {/* Login form */}
          <MemberLogin/>
        </div>
      </div>
    </div>
  );
};

export default PopUpLogin;