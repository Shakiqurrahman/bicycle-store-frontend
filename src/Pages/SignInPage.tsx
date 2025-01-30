import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "../Redux/features/auth/authApi";
import { setCredentials, TUser } from "../Redux/features/auth/authSlice";
import { useAppDispatch } from "../Redux/hook";
import { verifyToken } from "../utils/verifyToken";
import { loginSchema } from "../zodSchema/authSchema";

type TLoginError = {
  data: { message: string };
  status: number;
};

type FormData = {
  email: string;
  password: string;
};
const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [loginHandler, { isLoading }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginHandler({
        email: data.email,
        password: data.password,
      }).unwrap();
      toast.success("Login successful");
      const user = verifyToken(res?.data?.accessToken) as TUser;
      dispatch(setCredentials({ user, token: res.data.accessToken }));
      navigate("/");
    } catch (err) {
      const typedError = err as TLoginError;
      toast.error(typedError?.data?.message || "Login failed");
    }
  };

  return (
    <section className="bg-[#f2f2f2] flex flex-col h-screen justify-center items-center">
      <div className="bg-white max-w-[450px] mx-auto p-4 sm:p-8 w-full rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-primary mb-4">
          Sign in
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* Email Input */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="email"
                  {...field}
                  className={`border ${
                    errors.email ? "border-red-500" : "border-black/15"
                  } outline-none w-full py-2 px-4 rounded-lg placeholder:text-sm focus:border-primary duration-300`}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </>
            )}
          />

          {/* Password Input */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type={showPassword ? "text" : "password"}
                  {...field}
                  className={`border ${
                    errors.password ? "border-red-500" : "border-black/15"
                  } focus:border-primary outline-none w-full py-2 px-4 rounded-lg mt-4 placeholder:text-sm duration-300`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </>
            )}
          />

          {/* Show Password Checkbox */}
          <div className="flex items-center gap-2 my-4">
            <input
              type="checkbox"
              className="size-4 accent-primary outline-none"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
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
            disabled={isLoading}
            className="h-10 bg-primary text-white py-2 px-4 w-full rounded-lg font-semibold tracking-wide cursor-pointer hover:bg-primary duration-300 flex justify-center items-center disabled:bg-primary/50"
          >
            {isLoading ? (
              <ImSpinner9 className="animate-spin text-xl" />
            ) : (
              "Sign in"
            )}
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
