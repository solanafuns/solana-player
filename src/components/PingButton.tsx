import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js";
import { FC } from "react";
import { Button } from "@mui/material";
import { TransactionLinkProps, commonML, transactionLink } from "../utils";

const PROGRAM_ID = new Web3.PublicKey(
  "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
);
const PROGRAM_DATA_PUBLIC_KEY = new Web3.PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
);

const PingButton: FC<TransactionLinkProps> = (props: TransactionLinkProps) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = async () => {
    if (!connection || !publicKey) {
      alert("Please connect your wallet first lol");
      return;
    }

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

    const blockHash = await connection.getLatestBlockhash();

    console.log(connection);

    const messageV0 = new Web3.TransactionMessage({
      payerKey: publicKey,
      instructions: [instruction],
      recentBlockhash: blockHash.blockhash,
    }).compileToV0Message();

    console.log(messageV0);

    const trx = new Web3.VersionedTransaction(messageV0);
    sendTransaction(trx, connection).then((sig) => {
      const sigLink = transactionLink(sig);
      console.log(`Explorer URL: $sigLink ` + "");
      props.callback(sigLink);
    });
  };

  return (
    <Button variant="contained" onClick={onClick} color="info" sx={commonML}>
      Ping Solana!
    </Button>
  );
};

export default PingButton;
