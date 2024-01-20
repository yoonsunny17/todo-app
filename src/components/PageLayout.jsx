import { Stack } from "@mui/material";

export const PageLayout = (props) => {
  return (
    <Stack
      {...props}
      sx={{
        flex: 1,
        overflowY: "auto",
        width: "420px",
        height: "540px",
        boxShadow: 1,
        borderRadius: "8px",
        margin: "16px",
        ...props.sx,
      }}
    />
  );
};
