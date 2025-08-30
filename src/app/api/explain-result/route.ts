import { Groq } from 'groq-sdk';

interface ExplainRequestBody {
  text: string;
  isReal: boolean;
  prompt: string;
}

interface ExplainResponse {
  explanation?: string;
  error?: string;
  details?: string;
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // pastikan env ini tersedia
});

export async function POST(request: Request): Promise<Response> {
  try {
    const { text, isReal, prompt }: ExplainRequestBody = await request.json();

    if (!text || !prompt) {
      return Response.json({ error: 'Text and prompt are required' }, { status: 400 });
    }

    const fullPrompt = `
Analisis berita berikut dan jelaskan mengapa termasuk ${isReal ? 'FAKTA' : 'HOAKS'}:

"${text}"

Berikan penjelasan dengan struktur:

**Analisis:** Jelaskan mengapa berita ini ${isReal ? 'faktual' : 'hoaks'} berdasarkan karakteristik isinya.

**Sumber Pendukung:** Sebutkan referensi kredibel yang mendukung analisis ini (situs pemeriksa fakta, media resmi, atau lembaga terpercaya).

**Saran Verifikasi:** Berikan tips cara memverifikasi informasi serupa di masa depan.

Jawab dalam bahasa Indonesia yang mudah dipahami dan profesional. Hindari penggunaan kata "pengguna" dan jangan gunakan format <think>. Berikan analisis yang langsung dan jelas.
`;

    const chatCompletion = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: fullPrompt,
        }
      ],
      temperature: 0.7,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false
    });

    const explanation = chatCompletion.choices?.[0]?.message?.content || "Tidak dapat memberikan penjelasan saat ini.";

    return Response.json({ explanation } as ExplainResponse);
  } catch (error: unknown) {
    console.error("Error getting explanation:", error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return Response.json({
      error: 'Failed to get explanation',
      details: errorMessage
    } as ExplainResponse, { status: 500 });
  }
}
