import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { UserProfile, ServiceItem, ExperienceItem } from "@/types";

export default async function Page() {
  const profileData: UserProfile = {
    name: "Alex Rivers",
    title: "Creative Technologist",
    email: "alex.rivers@dev.io",
    phone: "+1 (213) 555-0123",
    location: "Los Angeles, CA",
    birthday: "October 24, 1992",
    avatarUrl: "/avatar-placeholder.jpg",
    aboutText: [
      "I'm a Creative Technologist based in Los Angeles, specializing in crafting immersive digital experiences that bridge the gap between aesthetic design and technical excellence. With over 8 years of experience, I turn complex problems into elegant, user-centric solutions.",
      "My job is to build your website so that it is functional and user-friendly but at the same time attractive. Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use. My aim is to bring across your message and identity in the most creative way."
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