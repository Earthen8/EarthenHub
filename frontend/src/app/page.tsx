import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { UserProfile, ServiceItem, ExperienceItem } from "@/types";

export default async function Page() {
  const profileData: UserProfile = {
    name: "Earthen Krisdian Setya",
    title: "Creative Technologist",
    email: "earthen505@gmail.com",
    phone: "+62 878 1722 7300",
    location: "South Tangerang, ID",
    birthday: "I born in 2006",
    avatarUrl: "/avatar-placeholder.jpg",
    aboutText: [
      "As a versatile digital collaborator and creative strategist, I leverage advanced AI capabilities to transform complex ideas into high-quality text, imagery, and multimedia content. My expertise lies in bridging the gap between technical precision and human-centric storytelling, ensuring every project is both data-driven and engaging.",
      "By integrating cutting-edge tools like Gemini 3 Flash and Veo, I deliver tailored solutions that optimize workflow efficiency and drive digital innovation. I am dedicated to providing insightful, SEO-optimized results that empower users to achieve their professional goals in an evolving technological landscape."
    ]
  };

  const services: ServiceItem[] = [
    {
      id: 1,
      title: "Web Design",
      description: "The most modern and high-quality design made at a professional level.",
      iconSvg: <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
    },
    {
      id: 2,
      title: "Web Development",
      description: "High-quality development of sites at the professional level.",
      iconSvg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
    }
  ];

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      role: "Senior Creative Technologist",
      company: "Future Studios",
      location: "Los Angeles, CA",
      period: "2021 - Present",
      description: "Lead development of immersive web applications using React and Three.js. Architected scalable frontend systems for Fortune 500 clients and mentored junior design-engineering staff."
    }
  ];

  return (
    <main className="min-h-screen bg-[#121212] p-8 font-manrope text-[#D6D6D6]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 relative">
        
        <Sidebar profile={profileData} />

        <div className="bg-[#1E1E1F] rounded-3xl p-10 border border-neutral-800 relative">
          <TopNav />

          <section className="mt-12 mb-10">
            <SectionTitle title="About Me" />
            <div className="flex flex-col gap-4 text-sm leading-relaxed">
              {profileData.aboutText.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-6">What I'm Doing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map(service => (
                <ServiceCard key={service.id} data={service} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Work Experience</h3>
            <div className="flex flex-col gap-6">
              {experiences.map(exp => (
                <ExperienceCard key={exp.id} data={exp} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}