import Image from "next/image";

type RestoCardProps = {
  name: string;
  logo?: string;
  description: string;
  locations: string;
  link?: string;
};

export default function RestoCard({
  name,
  logo,
  description,
  locations,
  link,
}: RestoCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-sm mb-4 bg-white">
      <div className="flex items-center gap-3">
        {logo && (
          <Image
            src={logo}
            alt={name}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover"
          />
        )}
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>

      <p className="mt-2 text-gray-700">{description}</p>

      <p className="mt-1 text-sm text-gray-500">
        <strong>Zones :</strong> {locations}
      </p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-blue-600 underline"
        >
          Page Facebook
        </a>
      )}
    </div>
  );
}
