import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js";
import { FC } from "react";
import { Button } from "@mui/material";
import { TransactionLinkProps, commonML, transactionLink } from "../utils";
import { MATH_STUFF_SIZE } from "../models/MathStuffSum";
import { Buffer } from "buffer";

const PROGRAM_ID = new Web3.PublicKey(
  "GK9t5Y2HnaWrmufdvoxjz8w4ef7b5KGD85jK8JxidkGo"
);

const PingDataButton: FC<TransactionLinkProps> = (
  props: TransactionLinkProps
) => {
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

    const shareAccount = await Web3.PublicKey.createWithSeed(
      publicKey,
      seed,
      PROGRAM_ID
    );

    // const [shareAccount, bumpSeed] = Web3.PublicKey.findProgramAddressSync(
    //   [publicKey.toBytes(), Buffer.from(seed)],
    //   PROGRAM_ID
    // );
    // console.log(bumpSeed);

    console.log(shareAccount);
    console.log(shareAccount.toBase58());

    const instructions = [];
    const info = await connection.getAccountInfo(shareAccount);
    if (info === null) {
      console.log("need Creating account");
      instructions.push(
        Web3.SystemProgram.createAccountWithSeed({
          fromPubkey: publicKey,
          newAccountPubkey: shareAccount,
          basePubkey: publicKey,
          seed,
          lamports: Web3.LAMPORTS_PER_SOL,
          space: MATH_STUFF_SIZE,
          programId: PROGRAM_ID,
        })
      );
    }
    instructions.push(
      new Web3.TransactionInstruction({
        keys: [{ pubkey: shareAccount, isSigner: false, isWritable: true }],
        data: Buffer.from("hello solana creators dao"),
        programId: PROGRAM_ID,
      })
    );

    // instructions.push(
    //   Web3.SystemProgram.assign({
    //     accountPubkey: shareAccount,
    //     basePubkey: publicKey,
    //     seed,
    //     programId: Web3.SystemProgram.programId,
    //   })
    // );

    // console.log(instructions);

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
    <Button variant="contained" onClick={onClick} color="warning" sx={commonML}>
      Ping Solana with data !
    </Button>
  );
};

export default PingDataButton;
