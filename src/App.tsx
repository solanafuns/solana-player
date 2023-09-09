import { useState } from "react";
import PingButton from "./components/PingButton";
import TransferTo from "./components/TransferTo";
import { Divider } from "@mui/material";
import PingDataButton from "./components/PingDataButton";
import CreateSystemAccount from "./components/createSystemAccount";
import { TransactionLink } from "./components/TransactionLink";
import GetAccount from "./components/GetAccount";
import TransferADA from "./components/TransferADA";

const App = () => {
  const [link, updateLink] = useState<string>("");

  const handleUpdateLink = (link: string) => {
    updateLink(link);
  };

  return (
    <>
      <Divider sx={{ margin: "1rem" }}>Example caller</Divider>

      <div className="mt1">
        <PingButton callback={handleUpdateLink} />
        <CreateSystemAccount callback={handleUpdateLink} />
        <PingDataButton callback={handleUpdateLink} />
        <TransferADA callback={handleUpdateLink} />
      </div>

      <Divider sx={{ margin: "1rem" }}>Get Account:</Divider>
      <GetAccount />

      <Divider sx={{ margin: "1rem" }}>Transfer SOL To:</Divider>
      <TransferTo callback={handleUpdateLink} />

      <div>
        {link === "" ? null : (
          <div>
            <Divider sx={{ margin: "1rem" }}>Transaction info:</Divider>
            <TransactionLink link={link} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
