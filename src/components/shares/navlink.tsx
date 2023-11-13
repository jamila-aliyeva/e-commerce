"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  onClick: () => void;
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ onClick, href, children }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={onClick}
      className={pathname === href ? "active" : ""}>
      {children}
    </Link>
  );
};

export default NavLink;
