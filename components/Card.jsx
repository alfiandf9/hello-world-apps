export default function Card({ title, description, image, image_url }) {
  return (
    <>
      <a href="#">
        <img className="rounded-t-lg" src={image_url} alt={image} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
      </div>
    </>
  );
}
