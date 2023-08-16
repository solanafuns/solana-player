import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js";
import { FC, useState } from "react";
import { Button } from "@mui/material";

const PROGRAM_ID = new Web3.PublicKey(
  "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
);
const PROGRAM_DATA_PUBLIC_KEY = new Web3.PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
);

const PingButton: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [transactionLink, setTransactionLink] = useState<string>("");

  const onClick = () => {
    if (!connection || !publicKey) {
      alert("Please connect your wallet first lol");
      return;
    }

    const transaction = new Web3.Transaction();

    const instruction = new Web3.TransactionInstruction({
      keys: [
        {
          pubkey: PROGRAM_DATA_PUBLIC_KEY,
          isSigner: false,
          isWritable: true,
        },
      ],
      programId: PROGRAM_ID,
    });

    transaction.add(instruction);
    sendTransaction(transaction, connection).then((sig) => {
      console.log(
        `Explorer URL: https://explorer.solana.com/tx/${sig}?cluster=devnet` +
          ""
      );
      setTransactionLink(
        `https://explorer.solana.com/tx/${sig}?cluster=devnet`
      );
    });
  };

  return (
    <>
      <div>
        <Button variant="contained" onClick={onClick}>
          Ping Solana!
        </Button>
      </div>

      <div className="mt1">
        <a target="_blank" href={transactionLink} rel="noreferrer">
          {transactionLink}
        </a>
      </div>
    </>
  );
};

export default PingButton;
