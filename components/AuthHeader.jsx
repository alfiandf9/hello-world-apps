import Link from "next/link";

export default function AuthHeader({ subTitle }) {
  return (
    <div className="text-center mb-8">
      <Link href="/">
      <a>
        <h1 className="my-3 text-3xl font-semibold text-gray-700">
          hello<span className="font-bold">World</span>
        </h1>
      </a>
      </Link>
      <p className="text-gray-500">{subTitle}</p>
    </div>
  );
}
