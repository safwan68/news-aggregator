import React from "react";
import { TextField } from "@mui/material";

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateField: React.FC<DateFieldProps> = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      type="date"
      InputLabelProps={{ shrink: true }}
      value={value}
      onChange={onChange}
      fullWidth
    />
  );
};

export default DateField;
