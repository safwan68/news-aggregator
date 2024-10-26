import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, ...props }) => {
  return (
    <Button sx={{ borderRadius: "20px", ...props.sx }} {...props}>
      {label}
    </Button>
  );
};

export default CustomButton;
