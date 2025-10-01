"use client";
import { useRouter, usePathname } from "next/navigation";

const LanguageSwitcher = ({ currentLocale }: { currentLocale: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const segments = pathname.split("/");
    segments[1] = newLocale; // Replace locale in path
    router.push(segments.join("/"));
  };

  return (
    
      <select
        className="bg-black border border-gray-600 rounded px-3 py-1 text-white text-sm"
        value={currentLocale}
        onChange={handleChange}
      >
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
      </select>
  );
};

export default LanguageSwitcher;
