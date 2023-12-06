"use client"; // use client means that this file will be executed only in the browser, not in the server. What this means is that we can use browser specific code here, like the DOM API, and it will not break the build.

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle, BsFacebook } from "react-icons/bs";

type Variant = "LOGIN" | "REGISTER" | "FORGOT_PASSWORD";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = useCallback(() => {
    // useCallback is a hook that returns a memoized callback. What this means is that the function will only be created once, and then it will be reused on subsequent renders. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else if (variant === "REGISTER") {
      setVariant("LOGIN");
    } else if (variant === "FORGOT_PASSWORD") {
      setVariant("LOGIN");
    }
  }, [variant]); // this variable "variant" is called inside the function, so we need to add it to the dependencies array

  const {
    // These are the exported functions from react-hook-form
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (variant === "LOGIN") {
      // NextAuth Login Call
    } else if (variant === "REGISTER") {
      // Axios Register Call
    } else if (variant === "FORGOT_PASSWORD") {
      // forgot password
    }

    // setIsLoading(false);
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // NextAuth Social Login Call
  };

  // handleSubmit passes the form data to the onSubmit function when the form is submitted. It also prevents the default browser behavior of reloading the page.
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <div>
            <Button type="submit" fullWidth={true} disabled={isLoading}>
              {variant === "LOGIN" && "Login"}
              {variant === "REGISTER" && "Register"}
              {variant === "FORGOT_PASSWORD" && "Reset Password"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-rila-orange focus:ring-rila-orange border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-rila-orange hover:text-rila-orange-hover">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex-col space-y-2">
              <AuthSocialButton
                icon={BsGithub}
                social="Github"
                text="Sign in with Github"
                onClick={() => socialAction("github")}
              />
              <AuthSocialButton
                icon={BsGoogle}
                social="Google"
                text="Sign in with Google"
                onClick={() => socialAction("google")}
              />
              <AuthSocialButton
                icon={BsFacebook}
                social="Facebook"
                text="Sign in with Facebook"
                onClick={() => socialAction("facebook")}
              />
              {/* <div>
                <Button
                  type="button"
                  fullWidth={true}
                  secondary={true}
                  onClick={() => socialAction("google")}>
                  Google
                </Button>
              </div> */}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <div className="text-sm text-gray-600 hover:text-gray-500 hover:underline">
              {variant === "LOGIN" && (
                <a
                  href="#"
                  onClick={toggleVariant}
                  className="font-medium text-rila-orange hover:text-rila-orange-hover">
                  Don&apos;t have an account? Register
                </a>
              )}
              {variant === "REGISTER" && (
                <a
                  href="#"
                  onClick={toggleVariant}
                  className="font-medium text-rila-orange hover:text-rila-orange-hover">
                  Already have an account? Login
                </a>
              )}
              {variant === "FORGOT_PASSWORD" && (
                <a
                  href="#"
                  onClick={toggleVariant}
                  className="font-medium text-rila-orange hover:text-rila-orange-hover">
                  Cancel
                </a>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
