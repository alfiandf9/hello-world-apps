import { useRouter } from "next/router";
import { useState } from "react";
import FormButton from "../components/FormButton";
import nookies from "nookies";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";
import AuthBody from "../components/AuthBody";
import Head from "next/head";
import FormLabel from "../components/FormLabel";
import { FormErrorInput, FormInput } from "../components/FormInput";
import AuthFooter from "../components/AuthFooter";
import AuthAlert from "../components/AuthAlert";

export async function getServerSideProps(context){
  const cookies = nookies.get(context)

  // if cookies exist redirect to index
  if(cookies.token && cookies.expires_in){
    return{
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }

  return {
    props: {},
  }
}

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data, e) {
    e.preventDefault();

    setDisableButton(true);

    const req = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await req.json();

    // return false if fetch status not ok
    if (!req.ok) {
      setErrorMessage(res.message);
      setDisableButton(false);
      return false;
    }

    setErrorMessage(null);
    setDisableButton(false);
    localStorage.setItem("user", JSON.stringify(res.user)); // set data user to localStorage
    nookies.set(null, "token", res.access_token); // set token to cookies
    nookies.set(null, "expires_in", res.expires_in); // set expires token to cookies
    router.replace("/"); // redirecting to index if success
  }

  return (
    <AuthLayout>
      <Head>
        <title>helloWorld &mdash; Login</title>
      </Head>
      <AuthHeader subTitle="Sign in to access your account" />
      <AuthBody>
        {errorMessage && <AuthAlert onClickError={() => setErrorMessage(null)} errorMessage={errorMessage} />}
        <form onSubmit={handleSubmit(handleLogin)} method="POST" noValidate>
          <div className="mb-3">
            <FormLabel id="email">Email</FormLabel>
            <FormInput
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <FormErrorInput>{errors.email.message}</FormErrorInput>}
          </div>
          <div className="mb-3">
            <FormLabel id="password">Password</FormLabel>
            <FormInput id="password" name="password" type="password" placeholder="******" {...register("password", { required: "Password Required", minLength: 6 })} />
            {errors.password?.type === "required" && <FormErrorInput>{errors.password.message}</FormErrorInput>}
            {errors.password?.type === "minLength" && <FormErrorInput>Password should be more than 6 characters</FormErrorInput>}
          </div>
          <FormButton isDisabled={disableButton} label="Sign in" />
        </form>
      </AuthBody>
      <div className="m-5">
        <AuthFooter title="Forgot your password?" subtitle="Click this!" href="/forgotPassword" />
        <AuthFooter title="Don't have an account yet?" subtitle="Sign up" href="/register" />
      </div>
    </AuthLayout>
  );
}
