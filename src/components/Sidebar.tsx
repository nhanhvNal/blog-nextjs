import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="space-y-8 mt-14"> 
      <div className="bg-white p-6 shadow-lg rounded-lg text-center">
        <img
          src="/images/author.jpg"
          alt="Author"
          className="w-24 h-24 mx-auto rounded-full border-4 border-gray-300"
        />
        <h3 className="mt-4 text-xl font-semibold">John Doe</h3>
        <p className="text-gray-500 text-sm mt-2">
          A writer and blogger passionate about sharing knowledge.
        </p>
        <Link href="/about" className="text-blue-500 mt-3 block">
          Read More
        </Link>
      </div>
 
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <ul className="space-y-3 text-gray-600">
          <li>
            <Link href="/category/technology" className="hover:text-blue-500">
              Technology
            </Link>
          </li>
          <li>
            <Link href="/category/lifestyle" className="hover:text-blue-500">
              Lifestyle
            </Link>
          </li>
          <li>
            <Link href="/category/business" className="hover:text-blue-500">
              Business
            </Link>
          </li>
        </ul>
      </div>

      {/* Popular Posts */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Popular Posts
        </h3>
        <ul className="space-y-4">
          <li>
            <Link
              href="/post/1"
              className="flex items-center space-x-3 hover:text-blue-500"
            >
              <img
                src="/images/post1.jpg"
                alt="Post"
                className="w-16 h-16 rounded-lg"
              />
              <span>How to start a blog in 2024</span>
            </Link>
          </li>
          <li>
            <Link
              href="/post/2"
              className="flex items-center space-x-3 hover:text-blue-500"
            >
              <img
                src="/images/post2.jpg"
                alt="Post"
                className="w-16 h-16 rounded-lg"
              />
              <span>10 tips to improve your writing</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
