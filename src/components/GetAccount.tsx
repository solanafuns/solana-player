import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { commonML } from "../utils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

const GetAccount = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [params, setParams] = useState<{
    account: string;
  }>({
    account: publicKey?.toString() || "",
  });
  const [accountInfo, setAccountInfo] = useState<any>({});

  useEffect(() => {
    setParams({
      ...params,
      account: publicKey?.toString() || "",
    });
  }, [publicKey]);

  const getAccountInfo = async () => {
    console.log(`get account info with ${params.account} `);
    connection.getAccountInfo(new PublicKey(params.account)).then((info) => {
      setAccountInfo(info);
    });
  };

  return (
    <>
      <TextField
        label="account value"
        variant="standard"
        value={params.account}
        onChange={(e) => {
          setParams({
            ...params,
            account: e.target.value,
          });
        }}
        sx={{
          marginLeft: "1.5rem",
          width: "50%",
        }}
      />
      <Button
        variant="contained"
        color="info"
        sx={commonML}
        onClick={getAccountInfo}
      >
        Get Account info
      </Button>

      <pre style={{ marginLeft: "1.5rem" }}>{JSON.stringify(accountInfo)}</pre>
    </>
  );
};
export default GetAccount;
