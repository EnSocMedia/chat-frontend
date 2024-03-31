interface LoginProps {
  onLogin: (privateKey: Buffer) => void;
}

export default function Login({ onLogin }: LoginProps) {
  function loginHandler() {}

  return (
    <div className="flex items-center flex-col gap-4">
      <div className="text-[24px]">Enter Your Mnemonic Phrase With Space</div>
      <textarea className="w-[250px] h-[150px] text-black" />

      <button onClick={loginHandler} className="bg-emerald-500  p-4 rounded-md">
        Login
      </button>
    </div>
  );
}
