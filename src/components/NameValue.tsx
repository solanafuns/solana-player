import { FC } from "react";

const NameValue: FC<any> = ({ name, value }) => {
  return (
    <p>
      <b className="m1">{name}:</b>
      {value}
    </p>
  );
};

export default NameValue;
