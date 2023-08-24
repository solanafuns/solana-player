import { SxProps } from "@mui/system";
export const commonSx: SxProps = { width: "50%", marginLeft: "1rem" };
export const commonML: SxProps = { marginLeft: "0.5rem" };

export interface TransactionLinkProps {
  callback(msg: string): void;
}

export const transactionLink = (sig: string): string => {
  return `https://solscan.io/tx/${sig}?cluster=devnet`;
  // return `https://explorer.solana.com/tx/${sig}?cluster=custom&customUrl=http://localhost:8899`;
};

export const VERSION = "1.0";
