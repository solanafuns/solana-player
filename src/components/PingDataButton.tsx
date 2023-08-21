import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js";
import { FC } from "react";
import { Button } from "@mui/material";
import { TransactionLinkProps, commonML } from "../utils";

const PROGRAM_ID = new Web3.PublicKey(
  "EXhGwzuCNQpHmPETzXYz2VYDG7Afr8fNnYmm4tZndYzR"
);
// const PROGRAM_DATA_PUBLIC_KEY = new Web3.PublicKey(
//   "Dy6mBH4YeqJCRZohd39iSFaf4jyLaxPeBakbZwt1jToL"
// );

const PingDataButton: FC<TransactionLinkProps> = (
  props: TransactionLinkProps
) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = async () => {
    if (publicKey === null) {
      return;
    }
    const [pda] = Web3.PublicKey.findProgramAddressSync(
      [publicKey?.toBytes(), Buffer.from("helloxssssxx")], // new TextEncoder().encode(movie.title)],
      new Web3.PublicKey(PROGRAM_ID)
    );

    console.log(pda);
    console.log(pda.toBase58(), "------------");
    debugger;
    if (!connection || !publicKey) {
      alert("Please connect your wallet first lol");
      return;
    }

    // const pair = Web3.Keypair.generate();
    // const transaction = new Web3.Transaction();

    const instruction = new Web3.TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: Web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      programId: PROGRAM_ID,
      data: Buffer.from("hello world"),
    });

    const {
      value: { blockhash },
    } = await connection.getLatestBlockhashAndContext();

    const messageV0 = new Web3.TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: blockhash,
      instructions: [instruction],
    }).compileToV0Message();

    const trx = new Web3.VersionedTransaction(messageV0);
    sendTransaction(trx, connection).then((sig) => {
      console.log(
        `Explorer URL: https://solscan.io/tx/${sig}?cluster=devnet` + ""
      );
      props.callback(`https://solscan.io/tx/${sig}?cluster=devnet`);
    });
  };

  return (
    <Button variant="contained" onClick={onClick} color="warning" sx={commonML}>
      Ping Solana with data !
    </Button>
  );
};

export default PingDataButton;
