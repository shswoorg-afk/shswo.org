import adminLogin from "../serverFunc/createAdminAuth";

type AdminBeforeAuthProps = {
  onLoginSuccess: () => void;
};

const AdminBeforeAuth = ({
  onLoginSuccess,
}: AdminBeforeAuthProps) => {
  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      console.log("handleLogin reached");

      const result = await adminLogin({
        data: {
          username: formData.get("username") as string,
          password: formData.get("password") as string,
        },
      });

      console.log(result);

      if (result.success) {
        onLoginSuccess();
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black text-white h-screen px-3 flex justify-center items-center">
      <div>
        <div>
          <h1 className="text-center text-2xl font-bold">
            Welcome to Admin Login Panel
          </h1>
        </div>

        <form
          className="border border-neutral-600/40 flex flex-col p-5 rounded-lg gap-y-3 mt-7"
          onSubmit={handleLogin}
        >
          <label htmlFor="username">Admin Username</label>

          <input
            type="text"
            name="username"
            id="username"
            className="border-b border-neutral-400 outline-0"
            placeholder="Enter the username"
            required
          />

          <label htmlFor="password">Admin password</label>

          <input
            type="password"
            name="password"
            id="password"
            className="border-b border-neutral-400 outline-0"
            placeholder="***************"
            required
          />

          <button
            type="submit"
            className="bg-white text-black rounded-full active:bg-white/60 mt-4 font-bold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminBeforeAuth;