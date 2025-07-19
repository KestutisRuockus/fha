import { fireEvent, render, screen } from "@testing-library/react";
import type { Image } from "../../types/types";
import ImageCard from "./ImageCard";
import { toggleFavouritePhoto } from "../../utils/localStorage";
import React from "react";

vi.mock("../../utils/localStorage");

const sampleImage: Image = {
  id: 1,
  photographer: "Jane Doe",
  src: {
    tiny: "tiny.jpg",
    small: "small.jpg",
    medium: "medium.jpg",
    large: "large.jpg",
    large2x: "large2x.jpg",
    original: "original.jpg",
  },
  avg_color: "#123456",
  alt: "Sample Image",
};

describe("ImageCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders image and details correctly", () => {
    render(<ImageCard imageDetails={sampleImage} isFavourited={false} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", sampleImage.src.medium);
    expect(img).toHaveAttribute("alt", sampleImage.alt);
    expect(img).toHaveStyle(`background-color: ${sampleImage.avg_color}`);

    expect(screen.getByText(sampleImage.alt)).toBeInTheDocument();
    expect(screen.getByText(sampleImage.photographer)).toBeInTheDocument();

    expect(screen.getByRole("button")).toHaveTextContent("Favourite");
  });

  it("calls onRemove when button clicked if onRemove provided", () => {
    const onRemoveMock = vi.fn();

    render(
      <ImageCard
        imageDetails={sampleImage}
        isFavourited={true}
        onRemove={onRemoveMock}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onRemoveMock).toBeCalledWith(sampleImage.id);
  });

  it("toggles favourite sates and calls toggleFavouritePhoto when button clicked and no onRemove", () => {
    render(<ImageCard imageDetails={sampleImage} isFavourited={true} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Remove");

    fireEvent.click(button);
    expect(toggleFavouritePhoto).toHaveBeenCalledWith(sampleImage);
    expect(button).toHaveTextContent("Favourite");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ImageCard imageDetails={sampleImage} isFavourited={false} ref={ref} />
    );

    expect(ref.current).not.toBeNull();
    expect((ref.current as HTMLDivElement).className).toContain("image-card");
  });
});
