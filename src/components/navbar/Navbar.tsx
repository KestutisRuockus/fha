import "./navbar.css";
import { navLinks } from "../../constants/navLinks";
import type { LinkProps, NavbarProps } from "../../types/types";

const HamburgerIcon = () => {
  return (
    <svg
      className="icon"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6h18M3 12h18m-18 6h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      className="icon"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Link = ({ linkDetails }: { linkDetails: LinkProps }) => {
  return <p>{linkDetails.name}</p>;
};

const Navbar = ({ isOpen, setIsOpen }: NavbarProps) => {
  return (
    <aside className={isOpen ? "expanded" : "collapsed"}>
      <button
        className={`icon-wrapper ${isOpen ? "rotated" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      <nav className={`${isOpen ? "expanded" : "collapsed"}`}>
        {navLinks.map((link) => (
          <Link linkDetails={link} />
        ))}
      </nav>
    </aside>
  );
};

export default Navbar;
