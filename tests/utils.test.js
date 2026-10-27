import { describe, it, expect } from "vitest";
import { limpiarTexto } from "../src/utils.js";

describe("limpiarTexto", () => {
    it("elimina espacios al principio y al final", () => {
        expect(limpiarTexto("  Hola  ")).toBe("Hola");
    });

    it("devuelve una cadena vacía cuando recibe espacios", () => {
        expect(limpiarTexto("     ")).toBe("");
    });

    it("no modifica el texto que ya está limpio", () => {
        expect(limpiarTexto("Hola")).toBe("Hola");
    });

    it("rechaza datos que no son texto", () => {
    expect(() => limpiarTexto(123)).toThrow(
    "El texto debe ser una cadena de caracteres"
    );
    });
});