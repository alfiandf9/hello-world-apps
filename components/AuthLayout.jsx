import Head from "next/head";

export default function AuthLayout({ children }){
  return(
    <div className="flex items-center min-h-screen bg-slate-800">
      <div className="max-w-md mx-auto my-10 w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md p-3">
        {children}
      </div>
    </div>
  )
}