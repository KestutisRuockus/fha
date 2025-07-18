import type React from "react";
import Navbar from "../navbar/Navbar";
import { useState } from "react";

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <main>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <section className={isOpen ? "expanded" : "collapsed"}>
        {children}
      </section>
    </main>
  );
}

export default AppLayout;
