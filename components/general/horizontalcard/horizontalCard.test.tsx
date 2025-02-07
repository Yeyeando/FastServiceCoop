import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HorizontalCard from "./HorizontalCard";
import { describe, it, expect, vi } from "vitest";

describe("HorizontalCard Component", () => {
  const defaultProps = {
    title: "Test Title",
    image: "/img/test-image.jpg",
  };

  it("renderiza el titulo y la imagen correctamente", () => {
    render(<HorizontalCard {...defaultProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByAltText("Test Title")).toHaveAttribute(
      "src",
      "/img/test-image.jpg"
    );
  });

  it("llama onClick cuando la carta es clicada", () => {
    const handleClick = vi.fn();
    render(<HorizontalCard {...defaultProps} onClick={handleClick} />);

    fireEvent.click(screen.getByText("Test Title"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renderiza el boton cuando showButton es true", () => {
    render(<HorizontalCard {...defaultProps} showButton={true} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("no renderiza el boton cuando showButton es false", () => {
    render(<HorizontalCard {...defaultProps} showButton={false} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("llama a onRemove cuando se clica el boton", () => {
    const handleRemove = vi.fn();
    render(
      <HorizontalCard
        {...defaultProps}
        showButton={true}
        onRemove={handleRemove}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it("evitar propagación cuando hago clic en el boton de eliminar", () => {
    const handleClick = vi.fn();
    const handleRemove = vi.fn();
    render(
      <HorizontalCard
        {...defaultProps}
        showButton={true}
        onClick={handleClick}
        onRemove={handleRemove}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
