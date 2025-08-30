import { InferenceClient } from "@huggingface/inference";

export async function POST(request: Request) {
  try {
    const { text }: { text: string } = await request.json();

    if (!text || text.trim().length === 0) {
      return Response.json({ error: "Text is required" }, { status: 400 });
    }

    const client = new InferenceClient(process.env.HF_TOKEN as string);

    const output = await client.textClassification({
      model: "jy46604790/Fake-News-Bert-Detect",
      inputs: text,
      provider: "hf-inference",
    });

    console.log("Hugging Face Output:", output);

    let result: { label: string; confidence: number } = {
      label: "UNKNOWN",
      confidence: 0,
    };

    if (Array.isArray(output) && output.length > 0) {
      const sortedOutput = [...output].sort((a, b) => b.score - a.score);
      const topResult = sortedOutput[0];

      if (topResult.label === "LABEL_1") {
        result = { label: "REAL", confidence: topResult.score };
      } else if (topResult.label === "LABEL_0") {
        result = { label: "FAKE", confidence: topResult.score };
      } else {
        result = { label: topResult.label, confidence: topResult.score };
      }
    }

    return Response.json(result);
  } catch (error) {
    const err = error as Error;
    console.error("Error in fake news detection:", err);
    return Response.json(
      {
        error: "Failed to detect fake news",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
