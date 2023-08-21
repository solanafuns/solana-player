import { SxProps } from "@mui/system";
export const commonSx: SxProps = { width: "50%", marginLeft: "1rem" };
export const commonML: SxProps = { marginLeft: "0.5rem" };

export interface TransactionLinkProps {
  callback(msg: string): void;
}
