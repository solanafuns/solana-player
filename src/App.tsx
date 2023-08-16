import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import MyHeader from "./components/MyHeader";
import { useEffect, useState } from "react";
import PingButton from "./components/PingButton";
import TransferTo from "./components/TransferTo";
import NameValue from "./components/NameValue";
import { Divider } from "@mui/material";

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

      <Divider sx={{ margin: "1rem" }}>solana basic</Divider>
      <NameValue name="Endpoint" value={connection.rpcEndpoint} />
      <NameValue name="Balance" value={balance / 10 ** 9} />
      <Divider sx={{ margin: "1rem" }}>Example bind!</Divider>

      <div className="mt1">
        <PingButton />
      </div>
      <Divider sx={{ margin: "1rem" }}>Transfer SOL To:</Divider>
      <TransferTo />
    </>
  );
};

export default App;
