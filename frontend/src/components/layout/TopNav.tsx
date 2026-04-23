export function TopNav() {
  const navItems = ["About", "Resume", "Portfolio", "Blog", "Contact"];

  return (
    <nav className="absolute top-0 right-0 bg-[#1E1E1F] rounded-bl-3xl rounded-tr-3xl px-8 py-5 border border-neutral-800 border-t-0 border-r-0">
      <ul className="flex gap-8">
        {navItems.map((item) => (
          <li key={item}>
            <button className="text-[#D6D6D6] hover:text-primary transition-colors text-sm font-medium">
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}