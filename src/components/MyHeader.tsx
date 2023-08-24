import { VERSION } from "../utils";
import { MyThemeSwitch } from "./MyThemeContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
const MyHeader = () => {
  return (
    <div>
      <WalletMultiButton />
      <MyThemeSwitch />
      <p>solana player: {VERSION}</p>
    </div>
  );
};

export default MyHeader;
