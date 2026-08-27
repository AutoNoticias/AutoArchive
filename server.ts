import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to initialize Gemini SDK client on demand
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint for Gemini Surprise Automotive Fact
app.post('/api/gemini/surprise-fact', async (req, res) => {
  try {
    const { seenTitles = [] } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    let data: any = null;

    if (apiKey) {
      try {
        const ai = getGeminiClient();
        const seenList = Array.isArray(seenTitles) ? seenTitles.slice(-40) : [];
        const seenContext = seenList.length > 0
          ? `IMPORTANTE: NO repitas ninguno de los siguientes títulos:\n${seenList.map((t: string) => `- ${t}`).join('\n')}`
          : 'Genera un dato completamente original e inédito.';

        const prompt = `${seenContext}
Generate a fascinating, short, technical fact about automotive engineering. 
Respond ONLY with a JSON object with these keys: title, category, tag, summary, details, year, car, curiosity.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: {
            maxOutputTokens: 500,
            temperature: 0.7,
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '';
        data = JSON.parse(text);
      } catch (geminiErr) {
        console.warn('Gemini API request failed, falling back to dynamic generator:', geminiErr);
      }
    }

    // Fallback dynamic generator if GEMINI_API_KEY is missing or API failed
    if (!data) {
      const fallbackPool = [
        {
          title: "El motor V10 de la Fórmula 1 que impulsó una minivan familiar",
          category: "INGENIERÍA EXTREMA",
          tag: "PROTOTIPO LOCO",
          summary: "Renault instaló el motor V10 de 800 CV del monoplaza de Alain Prost en una minivan Espace F1 de fibra de carbono.",
          details: "En 1994, para celebrar los 10 años de la minivan Espace, Renault Sport y Matra unieron fuerzas para construir la Renault Espace F1. Utilizaron el motor V10 de 3.5 litros atmosférico del Williams-Renault FW15C que conquistó el campeonato mundial de F1.\n\nEl vehículo aceleraba de 0 a 100 km/h en 2.8 segundos y alcanzaba los 312 km/h. Llevaba cuatro asientos tipo bucket y el motor estaba colocado justo en el centro del habitáculo, ensordeciendo a sus ocupantes a más de 13,800 RPM.",
          year: "1994",
          car: "Renault Espace F1 (V10)",
          curiosity: "¡Frenaba de 300 km/h a 0 en solo 600 metros gracias a frenos carbocerámicos de F1!"
        },
        {
          title: "El alerón invertido del Chaparral 2J que funcionaba como una aspiradora gigante",
          category: "PROTOTIPOS & SECRETOS",
          tag: "PROHIBIDO POR F1/Can-Am",
          summary: "Jim Hall utilizó dos ventiladores de motonieves para succionar el aire debajo del auto y pegarlo al suelo mecánicamente.",
          details: "El Chaparral 2J de 1970 no necesitaba velocidad para generar carga aerodinámica. Montaba un motor de dos tiempos adicional detrás de la carrocería que impulsaba dos enormes ventiladores de 45 cm, creando un vacío casi perfecto debajo del coche mediante faldones de Lexan.\n\nGeneraba 1.25g de fuerza lateral incluso estando completamente detenido. La FIA y la SCCA terminaron prohibiendo la tecnología 'aspiradora' a final de temporada por considerarlo un dispositivo aerodinámico móvil demasiado peligroso para los rivales.",
          year: "1970",
          car: "Chaparral 2J 'Vacuum Car'",
          curiosity: "¡Tenía un motor independiente solo para succionar el aire de debajo del chasis!"
        },
        {
          title: "Por qué el logo de Porsche tiene el escudo de la ciudad de Stuttgart",
          category: "CULTURA & ANÉCDOTAS",
          tag: "HISTORIA DE MARCA",
          summary: "Ferry Porsche dibujó el primer boceto del icónico emblema en una servilleta de un restaurante en Nueva York.",
          details: "El escudo oficial de Porsche fue concebido por Ferry Porsche junto al legendario importador Max Hoffman en un restaurante neoyorquino en 1952. Unieron el caballo encabritado de Stuttgart con las astas de ciervo del histórico estado de Wurtemberg-Hohenzollern.\n\nStuttgart significa originalmente 'jardín de yeguas' (Stutengarten), lo que explica por qué el famoso caballo comparte origen visual con el mismísimo Cavallino Rampante de Ferrari, cuyo piloto Francesco Baracca también provenía de misiones aéreas sobre esa región alemana.",
          year: "1952",
          car: "Porsche 356 & 911",
          curiosity: "¡El caballo de Stuttgart en Porsche comparte raíz histórica con el Cavallino de Ferrari!"
        },
        {
          title: "El motor rotativo Mazda R26B que obligó a cambiar las reglas de Le Mans",
          category: "LE MANS & CARRERAS",
          tag: "RÉCORD HISTÓRICO",
          summary: "El Mazda 787B fue el primer vehículo japonés y el único con motor sin pistones en ganar las 24 Horas de Le Mans.",
          details: "En junio de 1991, el mítico Mazda 787B número 55 con su característico motor Wankel tetrarrotor R26B derrotó a la armada de Jaguar, Porsche y Mercedes-Benz en el circuito de la Sarthe. El motor giraba a un régimen ensordecedor de 9,000 RPM produciendo 700 CV de potencia con un sonido inolvidable.\n\nTras la abrumadora e impecable victoria de fiabilidad de Mazda, la FISA modificó el reglamento técnico para 1992 prohibiendo definitivamente los motores rotativos en la categoría máxima de resistencia.",
          year: "1991",
          car: "Mazda 787B (R26B)",
          curiosity: "¡Recorrió 4,922 kilómetros continuos sin una sola falla mecánica en 24 horas!"
        },
        {
          title: "El test secreto de Ferrari donde pintaron un prototipo de azul para engañar a los espías",
          category: "RIVALIDADES HISTÓRICAS",
          tag: "SECRETO DE MARANELLO",
          summary: "En 1964 Ferrari compitió con la escudería NART vestida de azul y blanco en protesta contra la federación italiana.",
          details: "Encolerizado por la negativa de la Federación Italiana de Automovilismo de homologar el Ferrari 250 LM para carreras de turismos, Enzo Ferrari devolvió su licencia deportiva e inscribió a su equipo oficial en el Campeonato Mundial de F1 bajo los colores azul y blanco de la North American Racing Team (NART).\n\nJohn Surtees conquistó el campeonato mundial de Fórmula 1 de 1964 pilotando un Ferrari 158 vestido completamente de azul y blanco, siendo el único título de la historia de Ferrari ganado sin vestir su célebre Rosso Corsa.",
          year: "1964",
          car: "Ferrari 158 NART",
          curiosity: "¡El único campeonato mundial de F1 que Ferrari ganó corriendo de color Azul y Blanco!"
        }
      ];

      // Select one item from fallback pool not in seenTitles
      const seenSet = new Set(Array.isArray(seenTitles) ? seenTitles.map((t: string) => t.toLowerCase()) : []);
      const unvisited = fallbackPool.filter((item) => !seenSet.has(item.title.toLowerCase()));
      data = unvisited.length > 0
        ? unvisited[Math.floor(Math.random() * unvisited.length)]
        : fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
    }

    return res.json({
      success: true,
      fact: data,
    });
  } catch (error: any) {
    console.error('Error en /api/gemini/surprise-fact:', error);
    return res.status(500).json({
      error: error?.message || 'Error al comunicarse con Gemini AI',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
