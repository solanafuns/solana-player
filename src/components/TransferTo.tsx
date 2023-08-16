import { Stack, Button, TextField } from "@mui/material";
import { commonSx } from "../utils";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js";

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

  const onTransfer = () => {
    if (!connection || !publicKey) {
      alert("Please connect your wallet first lol");
      return;
    }

    const toPublicKey = new Web3.PublicKey(params.recipient);
    const transaction = new Web3.Transaction();

    const instruction = Web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: toPublicKey,
      lamports: Web3.LAMPORTS_PER_SOL * params.value,
    });

    transaction.add(instruction);
    sendTransaction(transaction, connection).then((sig: any) => {
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

      <div className="mt1">
        <a target="_blank" href={transactionLink} rel="noreferrer">
          {transactionLink}
        </a>
      </div>
    </Stack>
  );
};

export default TransferTo;
