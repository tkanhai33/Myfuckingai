class LightweightModel {
  private isLoaded = false;

  async load() {
    if (this.isLoaded) return;
    // Placeholder for TensorFlow Lite model loading.
    // In production this would load model assets from the bundle
    // and warm up the interpreter.
    this.isLoaded = true;
  }

  async predict(input: string): Promise<number> {
    await this.load();
    // Placeholder heuristic using keyword density until the model is trained.
    const keywords = ['subscription', 'renewal', 'billing', 'invoice'];
    const occurrences = keywords.reduce(
      (count, keyword) => count + (input.toLowerCase().includes(keyword) ? 1 : 0),
      0
    );
    return Math.min(0.3 + occurrences * 0.2, 0.95);
  }
}

export const mlModel = new LightweightModel();
