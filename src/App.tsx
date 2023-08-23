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
import GetAccount from "./components/GetAccount";

const App = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [link, updateLink] = useState<string>("");

  const handleUpdateLink = (link: string) => {
    updateLink(link);
  };

  const [balance, setBalance] = useState(0);
  const [latestBlock, setLatestBlock] = useState<any>({});

  useEffect(() => {
    const asyncFun = async () => {
      if (!publicKey) return;
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);

      const blockHash = await connection.getLatestBlockhash();
      setLatestBlock(blockHash);
    };
    asyncFun();
  }, [publicKey, connection]);

  return (
    <>
      <MyHeader />

      <Divider sx={{ margin: "1rem" }}>solana basic</Divider>
      <NameValue name="Endpoint" value={connection.rpcEndpoint} />
      <NameValue name="Balance" value={balance} />
      <NameValue name="Latest block" value={JSON.stringify(latestBlock)} />
      <Divider sx={{ margin: "1rem" }}>Example caller</Divider>

      <div className="mt1">
        <PingButton callback={handleUpdateLink} />
        <CreateSystemAccount callback={handleUpdateLink} />
        <PingDataButton callback={handleUpdateLink} />
      </div>

      <Divider sx={{ margin: "1rem" }}>Get Account:</Divider>
      <GetAccount />

      <Divider sx={{ margin: "1rem" }}>Transfer SOL To:</Divider>
      <TransferTo callback={handleUpdateLink} />

      <div>
        {link === "" ? null : (
          <div>
            <Divider sx={{ margin: "1rem" }}>Transaction info:</Divider>
            <TransactionLink link={link} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
