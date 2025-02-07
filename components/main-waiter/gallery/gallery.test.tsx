import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ImageGallery from "./Gallery";
import imagesData from "../../general/jsons/tables/tables.json";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("ImageGallery Component", () => {
  it("renderiza correctamente las imágenes", () => {
    render(
      <MemoryRouter>
        <ImageGallery />
      </MemoryRouter>
    );

    const imageElements = screen.getAllByAltText("logout");

    expect(imageElements).toHaveLength(imagesData.tables.length);

    imagesData.tables.forEach((table, index) => {
      const imageElement = imageElements[index];
      expect(imageElement).toHaveAttribute("src", table.url);
    });
  });

  it("muestra los identificadores de las imágenes", () => {
    render(
      <MemoryRouter>
        <ImageGallery />
      </MemoryRouter>
    );

    imagesData.tables.forEach((table) => {
      expect(screen.getByText(table.id.toString())).toBeInTheDocument();
    });
  });

  it("navega a la ruta correcta al hacer clic en una imagen", () => {
    const navigateMock = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <ImageGallery nextRoute="/table" />
      </MemoryRouter>
    );

    const gridItems = screen.getAllByAltText("logout");

    gridItems.forEach((image, index) => {
      image.closest(".grid-item")?.click();
      expect(navigateMock).toHaveBeenCalledWith(
        `/table/${imagesData.tables[index].id}`
      );
    });
  });
});
