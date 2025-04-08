import Image from "next/image";
import { Metadata } from "next";
import { AboutModel } from "@/types/about.model";

async function fetchPageData(): Promise<AboutModel> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/about`, {
    cache: "force-cache",
    next: {
      revalidate: 10,
    },
  });

  if (!res.ok) throw new Error("Error when getting about");
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await fetchPageData();

  const title = profile.name;
  const description = profile.description;
  const image = profile.image;
  const url = `${process.env.NEXTAUTH_URL}/about`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    metadataBase: new URL(`${process.env.NEXTAUTH_URL}`),
    alternates: {
      canonical: url,
    },
  };
}

export default async function AboutPage() {
  const aboutData = await fetchPageData();

  return (
    <div className="bg-gray-50 min-height-screen">
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl font-bold">About Me</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-100 flex-shrink-0">
              <Image
                width={300}
                height={300}
                src={aboutData.profile.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {aboutData.profile.name}
              </h2>
              <p className="text-blue-600 font-medium mb-4">
                {aboutData.profile.title}
              </p>
              <p className="text-gray-600">{aboutData.profile.description}</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-semibold mb-4">
              {aboutData.story.title}
            </h3>
            {aboutData.story.content.map((paragraph) => (
              <p key={paragraph} className="mb-4">
                {paragraph}
              </p>
            ))}
            <h3 className="text-xl font-semibold mb-4 mt-8">
              {aboutData.mission.title}
            </h3>
            {aboutData.mission.content.map((paragraph) => (
              <p key={paragraph} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
