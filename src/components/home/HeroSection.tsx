const HeroSection = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://your-image-url.com/hero-image.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white py-32">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Welcome to the Blog
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Explore articles, stories, and creative content from our community.
        </p>
        <a
          href="#latest-posts"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
        >
          Read Latest Posts
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
