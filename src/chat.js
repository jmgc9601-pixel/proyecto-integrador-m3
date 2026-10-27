
const historial = [];

export function inicializarChat() {
    const formulario = document.querySelector("#formulario-chat");
    const entrada = document.querySelector("#entrada-mensaje");
    const mensajes = document.querySelector("#mensajes");
    const estado = document.querySelector("#estado-chat");
    const boton = document.querySelector("#boton-enviar");

    mensajes.innerHTML = "";

    historial.forEach((mensaje) => {
        agregarMensaje(mensajes, mensaje.texto, mensaje.tipo);
    });

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const texto = entrada.value.trim();

        if (!texto) return;

     
        historial.push({
            texto,
            tipo: "usuario"
        });

        agregarMensaje(mensajes, texto, "usuario");

        entrada.value = "";
        entrada.disabled = true;
        boton.disabled = true;
        estado.textContent = "Procesando misión...";

        
        const contexto = historial.slice(0, -1).map((mensaje) => ({
            role: mensaje.tipo === "usuario" ? "user" : "model",
            text: mensaje.texto
        }));

        try {
            const respuestaServidor = await fetch("/api/functions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mensaje: texto,
                    historial: contexto
                })
            });

            const datos = await respuestaServidor.json();

            if (!respuestaServidor.ok) {
                throw new Error(datos.error || "No hay señal. Objetivo sin respuesta.");
            }

            const respuesta = datos.respuesta;

            historial.push({
                texto: respuesta,
                tipo: "sistema"
            });

            agregarMensaje(mensajes, respuesta, "sistema");
        } catch (error) {
            estado.textContent =
                "Negativo. No hay enlace con el mando. Restablezca la conexión, soldado.";

            console.error("Error del chat:", error);
        } finally {
            entrada.disabled = false;
            boton.disabled = false;
            entrada.focus();
            
            if (!estado.textContent.startsWith("Negativo. No hay enlace con el mando.")) {
                 estado.textContent = "";
            }
        }
    });
}

function agregarMensaje(contenedor, texto, tipo) {
    const elemento = document.createElement("p");

    elemento.classList.add("mensaje", tipo);
    elemento.textContent = texto;

    contenedor.appendChild(elemento);
    contenedor.scrollTop = contenedor.scrollHeight;
}
