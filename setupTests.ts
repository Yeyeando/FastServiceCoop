// Importa `expect` de Vitest

import { expect } from "vitest";

// Opcional: mock de console.log para evitar ruido en los tests
global.console.log = vi.fn();

// Mock global para fetch si usas llamadas de red
import createFetchMock from "vitest-fetch-mock";

const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();

// Configura cleaning después de cada test (opcional si usas @testing-library/react)
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Limpia automáticamente el DOM después de cada test
afterEach(() => {
  cleanup();
});

// Si usas algún polyfill para APIs modernas, agrégalo aquí
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Activa las variables globales como `expect`
    environment: "jsdom", // Usa jsdom para emular un navegador
    setupFiles: "./setupTests.ts", // Archivo de configuración global
  },
});
