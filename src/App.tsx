import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import MyHeader from "./components/MyHeader";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

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
      <p>Balance : {balance}</p>

      <div className="mt1">
        <Button variant="contained">Hello mui world</Button>
      </div>
    </>
  );
};

export default App;
