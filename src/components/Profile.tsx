import { parseJwt } from "@/store/socket";
import { useEffect, useState } from "react";

interface ProfileProps {
  name: string;
  publicKey: string;
}

export default function Profile({}: ProfileProps) {
  const [name, setName] = useState("");
  const [publicKey, setPublicKey] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const { public_key, user_name } = parseJwt(token);

    setName(user_name);
    setPublicKey(public_key);
  }, []);

  return (
    <div className="px-8 text-center text-white">
      <div>{name}</div>
      <div className="break-words">{publicKey}</div>
    </div>
  );
}
