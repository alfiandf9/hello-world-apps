import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthAlert from "../components/AuthAlert";
import AuthBody from "../components/AuthBody";
import AuthFooter from "../components/AuthFooter";
import AuthHeader from "../components/AuthHeader";
import AuthLayout from "../components/AuthLayout";
import FormButton from "../components/FormButton";
import { FormErrorInput, FormInput } from "../components/FormInput";
import FormLabel from "../components/FormLabel";
import nookies from 'nookies';

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

export default function forgotPassword() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function requestPassword(data, e) {
    e.preventDefault();

    setSuccessMessage(null);
    setDisableButton(true);

    const req = await fetch(`/api/password/reset-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await req.json();

    if (!req.ok) {
      setErrorMessage(res.status);
      setDisableButton(false);
      return false;
    }

    setDisableButton(false);
    setErrorMessage(null);
    setSuccessMessage(res.status);

    reset(); // reset form after success
  }

  return (
    <AuthLayout>
      <Head>
        <title>helloWorld &mdash; Forgot Password</title>
      </Head>
      <AuthHeader title="Forgot Password" subTitle="Request your new password using your email" />
      <AuthBody>
        {errorMessage && <AuthAlert onClickError={() => setErrorMessage(null)} errorMessage={errorMessage} />}
        {successMessage && <AuthAlert onClickSuccess={() => setSuccessMessage(null)} successMesage={successMessage} />}
        <form onSubmit={handleSubmit(requestPassword)} method="POST">
          <div className="mb-3">
            <FormLabel id="email">Your Email</FormLabel>
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
          <FormButton isDisabled={disableButton} label="Request new password" />
        </form>
        <AuthFooter title="Remember your password?" subtitle="Login here!" href="/login" />
      </AuthBody>
    </AuthLayout>
  );
}
