import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import MyHeader from "./components/MyHeader";
import { useEffect, useState } from "react";
import { PingButton } from "./components/PingButton";

const App = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const asyncFun = async () => {
      if (!publicKey) return;
      const balance = await connection.getBalance(publicKey);
      setBalance(balance);
    };
    asyncFun();
  }, [publicKey, connection]);

  return (
    <>
      <MyHeader />
      <p>Endpoint: {connection.rpcEndpoint}</p>
      <p>Balance : {balance}</p>

      <div className="mt1">
        <PingButton />
      </div>
    </>
  );
};

export default App;
