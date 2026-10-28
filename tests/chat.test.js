
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

describe("Pruebas del chat", () => {
    beforeEach(() => {
        vi.resetModules();

        document.body.innerHTML = `
            <form id="formulario-chat">
                <input id="entrada-mensaje" />
                <button id="boton-enviar" type="submit">Enviar</button>
            </form>
            <div id="mensajes"></div>
            <p id="estado-chat"></p>
        `;

        globalThis.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("muestra la respuesta del servidor", async () => {
        globalThis.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                respuesta: "Recibido, soldado."
            })
        });

        const { inicializarChat } = await import("../src/chat.js");
        inicializarChat();

        const entrada = document.querySelector("#entrada-mensaje");
        const formulario = document.querySelector("#formulario-chat");

        entrada.value = "Hola, Jefe Maestro";

        formulario.dispatchEvent(
            new Event("submit", {
                bubbles: true,
                cancelable: true
            })
        );

        await vi.waitFor(() => {
            expect(document.querySelector("#mensajes").textContent)
                .toContain("Recibido, soldado.");
        });

        expect(globalThis.fetch).toHaveBeenCalledOnce();
    });

    it("muestra un error cuando el servidor falla", async () => {
        globalThis.fetch.mockResolvedValue({
            ok: false,
            json: async () => ({
                error: "Servicio temporalmente no disponible"
            })
        });

        const { inicializarChat } = await import("../src/chat.js");
        inicializarChat();

        const entrada = document.querySelector("#entrada-mensaje");
        const formulario = document.querySelector("#formulario-chat");

        entrada.value = "¿Me recibe, Jefe Maestro?";

        formulario.dispatchEvent(
            new Event("submit", {
                bubbles: true,
                cancelable: true
            })
        );

        await vi.waitFor(() => {
            expect(document.querySelector("#estado-chat").textContent)
                .toContain("Negativo. No hay enlace con el mando.");
        });

        expect(document.querySelector("#mensajes").textContent)
            .not.toContain("Servicio temporalmente no disponible");
    });

    it("reactiva el formulario después de un error", async () => {
        globalThis.fetch.mockResolvedValue({
            ok: false,
            json: async () => ({
                error: "Error de prueba"
            })
        });

        const { inicializarChat } = await import("../src/chat.js");
        inicializarChat();

        const entrada = document.querySelector("#entrada-mensaje");
        const boton = document.querySelector("#boton-enviar");
        const formulario = document.querySelector("#formulario-chat");

        entrada.value = "Solicito comunicación";

        formulario.dispatchEvent(
            new Event("submit", {
                bubbles: true,
                cancelable: true
            })
        );

        await vi.waitFor(() => {
            expect(entrada.disabled).toBe(false);
            expect(boton.disabled).toBe(false);
        });
    });

    it("no incluye en el historial un mensaje cuya petición anterior falló", async () => {
        globalThis.fetch
            .mockResolvedValueOnce({
                ok: false,
                json: async () => ({
                    error: "Error de prueba"
                })
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    respuesta: "Recibido, soldado."
                })
            });

        const { inicializarChat } = await import("../src/chat.js");
        inicializarChat();

        const entrada = document.querySelector("#entrada-mensaje");
        const formulario = document.querySelector("#formulario-chat");

        entrada.value = "Mensaje que falla";

        formulario.dispatchEvent(
            new Event("submit", {
                bubbles: true,
                cancelable: true
            })
        );

        await vi.waitFor(() => {
            expect(document.querySelector("#estado-chat").textContent)
                .toContain("Negativo. No hay enlace con el mando.");
        });

        entrada.value = "Segundo mensaje";

        formulario.dispatchEvent(
            new Event("submit", {
                bubbles: true,
                cancelable: true
            })
        );

        await vi.waitFor(() => {
            expect(globalThis.fetch).toHaveBeenCalledTimes(2);
        });

        const segundaPeticion = globalThis.fetch.mock.calls[1];
        const cuerpo = JSON.parse(segundaPeticion[1].body);

        expect(cuerpo.mensaje).toBe("Segundo mensaje");
        expect(cuerpo.historial).toEqual([]);
    });
});
