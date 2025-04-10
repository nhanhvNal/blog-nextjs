import Sidebar from "@/components/Sidebar";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import LatestPosts from "@/components/home/LatestPosts";
import Testimonials from "@/components/home/Testimonials";
import Seo from "@/components/Seo";
import Slider from "@/components/Slider";
import { SLIDER_DATA } from "@/shared/constants/slider";
import { fetchPosts } from "@/shared/untils/api";

export default async function HomeContainer() {
  const posts = await fetchPosts({
    order: "asc",
    limit: 4,
    cache: "no-store",
  });

  const featuredPosts = await fetchPosts({
    sort: "date",
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Seo
        title="Latest Posts | Your Blog Name"
        description="Explore the latest blog posts from our community."
        url="http:localhost:3000"
      />
      <Slider slides={SLIDER_DATA} />
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        <main className="md:col-span-3">
          <LatestPosts posts={posts} />
        </main>
        <aside className="md:col-span-1">
          <Sidebar />
        </aside>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <FeaturedPosts featuredPosts={featuredPosts} />
        <Testimonials />
      </div>
    </div>
  );
}
