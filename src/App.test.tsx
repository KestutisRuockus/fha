import { render, screen } from "@testing-library/react";
import { ViewContext } from "./context/ViewContext";
import App from "./App";
import { SearchContext } from "./context/SearchContext";

vi.mock("./components/Images/ImagesContainer", () => ({
  __esModule: true,
  default: () => <div data-testId="images-container" />,
}));

vi.mock("./components/favourite/FavouriteContainer", () => ({
  __esModule: true,
  default: () => <div data-testid="favourite-container" />,
}));

const renderWithProviders = (view: "images" | "favourites") => {
  return render(
    <ViewContext.Provider value={{ view, setView: vi.fn() }}>
      <SearchContext.Provider value={{ query: "", setQuery: vi.fn() }}>
        <App />
      </SearchContext.Provider>
    </ViewContext.Provider>
  );
};

describe("App", () => {
  it("renders ImageContainer when view is 'images'", () => {
    renderWithProviders("images");
    expect(screen.getByTestId("images-container")).toBeInTheDocument();
  });

  it("renders FavouriteContainer when view is 'favourtie'", () => {
    renderWithProviders("favourites");
    expect(screen.getByTestId("favourite-container")).toBeInTheDocument();
  });

  it("throws error if ViewContext is missing", () => {
    const renderWithoutProvider = () =>
      render(
        <SearchContext.Provider value={{ query: "", setQuery: vi.fn() }}>
          <App />
        </SearchContext.Provider>
      );
    expect(renderWithoutProvider).toThrow("must be used within a ViewProvider");
  });

  it("throws error if SearchContext is missing", () => {
    const renderWithoutSearchProvider = () =>
      render(
        <ViewContext.Provider value={{ view: "images", setView: vi.fn() }}>
          <App />
        </ViewContext.Provider>
      );
    expect(renderWithoutSearchProvider).toThrow(
      "Navbar must be used within a SearchProvider"
    );
  });
});
