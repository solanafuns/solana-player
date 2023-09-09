import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js";
import { FC } from "react";
import { Button } from "@mui/material";
import { TransactionLinkProps, commonML, transactionLink } from "../utils";

const PROGRAM_ID = new Web3.PublicKey(
  "GK9t5Y2HnaWrmufdvoxjz8w4ef7b5KGD85jK8JxidkGo"
);

const TransferADA: FC<TransactionLinkProps> = (props: TransactionLinkProps) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = async () => {
    if (publicKey === null) {
      return;
    }

    if (!connection || !publicKey) {
      alert("Please connect your wallet first lol");
      return;
    }

    const seed = "creators.dao.abcdef";
    const adaAccount = await Web3.PublicKey.createWithSeed(
      publicKey,
      seed,
      PROGRAM_ID
    );

    console.log("adaAccount is : ", adaAccount.toString());

    const instructions = [];
    const info = await connection.getAccountInfo(adaAccount);
    if (info === null) {
      alert("need Creating account");
    }

    console.log(info?.data);
    console.log("info : current owner : ", info?.owner.toString());

    instructions.push(
      Web3.SystemProgram.assign({
        accountPubkey: adaAccount,
        basePubkey: publicKey,
        seed,
        programId: PROGRAM_ID,
      })
    );

    const {
      value: { blockhash },
    } = await connection.getLatestBlockhashAndContext();

    const messageV0 = new Web3.TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message();

    const trx = new Web3.VersionedTransaction(messageV0);

    sendTransaction(trx, connection)
      .then((sig) => {
        const sigLink = transactionLink(sig);
        console.log(`Explorer URL: ${sigLink} `);
        props.callback(sigLink);
      })
      .catch((err) => {
        console.log("transaction error : ", err);
      });
  };

  return (
    <Button variant="contained" onClick={onClick} color="success" sx={commonML}>
      Transfer ADA!
    </Button>
  );
};

export default TransferADA;
