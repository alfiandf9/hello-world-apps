export default function FormLabel({ id, children }) {
  return (
    <label htmlFor={id} className="block mb-2">
      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
        {children}
      </span>
    </label>
  );
}
