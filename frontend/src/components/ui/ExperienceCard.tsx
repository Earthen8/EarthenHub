import { ExperienceItem } from "@/types";

interface ExperienceCardProps {
  data: ExperienceItem;
}

export function ExperienceCard({ data }: ExperienceCardProps) {
  return (
    <div className="bg-[#1E1E1F] p-6 rounded-2xl flex gap-4 border border-neutral-800 relative">
      <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-primary flex-shrink-0">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
           <path d="M4 4h12v12H4z" />
        </svg>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-white font-bold text-lg">{data.role}</h4>
          <span className="text-primary text-sm font-medium">{data.period}</span>
        </div>
        <p className="text-primary text-sm mb-4">
          {data.company} • {data.location}
        </p>
        <p className="text-[#D6D6D6] text-sm leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
}