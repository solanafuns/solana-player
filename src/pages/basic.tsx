import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import NameValue from "../components/NameValue";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const BasicPage = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
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
      <NameValue name="Endpoint" value={connection.rpcEndpoint} />
      <NameValue name="Balance" value={balance} />
      <NameValue name="Latest block" value={JSON.stringify(latestBlock)} />
    </>
  );
};

export default BasicPage;
