
export default async function usersearch(search: string) {
    const token = localStorage.getItem("token");
    let sendObj = {
      name: search
    };
    try {
      let url = `http://172.18.203.111:3011/userSearch`;
      const req = await fetch(url,{
        method:"POST",
        body:JSON.stringify(sendObj),
        headers : {
          "Content-Type": "application/json",
          AUTHENTICATION: token!
        }
      });
      console.log("Get typing response");
      console.log(await req.json());
    } catch (e) {}
  }
  