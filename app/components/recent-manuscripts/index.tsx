"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import { getRecentManuscriptById } from "@/app/api/(landing-page)/manuscript";
import { RecentManuscript } from "@/types";
import { useRouter } from "next/navigation";

const LatestArticles = () => {
  const router = useRouter();

  const [articles, setArticles] = useState<RecentManuscript[]>([]);

  useEffect(() => {
    const fetchManuscripts = async () => {
      try {
        const response = await getRecentManuscriptById("5");
        // Ensure the data structure matches expectations
        if (response && Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          console.error("Unexpected API response structure:", response);
        }
      } catch (error) {
        console.error("Failed to fetch manuscripts:", error);
      }
    };

    fetchManuscripts();
  }, []);

  if (articles.length === 0) {
    return null; // Return null if no articles are available
  }

  return (
    <div className="w-full flex justify-center p-0 sm:p-2 px-2 sm:px-4 lg:px-8">
        <div className="max-w-5xl w-full bg-gray-50 p-2 sm:p-4">
        {/* Header Section */}
        <div className="flex border-l-4 border-primary justify-between pl-2 items-center pb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Latest Articles <span className="text-gray-600">› </span>
          </h2>
          <button
            className="border border-gray-400 px-4 py-2 text-sm rounded-md hover:bg-gray-200"
            onClick={() => router.push("/manuscripts")}
          >
            View All Manuscripts
          </button>
        </div>

        {/* Articles List */}
        <div className="mt-6">
          {articles
            .filter((article) => article.isActive) // Only show published articles
            .map((article) => (
              <div
                key={article.id}
                className="bg-white p-4 rounded-lg shadow-sm border-t-2 border-primary"
              >
                <Image
                  className="my-1"
                  src={"/logo/shadai_logo.png"}
                  alt="shadai"
                  width={120}
                  height={15}
                />
                <div className="text-sm text-gray-600">
                  {article.Issue?.Volume?.name &&
                    `Vol. ${article.Issue.Volume.name},`}{" "}
                  {article.Issue?.name}
                </div>
                <h3
                  className="text-lg font-semibold text-gray-800 hover:text-primary cursor-pointer mt-1"
                  onClick={() =>
                    router.push(`/manuscripts/details/${article.id}`)
                  }
                >
                  {article.title}
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  {article.Authors?.join(", ")}
                </p>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <FaRegClock className="mr-1" />
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
                {article.DOI && (
                  <a
                    href={article.DOI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm underline mt-2 block"
                  >
                    View Full Article
                  </a>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
