import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useNavigate } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ActionButtons from "./ActionButtons";
import { DishProvider } from "../../../pages/DishContext";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("ActionButtons component", () => {
  const defaultProps = {
    cancelRoute: "/",
    confirmRoute: "/",
    confirmText: "Send",
  };

  it("renderiza el nombre del botón", () => {
    render(
      <DishProvider>
        <ActionButtons {...defaultProps} />
      </DishProvider>
    );

    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it("se dirige a la ruta / al hacer clic en confirmRoute", () => {
    const navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
      <DishProvider>
        <ActionButtons {...defaultProps} />
      </DishProvider>
    );

    fireEvent.click(screen.getByText("Send"));
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("no llama a clearDishes al hacer clic en el botón Send si onSend está presente", () => {
    const clearDishesMock = vi.fn();
    const onSendMock = vi.fn();
    const mockProps = {
      ...defaultProps,
      onSend: onSendMock,
    };

    render(
      <DishProvider>
        <ActionButtons {...mockProps} />
      </DishProvider>
    );

    fireEvent.click(screen.getByText("Send"));

    expect(clearDishesMock).not.toHaveBeenCalled();
  });

  it("muestra el texto del botón Confirm/Send correctamente", () => {
    const customText = "Proceed";

    render(
      <DishProvider>
        <ActionButtons {...defaultProps} confirmText={customText} />
      </DishProvider>
    );

    expect(screen.getByText(customText)).toBeInTheDocument();
  });
});
