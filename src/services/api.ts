

export default async function sendTypingInfo(publicKey: string) {
  const token = localStorage.getItem("token");
  try {
    let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/typing/${publicKey}`;
    const req = await fetch(url,{
      headers : {
        AUTHENTICATION: token!
      }
    });
    console.log("Get typing response");
    console.log(req);
  } catch (e) {}
}
