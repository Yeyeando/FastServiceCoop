import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Header from "./Header";
import { MemoryRouter, useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Header component", () => {
  it("renderiza el título seleccionado", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header title="Test Title" />
      </MemoryRouter>
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renderiza el backbutton si es true", () => {
    render(
      <MemoryRouter initialEntries={["/MenuWaiter/1"]}>
        <Header title="Menu" showBackButton={true} />
      </MemoryRouter>
    );
    expect(screen.getByAltText("volver")).toBeInTheDocument();
  });

  it("no renderiza el backbutton si es false", () => {
    render(
      <MemoryRouter initialEntries={["/DishesWaiter/1/2"]}>
        <Header title="Dishes" showBackButton={false} />
      </MemoryRouter>
    );
    expect(screen.queryByAltText("volver")).not.toBeInTheDocument();
  });

  it("navega a la backroute al hacerle clic", () => {
    const navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);
    render(
      <MemoryRouter initialEntries={["/DishesWaiter/1/2"]}>
        <Header title="Menu" backRoute="/DishesWaiter/1" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText("volver"));
    expect(navigateMock).toHaveBeenCalledWith("/DishesWaiter/1");
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });

  it("navega al inicio al hacer clic al exit", () => {
    const navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);
    render(
      <MemoryRouter initialEntries={["/Confirmation/1/3"]}>
        <Header title="Confirmation" mainRoute="/" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText("salir"));
    expect(navigateMock).toHaveBeenCalledWith("/");
    expect(navigateMock).toHaveBeenCalledTimes(1); //se asegura de que solo lo llama una vez
  });

  it("muestra en pantalla los botones a pesar de no especificar que sean true", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header title="Default Header" />
      </MemoryRouter>
    );

    expect(screen.getByText("Default Header")).toBeInTheDocument();
    expect(screen.getByAltText("volver")).toBeInTheDocument();
    expect(screen.getByAltText("salir")).toBeInTheDocument();
  });
});
