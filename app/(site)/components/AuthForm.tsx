"use client"; // use client means that this file will be executed only in the browser, not in the server. What this means is that we can use browser specific code here, like the DOM API, and it will not break the build.

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

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
    // These are the functions and variables that we get from the useForm hook. We can use them to build our form.
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

    setIsLoading(false);
  };

  const socialAction = (action:string) => {
    setIsLoading(true);

    // NextAuth Social Login Call
  }


  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rila-orange focus:border-rila-orange sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rila-orange focus:border-rila-orange sm:text-sm"
              />
            </div>
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
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded text-sm font-medium text-white bg-rila-orange hover:bg-rila-orange-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rila-orange">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
