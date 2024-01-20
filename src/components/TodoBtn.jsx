import { Button } from "@mui/material";

export const TodoBtn = (props) => {
  return (
    <Button
      variant="contained"
      sx={{
        fontSize: "12px",
        fontWeight: 700,
        backgroundColor: "#D9D9D9",
        boxShadow: "none",
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: "#8a8a8a",
          boxShadow: "none",
        },
      }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.buttonText}
    </Button>
  );
};
