export default function ArticleSection({ children }) {
  return (
    <article className="my-10">
      <h1 className="text-4xl font-semibold text-center">Content</h1>
      <hr className="mb-8 mt-3 mx-auto w-48 h-1 bg-gray-300 rounded border-0" />
      <div className="flex justify-center">
        {children}
      </div>
    </article>
  );
}
