import { CompileTime } from "../compile";
import { VERSION } from "../utils";
import { MyThemeSwitch } from "./MyThemeContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
const MyHeader = () => {
  return (
    <div>
      <WalletMultiButton />
      <MyThemeSwitch />
      <p style={{ float: "right" }}>
        <span>
          solana player: <b>{VERSION}</b>
        </span>
        <span style={{ marginLeft: "1rem" }}>
          compile at : <b>{CompileTime}</b>
        </span>
      </p>
    </div>
  );
};

export default MyHeader;
