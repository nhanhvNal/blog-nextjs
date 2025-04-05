 
const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          What Our Readers Say
        </h2>
        <div className="flex space-x-8 justify-center">
          <div className="bg-white shadow-lg rounded-lg p-6 w-1/3">
            <p className="text-gray-600">
              "This blog is amazing! I always look forward to reading new posts.
              Keep up the great work!"
            </p>
            <p className="mt-4 font-semibold text-blue-500">Jane Doe</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-1/3">
            <p className="text-gray-600">
              "As a fellow writer, I find this blog to be an inspiring resource.
              Thank you for sharing your insights!"
            </p>
            <p className="mt-4 font-semibold text-blue-500">John Smith</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
