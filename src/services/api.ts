

export default async function sendTypingInfo(publicKey: string) {
  const token = localStorage.getItem("token");
  try {
    let url = `http://172.18.203.111:3011/typing/${publicKey}`;
    const req = await fetch(url,{
      headers : {
        AUTHENTICATION: token!
      }
    });
    console.log("Get typing response");
    console.log(req);
  } catch (e) {}
}
