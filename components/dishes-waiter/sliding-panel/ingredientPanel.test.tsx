import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { DishProvider } from "../../../pages/DishContext";
import IngredientPanel from "./IngredientPanel";
import { beforeEach, describe, expect, it, test, vi } from "vitest";

describe("IngredientPanel Component", () => {
  const mockOnClose = vi.fn();
  const mockAddDish = vi.fn();

  const initialProps = {
    title: "drink1",
    image: "/img/drink.jpg",
    category: "drink",
    initialIngredients: [1],
    onClose: mockOnClose,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el componente con el titulo y los ingredientes", () => {
    render(
      <DishProvider>
        <BrowserRouter>
          <IngredientPanel {...initialProps} />
        </BrowserRouter>
      </DishProvider>
    );

    expect(screen.getByText("drink1")).toBeInTheDocument();
    expect(screen.getByText("Ingredients base")).toBeInTheDocument();
    expect(screen.getByText("Extras")).toBeInTheDocument();
  });

  it("incrementa y decrementa el numero de ingredientes", () => {
    render(
      <DishProvider>
        <BrowserRouter>
          <IngredientPanel {...initialProps} />
        </BrowserRouter>
      </DishProvider>
    );

    const incrementButton = screen.getAllByRole("button", { name: /plus/i })[0];
    const decrementButton = screen.getAllByRole("button", {
      name: /minus/i,
    })[0];

    fireEvent.click(incrementButton);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(decrementButton);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("desactiva el boton de añadir cuando no hay ingredientes seleccionados", () => {
    render(
      <DishProvider>
        <BrowserRouter>
          <IngredientPanel {...initialProps} />
        </BrowserRouter>
      </DishProvider>
    );

    fireEvent.click(screen.getAllByRole("button", { name: /minus/i })[0]);
    expect(screen.getByRole("button", { name: /Add/i })).toBeDisabled();
  });

  it("al hacer clic en Add, llama a onClose y addDish", () => {
    render(
      <DishProvider>
        <BrowserRouter>
          <IngredientPanel {...initialProps} />
        </BrowserRouter>
      </DishProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("al hacer clic en cancelar se cierra el panel", () => {
    render(
      <DishProvider>
        <BrowserRouter>
          <IngredientPanel {...initialProps} />
        </BrowserRouter>
      </DishProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
