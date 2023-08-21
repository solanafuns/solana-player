import { Stack, Button, TextField } from "@mui/material";
import { commonSx } from "../utils";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js";
import { TransactionLink } from "./TransactionLink";

const TransferTo = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [transactionLink, setTransactionLink] = useState<string>("");
  const [params, setParams] = useState<{
    value: number;
    recipient: string;
  }>({
    value: 0.1,
    recipient: publicKey?.toString() || "",
  });

  useEffect(() => {
    setParams({
      ...params,
      recipient: publicKey?.toString() || "",
    });
  }, [publicKey]);

  const onTransfer = async () => {
    if (!connection || !publicKey) {
      alert("Please connect your wallet first lol");
      return;
    }

    const toPublicKey = new Web3.PublicKey(params.recipient);

    const blockHash = await connection.getLatestBlockhash();

    const instruction = Web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: toPublicKey,
      lamports: Web3.LAMPORTS_PER_SOL * params.value,
    });

    const messageV0 = new Web3.TransactionMessage({
      payerKey: publicKey,
      instructions: [instruction, instruction, instruction],
      recentBlockhash: blockHash.blockhash,
    }).compileToV0Message();

    const trx = new Web3.VersionedTransaction(messageV0);

    sendTransaction(trx, connection).then((sig: any) => {
      console.log(
        `Explorer URL: https://solscan.io/tx/${sig}?cluster=devnet` + ""
      );
      setTransactionLink(`https://solscan.io/tx/${sig}?cluster=devnet`);
    });
  };

  return (
    <Stack direction="column" spacing={3}>
      <div>
        <TextField
          label="quantity value"
          variant="standard"
          type="number"
          value={params.value}
          sx={commonSx}
          onChange={(e) =>
            setParams({
              ...params,
              value: parseFloat(e.target.value),
            })
          }
        />
      </div>
      <div>
        <TextField
          label="recipient address"
          variant="standard"
          value={params.recipient}
          sx={commonSx}
          onChange={(e) => setParams({ ...params, recipient: e.target.value })}
        />
      </div>
      <div>
        <Button
          sx={{
            ...commonSx,
            width: "25%",
          }}
          variant="contained"
          color="info"
          onClick={onTransfer}
        >
          Do Transfer
        </Button>
      </div>

      <TransactionLink link={transactionLink} />
    </Stack>
  );
};

export default TransferTo;
