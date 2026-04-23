interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="mb-8 relative">
      <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
      <div className="h-1 w-12 bg-primary rounded-full"></div>
    </div>
  );
}