"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Table from "@/app/dashboard/Table";
import { PostModel } from "@/types/blog.model";
import Modal from "@/components/common/Modal";
import LoadingPage from "@/components/common/LoadingPage";
import { postService } from "@/services/api";
import Button from "@/components/common/Button";
import { BiPlusCircle } from "react-icons/bi";

const Dashboard = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostModel[]>([
    {
      id: "1",
      title: "The Art of Creative Writing",
      description: "Discover techniques to enhance your creative writing skills and find inspiration in everyday life. Learn how to develop compelling characters, craft engaging plots, and create vivid settings that captivate your readers.",
      content: "Creative writing is both an art and a craft that requires practice, dedication, and a willingness to explore the depths of your imagination. Whether you're writing short stories, novels, poetry, or creative non-fiction, the principles of effective storytelling remain largely the same.\n\nOne of the most important aspects of creative writing is developing your unique voice. This is what sets your writing apart from others and makes it distinctively yours. Your voice includes your writing style, tone, perspective, and the themes you explore in your work.\n\nAnother crucial element is character development. Compelling characters drive engaging stories and connect with readers on an emotional level. Take time to understand your characters' motivations, fears, desires, and contradictions. Create character profiles that go beyond basic physical descriptions and delve into their psychological makeup.\n\nSetting is also vital to creative writing. A well-crafted setting can become almost like another character in your story, influencing plot developments and character choices. Whether you're creating a fictional world or describing a real location, include sensory details that bring the setting to life.\n\nFinally, revision is where the real magic happens. First drafts are rarely perfect – they're just about getting the ideas down on paper. During revision, you refine your narrative, strengthen your characters, eliminate inconsistencies, and polish your prose until it shines.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      date: "April 2, 2025",
      author: "Jane Doe",
      tags: ["Writing", "Creativity", "Self-improvement"],
      readingTime: "8 min",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    {
      id: "2",
      title: "Building Your Digital Presence",
      description: "Learn how to establish and grow your personal brand across different online platforms. Discover strategies for creating consistent content that resonates with your audience.",
      content: "In today's interconnected world, having a strong digital presence is essential for individuals and businesses alike. Your digital presence encompasses all the ways you appear online – from social media profiles to personal websites, from online portfolios to content you create and share.\n\nThe first step in building your digital presence is defining your personal brand. What are your core values? What expertise do you offer? Who is your target audience? Once you've clarified these aspects, you can create a consistent brand identity across all platforms.\n\nConsistency is key in building a recognizable digital presence. Use the same profile picture, color schemes, and tone of voice across platforms. This helps people recognize and remember you in the crowded digital space.\n\nContent creation forms the backbone of your digital presence. Whether it's blog posts, videos, podcasts, or social media updates, quality content establishes your expertise and provides value to your audience. Focus on creating content that addresses your audience's needs and interests.\n\nEngagement is equally important. Respond to comments, participate in relevant conversations, and build genuine connections with your audience and peers. Digital presence isn't just about broadcasting – it's about creating meaningful interactions.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      date: "March 28, 2025",
      author: "John Smith",
      tags: ["Digital Marketing", "Personal Branding", "Social Media"],
      readingTime: "6 min",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      id: "3",
      title: "Mindfulness in the Digital Age",
      description: "Explore practices for staying present and focused in an increasingly distracted world. Learn techniques to maintain mental clarity while navigating digital overwhelm.",
      content: "The digital age has brought unprecedented connectivity and access to information, but it has also introduced unique challenges to our mental well-being. Constant notifications, information overload, and the pressure to always be available can lead to stress, anxiety, and a perpetual state of distraction.\n\nMindfulness – the practice of paying attention to the present moment with curiosity and without judgment – offers a powerful antidote to digital distraction. By cultivating mindfulness, we can develop greater awareness of our digital habits and make more intentional choices about how we engage with technology.\n\nOne simple practice is to take digital breaks throughout the day. Set aside specific times when you disconnect from devices completely. During these breaks, engage in activities that ground you in the present moment – take a walk in nature, practice deep breathing, or simply observe your surroundings with full attention.\n\nAnother helpful technique is mindful media consumption. Before checking your phone or opening social media, pause and ask yourself what your intention is. Are you seeking specific information, or just filling time? This brief moment of reflection can help you make more deliberate choices about your digital engagement.\n\nFinally, create technology-free zones or times in your life. Perhaps the dinner table is a device-free area, or maybe you don't check email during the first and last hour of your day. These boundaries help create space for presence and human connection in your life.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      date: "March 21, 2025",
      author: "Alex Johnson",
      tags: ["Mindfulness", "Mental Health", "Digital Wellbeing"],
      readingTime: "7 min",
      authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    {
      id: "4",
      title: "The Future of Web Development",
      description: "Exploring upcoming trends and technologies that will shape the future of web development. From AI integration to new frameworks and design paradigms.",
      content: "The web development landscape is constantly evolving, with new technologies, frameworks, and methodologies emerging at a rapid pace. Staying ahead of these trends is crucial for developers who want to remain competitive and continue building innovative, user-friendly web applications.\n\nArtificial Intelligence integration is perhaps the most significant trend shaping the future of web development. From AI-powered chatbots and virtual assistants to intelligent content recommendation systems, AI is enhancing user experiences across the web. Developers are increasingly incorporating machine learning models into their applications to provide personalized experiences and automate complex tasks.\n\nJamstack architecture continues to gain popularity for its performance, security, and developer experience benefits. By pre-rendering pages and serving them directly from a CDN, Jamstack sites offer lightning-fast load times and reduced server vulnerabilities.\n\nProgressiveWeb Apps (PWAs) bridge the gap between web and native applications, offering app-like experiences directly in the browser. With features like offline functionality, push notifications, and home screen installation, PWAs provide users with the convenience of native apps without requiring a download from an app store.\n\nWebAssembly (WASM) is enabling high-performance code execution in the browser, opening up new possibilities for web applications. Developers can now bring computationally intensive applications – like video editing, 3D rendering, and games – to the web with near-native performance.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      date: "March 15, 2025",
      author: "Sam Wilson",
      tags: ["Web Development", "Technology", "Programming"],
      readingTime: "10 min",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      id: "5",
      title: "Artificial Intelligence: Myths and Realities",
      description: "Separating facts from fiction in the rapidly evolving world of AI. Understand the current capabilities, limitations, and ethical considerations of artificial intelligence.",
      content: "Artificial Intelligence has captured the public imagination like few other technologies, inspiring both excitement about its potential and fear about its risks. Yet many popular narratives about AI are based more on science fiction than on the current realities of the technology.\n\nOne common myth is that AI is on the verge of achieving human-like general intelligence. In reality, today's AI systems are examples of narrow AI – they're specialized tools designed to excel at specific tasks, from image recognition to language processing. While these systems can outperform humans in their specialized domains, they lack the versatility, common sense reasoning, and contextual understanding that define human intelligence.\n\nAnother misconception is that AI systems understand the content they process. When a language model generates text or answers questions, it's not doing so with comprehension as humans understand it. Rather, these systems are making statistical predictions based on patterns they've identified in their training data, without truly understanding meaning or context.\n\nMany also overestimate AI's autonomy. Current AI systems require extensive human input – from collecting and labeling training data to designing architectures and fine-tuning parameters. Even deployment involves significant human oversight and intervention.\n\nThat said, AI does pose real challenges that warrant serious attention. Issues of bias in AI systems, privacy concerns related to data collection, potential job displacement, and questions of transparency and accountability all require thoughtful policy solutions and ethical frameworks.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      date: "March 10, 2025",
      author: "Taylor Reed",
      tags: ["Artificial Intelligence", "Technology", "Ethics"],
      readingTime: "9 min",
      authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
    },
    {
      id: "6",
      title: "The Psychology of Productivity",
      description: "Understanding the mental factors that influence our ability to work efficiently and effectively. Learn evidence-based strategies to optimize your workflow.",
      content: "Productivity isn't just about time management techniques or the latest organizational apps – it's deeply rooted in psychological processes. Understanding these mental factors can help you work with your brain rather than against it, leading to more sustainable productivity practices.\n\nMotivation is a key psychological component of productivity. Research shows that intrinsic motivation – doing something because it's inherently rewarding – leads to more sustained effort and higher quality work than extrinsic motivation. Finding meaning and purpose in your tasks, or connecting them to your larger goals, can boost intrinsic motivation.\n\nThe flow state, described by psychologist Mihaly Csikszentmihalyi, represents optimal productivity. This state occurs when you're fully immersed in a challenging but manageable task, losing track of time and self-consciousness. To encourage flow, eliminate distractions, work on tasks that match your skill level, and set clear goals.\n\nCognitive biases also affect productivity. The planning fallacy leads us to consistently underestimate how long tasks will take. Combating this requires tracking how long tasks actually take and building in buffer time. Similarly, the Zeigarnik effect – our tendency to remember uncompleted tasks better than completed ones – explains why unfinished work can occupy our mental space. Writing down incomplete tasks can help free up mental resources.\n\nFinally, our physical and emotional states significantly impact our productivity. Adequate sleep, regular exercise, and stress management aren't just good for general health – they're essential productivity tools that optimize cognitive function and emotional regulation.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      date: "March 5, 2025",
      author: "Morgan Black",
      tags: ["Productivity", "Psychology", "Self-improvement"],
      readingTime: "8 min",
      authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6"
    },
    {
      id: "7",
      title: "Sustainable Living in Urban Environments",
      description: "Practical approaches to reducing your environmental footprint while living in cities. Discover small changes that make a big difference.",
      content: "Urban living presents unique challenges for sustainability, from limited space for growing food to shared utility systems that may not be eco-friendly. However, city dwellers have numerous opportunities to reduce their environmental impact without sacrificing quality of life.\n\nMinimizing waste is a powerful starting point. Composting, even in small spaces, can significantly reduce the amount of organic waste sent to landfills. Many cities now have composting programs or community gardens that accept food scraps. Additionally, embracing minimalism and practicing thoughtful consumption can reduce overall waste generation.\n\nEnergy conservation is another important aspect of sustainable urban living. Simple habit changes like unplugging devices when not in use, using LED lighting, and being mindful of heating and cooling can reduce your carbon footprint. If you rent and can't install renewable energy systems, look into community solar programs or renewable energy credits through your utility provider.\n\nTransportation choices have perhaps the most visible impact on urban sustainability. Taking advantage of public transit, bike-sharing programs, and walkable neighborhoods not only reduces emissions but often improves quality of life by reducing commute stress and increasing physical activity.\n\nFinally, community engagement amplifies individual sustainability efforts. Participating in local environmental initiatives, supporting farmers' markets and local businesses, and advocating for green policies at the municipal level all contribute to creating more sustainable urban environments.",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      date: "February 28, 2025",
      author: "Robin Chen",
      tags: ["Sustainability", "Urban Living", "Environment"],
      readingTime: "7 min",
      authorAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb"
    },
    {
      id: "8",
      title: "The Evolution of Remote Work",
      description: "How distributed teams are reshaping the workplace landscape. Explore best practices, challenges, and the future of working remotely.",
      content: "Remote work, once a fringe benefit offered by forward-thinking companies, has evolved into a mainstream work arrangement that's reshaping how we think about careers, collaboration, and workplace culture. This transformation was accelerated by the global pandemic but had been gradually gaining momentum for years, driven by advances in digital technology and changing attitudes toward work-life balance.\n\nThe benefits of remote work are numerous and well-documented. Workers enjoy greater flexibility, eliminated commutes, and often report higher job satisfaction and improved work-life balance. Companies benefit from access to global talent pools, reduced overhead costs, and frequently see increased productivity and employee retention.\n\nHowever, distributed teams face unique challenges. Communication can be more complex when team members are spread across different time zones and lacking in-person cues. Collaboration requires more intentional structure and better digital tools. And many remote workers struggle with isolation or difficulty maintaining boundaries between work and personal life.\n\nSuccessful remote work cultures address these challenges through clear communication protocols, regular video interactions, and deliberate efforts to build team cohesion despite physical distance. They invest in appropriate technology and establish norms that respect both synchronous and asynchronous work styles.\n\nAs remote work continues to evolve, we're seeing the rise of hybrid models that combine remote flexibility with intentional in-person gatherings. Digital nomad visas and 'workations' are becoming more common, and purpose-built co-living spaces for remote workers are emerging in desirable locations worldwide.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      date: "February 22, 2025",
      author: "Jordan Rivera",
      tags: ["Remote Work", "Business", "Lifestyle"],
      readingTime: "9 min",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postToDelete, setPostToDelete] = useState<PostModel | null>(null);

  const handleDelete = useCallback(
    (id: string) => {
      const post = posts.find((post) => post.id === id);
      setPostToDelete(post || null);
      setShowModal(true);
    },
    [posts]
  );

  const confirmDelete = useCallback(async () => {
    setIsLoading(true);
    await postService.destroy(postToDelete?.id || "");
    setPosts(posts.filter((post) => post.id !== postToDelete?.id));
    setShowModal(false);
    setIsLoading(false);
  }, [postToDelete, posts]);

  const cancelDelete = () => setShowModal(false);

  const handleAdd = () => router.push("/dashboard/create-edit-post");

  const handleEdit = (id: string) =>
    router.push(`/dashboard/create-edit-post?id=${id}`);

  return (
    <>
      <LoadingPage isLoading={isLoading} />
      <div className="p-6 bg-gray-50 min-height-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            List of Posts
          </h1>
          <Button
            color="green"
            label="Add New Post"
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all"
            onClick={handleAdd}
          >
            <BiPlusCircle className="text-xl" />
            Add New Post
          </Button>
        </div>
        <Table posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
        <Modal
          show={showModal}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message={`Bạn có chắc muốn xóa bài viết: "${postToDelete?.title}"?`}
        />
      </div>
    </>
  );
};

export default Dashboard;
