export default function Sidebar({ }) {
    interface Chats {
        [public_key: string]: {
          last_message: string;
          lastMessageId: string;
        };
      }
      
      const sampleChats: Chats = {
        "public_key_1": {
          last_message: "Hello there!",
          lastMessageId: "message_id_1"
        },
        "public_key_2": {
          last_message: "How are you?",
          lastMessageId: "message_id_2"
        },
        "public_key_3": {
          last_message: "I'm fine, thank you!",
          lastMessageId: "message_id_3"
        },
        "public_key_4": {
          last_message: "Nice weather today.",
          lastMessageId: "message_id_4"
        },
        "public_key_5": {
          last_message: "Have you seen the latest movie?",
          lastMessageId: "message_id_5"
        },
        "public_key_6": {
          last_message: "Yes, it was great!",
          lastMessageId: "message_id_6"
        },
        "public_key_7": {
          last_message: "What are you doing this weekend?",
          lastMessageId: "message_id_7"
        },
        "public_key_8": {
          last_message: "I'm planning to go hiking.",
          lastMessageId: "message_id_8"
        },
        "public_key_9": {
          last_message: "Sounds fun!",
          lastMessageId: "message_id_9"
        },
        "public_key_10": {
          last_message: "Let's go together.",
          lastMessageId: "message_id_10"
        },
      };

    return (
            <div className="bg-[#020212] w-1/6 h-full overflow-y-auto fixed top-16 left-0 z-50 pb-20">
                <div className="bg-[#020212] py-4 px-6 border-b border-gray-400">
                    <h2 className="text-lg font-semibold">Users </h2>
                </div>
                <div className="p-4">
                    <ul>
                    {Object.entries(sampleChats).map(([publicKey, chat])=>{
                            return <div key={publicKey}>
                                <div className="rounded-none border-b-2 border-[#30323E] p-y-2">
                                <li className="py-4">
                            <div className="flex items-center user-item cursor-pointer">
                            <a href={'/chat/' + publicKey} className="flex items-center user-item">
                                <div>
                                
                                    <h3 className="text-white-600 font-semibold">User {publicKey}</h3>
                                    <p className="text-white-600 text-sm">{chat.last_message}</p>
                                </div>
                                </a>
                            </div>
                        </li>
                        </div>
                            </div>
                        })}
                    </ul>
                </div>
            </div>

    );
}