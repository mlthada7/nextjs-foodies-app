'use client'; //* should be used in a lower tree component that really needs it, so the upper component can still be a server-side component

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from './nav-link.module.css';

const NavLink = ({ href, children }) => {
  const path = usePathname(); //~ only works in client-component, so need to use 'use client' directive

  return (
    <Link
      href={href}
      className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}
    >
      {children}
    </Link>
  );
};

export default NavLink;