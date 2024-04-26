export const balance = async () =>{
    const token = localStorage.getItem("token");
    console.log("token");
    console.log(token);
    const req = await fetch("http://172.18.203.111:3011/native_token_balance?token_name=ETH", {
            headers: {
                AUTHENTICATION: token!,
            }
        });
    console.log(req);
    if (req.status!==200)
        {
            throw new Error("failed to get balance");
        }
    return await req.json();

}