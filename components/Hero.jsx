import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthAlert from "./AuthAlert";
import { FormErrorInput, FormInput } from "./FormInput";
import FormLabel from "./FormLabel";
import HeroButton from "./HeroButton";
import HeroDescription from "./HeroDescription";

export default function Hero({ token, dataUser }) {
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const user = JSON.parse(dataUser);

  async function handleGetUser() {
    const req = await fetch("/api/user-profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const res = await req.json();

    if (!req.ok) {
      setIsAuthorized(res);
      return false;
    }

    setIsAuthorized(null);
    setData(res);
    setValue("name", res.name);
    setValue("phone", res.phone);
  }

  useEffect(() => {
    handleGetUser();
  }, []);

  async function handleVerificationEmail(e) {
    e.preventDefault();

    setIsButtonDisabled(true);

    const req = await fetch("/api/email/request-verification", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const res = await req.json();

    if (!req.ok) {
      console.log(res);
      return false;
    }

    setSuccessMessage(res);
    setIsButtonDisabled(false);

    // remove alert after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  }

  async function handleEditProfile(field, e) {
    e.preventDefault();

    const req = await fetch(`/api/user-profile/update`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(field),
    });

    const res = await req.json();

    if (!req.ok) {
      console.log(res.message);
      return false;
    }

    handleGetUser(); // get latest user data
    setSuccessMessage(res.message);
    setShowModal(false);

    // remove alert after 3 sec
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
        {/* description hero */}
        <HeroDescription user={user} data={data} isAuthorized={isAuthorized} />
        {/* alert */}
        {successMessage && (
          <div className="fixed bottom-0 right-5">
            <AuthAlert successMessage={successMessage} onClickSuccess={() => setSuccessMessage(null)} />
          </div>
        )}
        {/* button hero */}
        <div className="flex justify-center items-center">
          {user && user.email_verified_at ? (
            <>
              <HeroButton onClick={() => setShowModal(true)} isButtonDisabled={false} label="Edit Profile" labelLoading="" />
              {/* modal */}
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-96 my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">Edit Profile</h3>
                          <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M17.7436 1.90956L15.9857 0.151642L9.01633 7.12099L2.04698 0.151642L0.289062 1.90956L7.25841 8.87891L0.289062 15.8483L2.04698 17.6062L9.01633 10.6368L15.9857 17.6062L17.7436 15.8483L10.7743 8.87891L17.7436 1.90956Z"
                                fill="black"
                              />
                            </svg>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <form onSubmit={handleSubmit(handleEditProfile)}>
                            <div className="mb-3">
                              <FormLabel id="name">Your Name</FormLabel>
                              <FormInput
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                {...register("name", {
                                  required: "Name required",
                                  minLength: 3,
                                })}
                              />
                              {errors.name?.type === "required" && <FormErrorInput>{errors.name.message}</FormErrorInput>}
                              {errors.name?.type === "minLength" && <FormErrorInput>Name should be more than 3 characters</FormErrorInput>}
                            </div>
                            <div className="mb-6">
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
                              <button className="w-full px-3 py-3 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none" type="submit">
                                Save Changes
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </>
          ) : (
            <HeroButton onClick={handleVerificationEmail} isButtonDisabled={isButtonDisabled} label="Verify Email" labelLoading="Sending Request" />
          )}
        </div>
      </div>
    </div>
  );
}
