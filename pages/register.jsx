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

export default function Register() {
  const [disableButton, setDisableButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  async function handleRegister(data, e) {
    e.preventDefault();

    setSuccessMessage(null);
    setDisableButton(true);

    const req = await fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await req.json();

    if (!req.ok) {
      setErrorMessage(res);
      setDisableButton(false);
      return false;
    }

    setErrorMessage(null);
    setSuccessMessage("User created successfully please go to the login page")
    setDisableButton(false);
    console.log(res);
  }

  return (
    <AuthLayout>
      <Head>
        <title>helloWorld &mdash; Register</title>
      </Head>
      <AuthHeader subTitle="Create a new account" />
      <AuthBody>
        {successMessage && <AuthAlert onClickSuccess={() => setSuccessMessage(null)} successMessage={successMessage} />}
        {errorMessage && (
          <div className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Danger</span>
            <div>
              <span className="font-medium">Ensure that these requirements are met:</span>
              <ul className="mt-1.5 ml-4 text-red-700 list-disc list-inside">
                {errorMessage.email?.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
                {errorMessage.phone?.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8"
              data-dismiss-target="#alert-2"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        )}
        <form action="POST" onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-3">
            <FormLabel id="name">Your Name</FormLabel>
            <FormInput
              id="name"
              name="name"
              type="text"
              placeholder="Jhon Doe"
              {...register("name", {
                required: "Name required",
                minLength: 3,
              })}
            />
            {errors.name?.type === "required" && <FormErrorInput>{errors.name.message}</FormErrorInput>}
            {errors.name?.type === "minLength" && <FormErrorInput>Name should be more than 3 characters</FormErrorInput>}
          </div>
          <div className="mb-3">
            <FormLabel id="email">Email Address</FormLabel>
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
            <FormLabel id="phone">Phone Number</FormLabel>
            <FormInput
              id="phone"
              name="phone"
              type="tel"
              placeholder="0810278367861"
              {...register("phone", {
                required: "Phone number required",
                minLength: 10,
                maxLength: 12,
                pattern: {
                  value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                  message: "Invalid phone number format",
                },
              })}
            />
            {errors.phone?.type === "required" && <FormErrorInput>{errors.phone.message}</FormErrorInput>}
            {errors.phone?.type === "pattern" && <FormErrorInput>{errors.phone.message}</FormErrorInput>}
            {errors.phone?.type === "minLength" && <FormErrorInput>Phone number should be min 10 characters</FormErrorInput>}
            {errors.phone?.type === "maxLength" && <FormErrorInput>Phone number should be max 12 characters</FormErrorInput>}
          </div>
          <div className="mb-3">
            <FormLabel id="password">Password</FormLabel>
            <FormInput id="password" name="password" type="password" placeholder="******" {...register("password", { required: "Password Required", minLength: 6 })} />
            {errors.password?.type === "required" && <FormErrorInput>{errors.password.message}</FormErrorInput>}
            {errors.password?.type === "minLength" && <FormErrorInput>Password should be more than 6 characters</FormErrorInput>}
          </div>
          <div className="mb-3">
            <FormLabel id="password_confirmation">Confirm Password</FormLabel>
            <FormInput
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              placeholder="******"
              {...register("password_confirmation", {
                required: "Password Required",
                minLength: 6,
                validate: (value) => {
                  if (watch("password") !== value) {
                    return "Your passwords confirmation do not match";
                  }
                },
              })}
            />
            {errors.password_confirmation?.type === "required" && <FormErrorInput>{errors.password_confirmation.message}</FormErrorInput>}
            {errors.password_confirmation?.type === "validate" && <FormErrorInput>{errors.password_confirmation.message}</FormErrorInput>}
            {errors.password_confirmation?.type === "minLength" && <FormErrorInput>Password confirmation should be more than 6 characters</FormErrorInput>}
          </div>
          <FormButton isDisabled={disableButton} label="Register" />
        </form>
      </AuthBody>
      <div className="m-5">
        <AuthFooter href="/login" title="Already have an account?" subtitle="Login here!" />
      </div>
    </AuthLayout>
  );
}
