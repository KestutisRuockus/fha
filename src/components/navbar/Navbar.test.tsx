import { fireEvent, render, screen } from "@testing-library/react";
import { ViewContext } from "../../context/ViewContext";
import Navbar from "./Navbar";
import { navLinks } from "../../constants/navLinks";
import { SearchContext } from "../../context/SearchContext";

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375, // simulate mobile screen width
    });
  });

  const setIsOpenMock = vi.fn();
  const setViewMock = vi.fn();
  const setQueryMock = vi.fn();

  const renderNavbar = (isOpen: boolean) =>
    render(
      <ViewContext.Provider value={{ view: "images", setView: setViewMock }}>
        <SearchContext.Provider value={{ query: "", setQuery: setQueryMock }}>
          <Navbar isOpen={isOpen} setIsOpen={setIsOpenMock} />
        </SearchContext.Provider>
      </ViewContext.Provider>
    );

  it("renders with collapsed state initially", () => {
    renderNavbar(false);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("icon-wrapper");
    expect(button).not.toHaveClass("rotated");
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button.querySelector("svg")).toHaveAttribute("viewBox", "0 0 24 24");
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

  it("clicking nav link calls setView with correct view and setQuery, and closes menu on mobile", () => {
    renderNavbar(true);
    const firstLink = screen.getByText(navLinks[0].name);

    fireEvent.click(firstLink);

    expect(setViewMock).toHaveBeenCalledWith(navLinks[0].component);
    expect(setQueryMock).toHaveBeenCalledWith("");
    expect(setIsOpenMock).toHaveBeenCalledWith(false); // closes menu on mobile
  });

  it("throws error if used without ViewContext", () => {
    expect(() =>
      render(
        <SearchContext.Provider value={{ query: "", setQuery: () => {} }}>
          <Navbar isOpen={false} setIsOpen={setIsOpenMock} />
        </SearchContext.Provider>
      )
    ).toThrow("Navbar must be used within a ViewProvider");
  });

  it("throws error if used without SearchContext", () => {
    expect(() =>
      render(
        <ViewContext.Provider value={{ view: "images", setView: () => {} }}>
          <Navbar isOpen={false} setIsOpen={setIsOpenMock} />
        </ViewContext.Provider>
      )
    ).toThrow("Navbar must be used within a SearchProvider");
  });
});
