import { Badge } from "antd";
import React, { memo } from "react";
import { start } from "repl";

interface LabelCardProps {
  children: React.ReactElement;
  text?: string;
  color?: string;
}

const LabelCard = ({ children, text, color }: LabelCardProps) => {
  return (
    <Badge.Ribbon text={text} color={color} placement="start">
      {children}
    </Badge.Ribbon>
  );
};

export default memo(LabelCard);
