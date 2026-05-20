import Image from "next/image";

export default function NoManuscriptPlaceholder() {
  return (
    <div className="flex w-full p-0 md:p-8">
      <div className="flex w-full flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
        <Image
          src="/images/empty-catalogue.png"
          alt="No Manuscripts"
          width={150}
          height={150}
          className="mb-4"
        />
        <p className="text-base font-medium">
          No manuscripts available for this issue
        </p>
      </div>
    </div>
  );
}
