import { ServiceItem } from "@/types";

interface ServiceCardProps {
  data: ServiceItem;
}

export function ServiceCard({ data }: ServiceCardProps) {
  return (
    <div className="bg-[#1E1E1F] p-6 rounded-2xl flex gap-4 border border-neutral-800">
      <div className="text-primary w-10 h-10 flex-shrink-0">
        {data.iconSvg}
      </div>
      <div>
        <h4 className="text-white font-bold text-lg mb-2">{data.title}</h4>
        <p className="text-[#D6D6D6] text-sm leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
}