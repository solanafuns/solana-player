import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import MyHeader from "./components/MyHeader";
import { useEffect, useState } from "react";
import PingButton from "./components/PingButton";
import TransferTo from "./components/TransferTo";
import NameValue from "./components/NameValue";
import { Divider } from "@mui/material";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import PingDataButton from "./components/PingDataButton";
import CreateSystemAccount from "./components/createSystemAccount";
import { TransactionLink } from "./components/TransactionLink";

const App = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [link, updateLink] = useState<string>("");

  const handleUpdateLink = (link: string) => {
    updateLink(link);
  };

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const asyncFun = async () => {
      if (!publicKey) return;
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    };
    asyncFun();
  }, [publicKey, connection]);

  return (
    <>
      <MyHeader />

      <Divider sx={{ margin: "1rem" }}>solana basic</Divider>
      <NameValue name="Endpoint" value={connection.rpcEndpoint} />
      <NameValue name="Balance" value={balance} />
      <Divider sx={{ margin: "1rem" }}>Example caller</Divider>

      <div className="mt1">
        <PingButton callback={handleUpdateLink} />
        <CreateSystemAccount callback={handleUpdateLink} />
        <PingDataButton callback={handleUpdateLink} />
        <TransactionLink link={link} />
      </div>
      <Divider sx={{ margin: "1rem" }}>Transfer SOL To:</Divider>
      <TransferTo />
    </>
  );
};

export default App;
