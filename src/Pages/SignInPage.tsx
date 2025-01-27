import { Link } from "react-router";

const SignInPage = () => {
  return (
    <section className="bg-[#f2f2f2] flex flex-col h-screen justify-center items-center">
      <div className="bg-white max-w-[450px] mx-auto p-4 sm:p-8 w-full rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-primary mb-4">
          Sign in
        </h1>
        <form className="w-full">
          <input
            type="email"
            name="email"
            className="border border-black/15 outline-none w-full py-2 px-4 rounded-lg mb-4 placeholder:text-sm focus:border-primary duration-300"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            className="border border-black/15 focus:border-primary outline-none w-full py-2 px-4 rounded-lg mb-4 placeholder:text-sm duration-300"
            placeholder="Password"
          />
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              className="size-4 accent-primary"
              name="showPassword"
              id="showPassword"
            />
            <label
              htmlFor="showPassword"
              className="text-sm cursor-pointer select-none"
            >
              Show Password
            </label>
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 w-full rounded-lg font-semibold tracking-wide cursor-pointer hover:bg-primary duration-300"
          >
            Sign in
          </button>
        </form>
        <p className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <Link to={"/sign-up"} className="underline">
            sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignInPage;
