import { FC, ReactNode } from "react";
import { MyThemeContextProvider } from "./MyThemeContext";
import WalletContextProvider from "./WalletContext";

export const AppContext: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MyThemeContextProvider>
      <WalletContextProvider>{children}</WalletContextProvider>
    </MyThemeContextProvider>
  );
};
