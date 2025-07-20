import { fireEvent, render, screen } from "@testing-library/react";
import { SearchContext } from "../../context/SearchContext";
import { ViewContext } from "../../context/ViewContext";
import Search from "./Search";

describe("Search", () => {
  const mockSetQuery = vi.fn();
  const mockSetView = vi.fn();
  const mockOnSubmit = vi.fn();

  const renderWithproviders = () => {
    render(
      <SearchContext.Provider value={{ query: "", setQuery: mockSetQuery }}>
        <ViewContext value={{ view: "images", setView: mockSetView }}>
          <Search onSubmit={mockOnSubmit} />
        </ViewContext>
      </SearchContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the input and search icon", () => {
    renderWithproviders();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    renderWithproviders();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "cars" } });
    expect(input).toHaveValue("cars");
  });

  it("calls setQuery and setView on Enter key press and clears input", () => {
    renderWithproviders();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "dogs" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockSetQuery).toHaveBeenCalledWith("dogs");
    expect(mockSetView).toHaveBeenCalledWith("images");
    expect(input).toHaveValue("");
  });

  it("calls onSubmit callback if window.innerWidth < 768 on submit", () => {
    const originalInnerWidth = window.innerWidth;
    window.innerWidth = 500;

    const onSubmitMock = vi.fn();

    render(
      <SearchContext.Provider value={{ query: "", setQuery: mockSetQuery }}>
        <ViewContext.Provider value={{ view: "images", setView: mockSetView }}>
          <Search onSubmit={onSubmitMock} />
        </ViewContext.Provider>
      </SearchContext.Provider>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(onSubmitMock).toHaveBeenCalled();

    // Reset innerWidth
    window.innerWidth = originalInnerWidth;
  });
});
