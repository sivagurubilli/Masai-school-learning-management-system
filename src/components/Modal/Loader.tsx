import React from "react";
import { Spinner } from "@chakra-ui/react";

interface LoadingProps {
  size?: string;
  thickness?: string;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = "xl", thickness = "2px", color = "blue.500" }) => {
  return <Spinner size={size} thickness={thickness} color={color} />;
};

export default Loading;
