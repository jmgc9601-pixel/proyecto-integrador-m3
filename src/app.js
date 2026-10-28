
import { inicializarChat } from "./chat.js";

const app = document.querySelector("#app");
const navegacion = document.querySelector("#navegacion");

function obtenerRuta() {
    const ruta = window.location.pathname
        .replace(/\/+$/, "");
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
                    <h2>ACERCA DE | UNSC — CENTRO DE OPERACIONES</h2>
                    <p>“Terminamos la misión. No importa el costo.”</p>
                    <p>
                        Bienvenido al centro de operaciones Spartan. 
                        Este proyecto es una experiencia interactiva 
                        inspirada en el universo de Halo, diseñada 
                        para que puedas conversar con el legendario Jefe Maestro, 
                        conocer su historia y explorar su mentalidad frente a 
                        los desafíos que amenazan a la humanidad.
                    </p>
                    <h3>Misión principal</h3>
                    <p>
                        Nuestra misión es ofrecer una experiencia inmersiva de 
                        conversación con el Jefe Maestro, permitiendo a los usuarios 
                        interactuar con uno de los soldados más emblemáticos de la 
                        ciencia ficción. A través de un chat dinámico e interactivo, 
                        buscamos combinar tecnología, narrativa y exploración para llevar 
                        el universo de Halo a una nueva dimensión.

                        Objetivo: conectar a los fans con la historia, 
                        la personalidad y el espíritu de un verdadero Spartan.
                    </p>
                    <h3>Biografía | Jefe Maestro — John-117</h3>    
                    <p>
                       El Jefe Maestro, cuyo nombre es John-117, es uno de los supersoldados 
                       Spartan-II más reconocidos del universo de Halo. Entrenado desde temprana 
                       edad bajo el programa Spartan-II, fue convertido en un soldado de élite 
                       mediante un riguroso entrenamiento y avanzadas mejoras físicas.

                       Conocido por su liderazgo, sangre fría y determinación inquebrantable, 
                       John-117 se convirtió en una pieza fundamental de la lucha de la humanidad 
                       por sobrevivir a la amenaza del Covenant. Equipado con su icónica armadura 
                       MJOLNIR y acompañado en numerosas misiones por la inteligencia artificial 
                       Cortana, ha demostrado que incluso en las circunstancias más adversas la 
                       esperanza puede prevalecer.

                       Más que un supersoldado, el Jefe Maestro representa el sacrificio, 
                       la perseverancia y el deber. Su historia es la de un guerrero que 
                       habla poco, actúa cuando es necesario y nunca abandona una misión mientras 
                       exista una oportunidad de salvar a quienes dependen de él.

                        Clasificación: Spartan-II
                        Identificación: John-117
                        Afiliación: UNSC — Comando Espacial de las Naciones Unidas
                        Especialidad: combate táctico, operaciones especiales y defensa de la humanidad
                        Estado operativo: listo para la siguiente misión.
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

document.addEventListener("click", (evento) => {
   
    const enlace = evento.target.closest("a");

    if (!enlace) return;

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

    if (
        enlace.origin !== window.location.origin ||
        enlace.target ||
        enlace.hasAttribute("download")
    ) {
        return;
    }

    evento.preventDefault();

    const nuevaRuta =
        enlace.pathname + enlace.search + enlace.hash;

    const rutaActual =
        window.location.pathname +
        window.location.search +
        window.location.hash;

    if (nuevaRuta !== rutaActual) {
        history.pushState({}, "", nuevaRuta);
        renderizarVista();
    }
});

window.addEventListener("popstate", renderizarVista);

renderizarVista();