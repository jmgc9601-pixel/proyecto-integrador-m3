
import { inicializarChat } from "./chat.js";

const app = document.querySelector("#app");
const navegacion = document.querySelector("#navegacion");

function obtenerRuta() {
    const ruta = window.location.pathname.replace(/\/+$/, "");
    return ruta || "/";
}

function renderizarVista() {
    if (!app) return;

    const ruta = obtenerRuta();

    switch (ruta) {
        case "/chat":
            app.innerHTML = `
                <section class="chat">
                    <h2>Centro de comunicaciones</h2>

                    <div
                        id="mensajes"
                        class="mensajes"
                        aria-live="polite"
                        aria-label="Conversación"
                    >
                        <p class="mensaje sistema">
                            Conexión iniciada. Esperando instrucciones.
                        </p>
                    </div>

                    <form id="formulario-chat">
                        <label for="entrada-mensaje">Tu mensaje</label>

                        <div class="chat-controles">
                            <input
                                id="entrada-mensaje"
                                name="mensaje"
                                type="text"
                                placeholder="Escribe un mensaje..."
                                autocomplete="off"
                                maxlength="2000"
                                required
                            >

                            <button type="submit" id="boton-enviar">
                                Enviar
                            </button>
                        </div>

                        <p id="estado-chat" role="status"></p>
                    </form>
                </section>
            `;

            inicializarChat();
            break;

        case "/about":
            app.innerHTML = `
                <section class="acerca">
                    <h2>Acerca del proyecto</h2>
                    <p>
                        Interfaz táctica de una sola vía para comunicación con perfiles simulados.
                    </p>
                </section>
            `;
            break;

        case "/":
        case "/home":
        default:
            app.innerHTML = `
                <section class="inicio">
                    <h2>Bienvenido, soldado.</h2>
                    <p>
                        Accede al centro de comunicaciones para iniciar
                        una conversación con el Jefe Maestro.
                    </p>
                    <a href="/chat">Iniciar comunicación</a>
                </section>
            `;
            break;
    }
}

if (navegacion) {
    navegacion.addEventListener("click", (evento) => {

        if (
            evento.defaultPrevented ||
            evento.button !== 0 ||
            evento.metaKey ||
            evento.ctrlKey ||
            evento.shiftKey ||
            evento.altKey
        ) {
            return;
        }

        const enlace = evento.target.closest("a");

        if (!enlace || !navegacion.contains(enlace)) return;

        if (
            enlace.origin !== window.location.origin ||
            enlace.target ||
            enlace.hasAttribute("download")
        ) {
            return;
        }

        evento.preventDefault();

        const nuevaRuta = enlace.pathname + enlace.search + enlace.hash;

        if (nuevaRuta !== window.location.pathname +
            window.location.search + window.location.hash) {
            history.pushState({}, "", nuevaRuta);
            renderizarVista();
        }
    });
}

window.addEventListener("popstate", renderizarVista);

renderizarVista();
