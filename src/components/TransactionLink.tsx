export const TransactionLink = ({ link }: { link: string }) => {
  return (
    <div className="mt1">
      <a target="_blank" href={link} rel="noreferrer">
        {link}
      </a>
    </div>
  );
};
