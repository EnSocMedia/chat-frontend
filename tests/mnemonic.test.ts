import generateMnemonicWords from "@/lib/words-algo/wordsGen";

describe("Menmonic Words Generation test", () => {
  it("Should Generate 12 words mnemonic words", async () => {
    const words = await generateMnemonicWords();
        expect(words.length).toBe(12)
  });
});
