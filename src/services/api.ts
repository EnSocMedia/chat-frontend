export default async function sendTypingInfo(publicKey: string) {
  try {
    const req = await fetch(`http://localhost:3011/typing/${publicKey}`);
  } catch (e) {}
}
