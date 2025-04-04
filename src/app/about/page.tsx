import Image from 'next/image';
import React from 'react';

const About: React.FC = () => {
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
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">John Doe</h2>
              <p className="text-blue-600 font-medium mb-4">
                Writer & Content Creator
              </p>
              <p className="text-gray-600">
                Passionate about storytelling, technology, and the intersection
                of creativity and innovation. I&apos;ve been writing for over 10
                years and love sharing insights about life, work, and personal
                growth.
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-semibold mb-4">My Story</h3>
            <p className="mb-4">
              I started this blog as a way to document my journey and share what
              I&apos;ve learned along the way. With a background in technology
              and a love for creative writing, I found my passion in creating
              content that helps others navigate their own paths.
            </p>
            <p className="mb-4">
              When I&apos;m not writing, you can find me hiking in the
              mountains, experimenting with new recipes, or getting lost in a
              good book. I believe in continuous learning and pushing beyond
              comfort zones.
            </p>
            <h3 className="text-xl font-semibold mb-4 mt-8">My Mission</h3>
            <p className="mb-4">
              My goal is to create content that inspires, educates, and
              entertains. I believe in the power of storytelling to connect
              people and ideas, and I&apos;m committed to sharing authentic
              experiences that resonate with readers.
            </p>
            <p>
              Thank you for visiting my blog. I hope you find something valuable
              here, and I look forward to connecting with you through my
              writing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
