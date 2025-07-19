import { render, screen } from "@testing-library/react";
import { ViewContext } from "./context/ViewContext";
import App from "./App";

vi.mock("./components/Images/ImagesContainer", () => ({
  __esModule: true,
  default: () => <div data-testId="images-container" />,
}));

vi.mock("./components/favourite/FavouriteContainer", () => ({
  __esModule: true,
  default: () => <div data-testid="favourite-container" />,
}));

describe("App", () => {
  it("renders ImageContainer when view is 'images'", () => {
    render(
      <ViewContext.Provider value={{ view: "images", setView: vi.fn() }}>
        <App />
      </ViewContext.Provider>
    );

    expect(screen.getByTestId("images-container")).toBeInTheDocument();
  });

  it("renders FavouriteContainer when view is 'favourtie'", () => {
    render(
      <ViewContext.Provider value={{ view: "favourites", setView: vi.fn() }}>
        <App />
      </ViewContext.Provider>
    );

    expect(screen.getByTestId("favourite-container")).toBeInTheDocument();
  });

  it("thorws error if ViewContext is missing", () => {
    const renderWithoutProvider = () => render(<App />);
    expect(renderWithoutProvider).toThrow("must be used within a ViewProvider");
  });
});
