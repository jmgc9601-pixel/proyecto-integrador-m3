export function limpiarTexto(texto) {
    if (typeof texto !== "string") {
        throw new TypeError("El texto debe ser una cadena de caracteres");
    }

    return texto.trim();
}