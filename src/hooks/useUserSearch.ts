import { useEffect, useState } from "react";

export const useUserSearch = (searchParam: string) => {
  const [users, setUsers] = useState<
    Array<{ name: string; publicKey: string }>
  >([]);

  const search = async () => {
    if (searchParam.length < 3) return setUsers([]);
    const token = localStorage.getItem("token");
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/userSearch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        AUTHENTICATION: token!,
      },
      body: JSON.stringify({
        name: searchParam,
      }),
    });

    const res = (await req.json()) as { name: string; publicKey: string }[];
    setUsers(res);
  };

  useEffect(() => {
    search();
  }, [searchParam]);

  return { users };
};
