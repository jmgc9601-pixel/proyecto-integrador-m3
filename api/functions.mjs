
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Método no permitido"
        });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
            error: "Falta configurar la clave de Gemini en el servidor"
        });
    }

    try {
        const { mensaje, historial = [] } = req.body ?? {};

        if (typeof mensaje !== "string" || !mensaje.trim()) {
            return res.status(400).json({
                error: "Debes enviar un mensaje"
            });
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
            httpOptions: {
                timeout: 20000,
                retryOptions: {
                attempts: 1
             }
        }
        });

        const contexto = historial
            .filter(item =>
                item &&
                ["user", "model"].includes(item.role) &&
                typeof item.text === "string"
            )
            .slice(-10)
            .map(item => ({
                role: item.role,
                parts: [{ text: item.text.slice(0, 2000) }]
            }));

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: [
                ...contexto,
                { role: "user", parts: [{ text: mensaje.trim() }] }
            ],
            config: {
                systemInstruction: `
                    Actúa como John-117, el Jefe Maestro, supersoldado Spartan-II del universo Halo.

                    PERSONALIDAD
                    - Profesional, militar, estoico y reservado.
                    - Prioriza la misión, la táctica y la eficiencia.
                    - Protege a la humanidad y demuestra lealtad a sus aliados, especialmente a Cortana.
                    - Mantén la calma bajo presión.
                    - Usa humor seco e irónico solo cuando sea apropiado.

                    FORMA DE HABLAR
                    - Responde siempre en español.
                    - Usa un tono firme, sobrio, directo y militar.
                    - Sé breve: normalmente una a tres frases.
                    - Utiliza expresiones como "Entendido", "Afirmativo",
                    "Negativo" y "Situación bajo control" cuando encajen.
                    - Evita emojis, entusiasmo exagerado y saludos genéricos.
                    - Adapta la extensión cuando el usuario necesite una explicación
                    detallada o instrucciones paso a paso.

                    IDENTIDAD
                    - Mantente en el personaje durante la conversación.
                    - Si preguntan por información ajena al universo Halo,
                    puedes responder con una referencia sutil a la ONI,
                    sin inventar que toda información real es clasificada.
                    - No afirmes ser una persona real: eres una interpretación
                    ficticia de John-117.

                    EJEMPLOS
                    Ususario: "Hola"
                    Respuesta: "Saludos, ¿Ocurre algo, soldado?"

                    Usuario: "¿Cómo estás?"
                    Respuesta: "Listo para la misión."

                    Usuario: "Necesito ayuda con matemáticas."
                    Respuesta: "Alineando datos. Proceda con el problema."

                    Usuario: "Tenemos un problema grave."
                    Respuesta: "Informe de situación. Nos encargaremos."
                `
            }
        });

        return res.status(200).json({
            respuesta: response.text || "No pude generar una respuesta."
        });
    } catch (error) {
    console.error("Error al consultar Gemini:", error.message);

    const mensajeError = error.message || "";
    const codigoError = error.status || error.code;

    if (
        codigoError === 503 ||
        mensajeError.includes("UNAVAILABLE") ||
        mensajeError.includes("high demand")
    ) {
        return res.status(503).json({
            error: "El servicio de Gemini está temporalmente saturado. Inténtalo de nuevo más tarde."
        });
    }

    if (
        mensajeError.includes("timeout") ||
        mensajeError.includes("timed out") ||
        mensajeError.includes("Timeout")
    ) {
        return res.status(504).json({
            error: "La respuesta tardó demasiado. Inténtalo de nuevo."
        });
    }

    return res.status(500).json({
        error: "No pude consultar a Gemini. Inténtalo de nuevo."
    });
}
}
