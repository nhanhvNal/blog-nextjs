const Newsletter = () => {
  return (
    <section className="bg-blue-500 py-16 text-white text-center">
      <h2 className="text-3xl font-bold">Stay Updated!</h2>
      <p className="mt-4 text-lg">
        Sign up for our newsletter and never miss a post.
      </p>
      <form className="mt-6 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-l-lg text-gray-800 w-full md:w-80"
        />
        <button className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-r-lg hover:bg-gray-100 transition-all">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
