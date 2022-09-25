import { forwardRef } from "react";

export const FormInput = forwardRef(({ id, type, name, placeholder, ...props }, ref) => (
  <input
    id={id}
    type={type}
    name={name}
    placeholder={placeholder}
    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 focus:invalid:ring-red-100 focus:invalid:border-red-300"
    {...props}
    ref={ref}
  />
));

export function FormErrorInput({ children }){
  return (
    <p className="mt-2 font-light text-red-400 text-sm">{children}</p>
  )
}