import Link from "next/link";

export default function AuthFooter({ title, href, subtitle }) {
  return (
    <p className="text-sm text-center text-gray-400 mb-1">
      {title}{" "}
      <Link href={href}>
        <a className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500">{subtitle}</a>
      </Link>
    </p>
  );
}
