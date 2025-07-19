import { fireEvent, render, screen } from "@testing-library/react";
import { ViewContext } from "../../context/ViewContext";
import Navbar from "./Navbar";
import { navLinks } from "../../constants/navLinks";

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setIsOpenMock = vi.fn();
  const setViewMock = vi.fn();

  const renderNavbar = (isOpen: boolean) =>
    render(
      <ViewContext.Provider value={{ view: "images", setView: setViewMock }}>
        <Navbar isOpen={isOpen} setIsOpen={setIsOpenMock} />
      </ViewContext.Provider>
    );

  it("renders with collapsed state initially", () => {
    renderNavbar(false);
    expect(screen.getByRole("button")).toHaveClass("icon-wrapper");
    expect(screen.getByRole("button")).not.toHaveClass("rotated");
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
    expect(screen.getByRole("button").querySelector("svg")).toHaveAttribute(
      "viewBox",
      "0 0 24 24"
    );
    expect(screen.getByRole("navigation")).toHaveClass("collapsed");
  });

  it("renders with expanded state when open", () => {
    renderNavbar(true);
    expect(screen.getByRole("button")).toHaveClass("rotated");
    expect(screen.getByRole("navigation")).toHaveClass("expanded");
  });

  it("toggle button calls setIsOpen with toggled state", () => {
    renderNavbar(false);

    fireEvent.click(screen.getByRole("button"));

    expect(setIsOpenMock).toHaveBeenCalledTimes(1);
    expect(setIsOpenMock).toHaveBeenCalledWith(true);
  });

  it("renders all nav links", () => {
    renderNavbar(false);
    navLinks.forEach((link) => {
      expect(screen.getByText(link.name)).toBeInTheDocument();
    });
  });

  it("clicking nav link calls setView with correct view", () => {
    renderNavbar(true);
    fireEvent.click(screen.getByText(navLinks[0].name));
    expect(setViewMock).toHaveBeenCalledWith(navLinks[0].component);
  });

  it("throws error if used without ViewContext", () => {
    expect(() =>
      render(<Navbar isOpen={false} setIsOpen={setIsOpenMock} />)
    ).toThrow("Navbar must be used within a ViewProvider");
  });
});
