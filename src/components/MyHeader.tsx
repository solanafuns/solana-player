import { MyThemeSwitch } from "./MyThemeContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
const MyHeader = () => {
  return (
    <div>
      <WalletMultiButton />
      <MyThemeSwitch />
    </div>
  );
};

export default MyHeader;
