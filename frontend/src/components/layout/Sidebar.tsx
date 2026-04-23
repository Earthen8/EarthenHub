import { UserProfile } from "@/types";
import Image from "next/image";

interface SidebarProps {
  profile: UserProfile;
}

export function Sidebar({ profile }: SidebarProps) {
  return (
    <aside className="bg-[#1E1E1F] rounded-3xl p-8 border border-neutral-800 h-max sticky top-8">
      <div className="flex flex-col items-center mb-8 pb-8 border-b border-neutral-800">
        <div className="w-32 h-32 rounded-3xl bg-neutral-800 mb-4 overflow-hidden relative">
          <Image 
            src={profile.avatarUrl} 
            alt={profile.name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{profile.name}</h1>
        <span className="bg-neutral-800 text-primary px-4 py-1.5 rounded-lg text-xs font-medium">
          {profile.title}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <ContactRow icon="✉️" label="Email" value={profile.email} />
        <ContactRow icon="📱" label="Phone" value={profile.phone} />
        <ContactRow icon="📍" label="Location" value={profile.location} />
        <ContactRow icon="📅" label="Birthday" value={profile.birthday} />
      </div>
    </aside>
  );
}

function ContactRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#D6D6D6] uppercase mb-1">{label}</p>
        <p className="text-sm text-white">{value}</p>
      </div>
    </div>
  );
}