interface ProfileProps {
  name: string;
  publicKey: string;
}

export default function Profile({ name, publicKey }: ProfileProps) {
  return (
    <div className="px-8 text-center text-black">
      <div>{name}</div>
      <div className="break-words">{publicKey}</div>
    </div>
  );
}
