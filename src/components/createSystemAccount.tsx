import { Button } from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js";
import { TransactionLinkProps, commonML } from "../utils";
import { FC } from "react";

const CreateSystemAccount: FC<TransactionLinkProps> = (
  props: TransactionLinkProps
) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = async () => {
    if (!connection || !publicKey) {
      alert("Please connect your wallet first lol");
      return;
    }

    const blockHash = await connection.getLatestBlockhash();
    const newAccount = Web3.Keypair.generate();

    const instruction = Web3.SystemProgram.createAccount({
      fromPubkey: publicKey,
      newAccountPubkey: newAccount.publicKey,
      space: 2000,
      lamports: Web3.LAMPORTS_PER_SOL,
      programId: Web3.SystemProgram.programId,
    });

    const messageV0 = new Web3.TransactionMessage({
      payerKey: publicKey,
      instructions: [instruction],
      recentBlockhash: blockHash.blockhash,
    }).compileToV0Message();

    const trx = new Web3.VersionedTransaction(messageV0);

    sendTransaction(trx, connection, { signers: [newAccount] })
      .then((sig) => {
        console.log(
          `Explorer URL: https://solscan.io/tx/${sig}?cluster=devnet` + ""
        );
        props.callback(`https://solscan.io/tx/${sig}?cluster=devnet`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Button variant="contained" onClick={onClick} color="success" sx={commonML}>
      Create System Account!
    </Button>
  );
};

export default CreateSystemAccount;
