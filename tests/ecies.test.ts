import { decrypt, encrypt } from "../src/lib/ecies";
import { PrivateKey } from "../src/lib/ecies/keys";

describe("Encryption Algorithm Test", () => {
  it("Should encrypt and decrypt properly", () => {
    const keys = new PrivateKey();
    const message = "Hello";
    const encryptedMessage = encrypt(
      keys.publicKey.toHex(),
      Buffer.from(message)
    );
    const decryptedMessage = decrypt(keys.secret, encryptedMessage);

    expect(decryptedMessage.toString("ascii")).toBe(message);
  });
});
