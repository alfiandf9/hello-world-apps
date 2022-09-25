export default function HeroDescription({ data, user, isAuthorized}) {
  return (
    <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
        Hello,
        <span className="text-indigo-700 ml-3">{Object.keys(data).length > 0 ? data.name : user?.name}</span>
      </h1>
      {Object.keys(data).length > 0 ? (
        <div className="flex w-96 mt-5 items-center justify-around">
          <p className="flex items-center justify-center text-gray-400 font-normal text-center text-lg">
            <svg className="mr-2" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.76 0.355469H2.24005C1.44805 0.355469 0.807249 1.00347 0.807249 1.79547L0.800049 10.4355C0.800049 11.2275 1.44805 11.8755 2.24005 11.8755H13.76C14.552 11.8755 15.2 11.2275 15.2 10.4355V1.79547C15.2 1.00347 14.552 0.355469 13.76 0.355469ZM13.76 10.4355H2.24005V3.23547L8.00005 6.83547L13.76 3.23547V10.4355ZM8.00005 5.39547L2.24005 1.79547H13.76L8.00005 5.39547Z"
                fill="gray"
              />
            </svg>
            {data.email}
          </p>
          <p className="flex items-center justify-center text-gray-400 text-center text-lg">
            <svg className="mr-2" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.41333 5.5488C3.37333 7.43547 4.92 8.97547 6.80667 9.94213L8.27333 8.47547C8.45333 8.29547 8.72 8.23547 8.95333 8.31547C9.7 8.56214 10.5067 8.69547 11.3333 8.69547C11.7 8.69547 12 8.99547 12 9.36214V11.6888C12 12.0555 11.7 12.3555 11.3333 12.3555C5.07333 12.3555 0 7.28214 0 1.02214C0 0.655469 0.3 0.355469 0.666667 0.355469H3C3.36667 0.355469 3.66667 0.655469 3.66667 1.02214C3.66667 1.85547 3.8 2.65547 4.04667 3.40214C4.12 3.63547 4.06667 3.89547 3.88 4.08214L2.41333 5.5488Z"
                fill="gray"
              />
            </svg>
            {data.phone}
          </p>
        </div>
      ) : (
        <p className="mt-5 text-gray-400 font-normal text-center text-lg">
          {isAuthorized} <br /> {isAuthorized && <span className="text-red-400"> To view and change your data, please verify your email first.</span>}
        </p>
      )}
    </div>
  );
}
