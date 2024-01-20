import { Button, Stack, Typography } from "@mui/material";

export const TodoHeader = (props) => {
  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
          WHATS IN MY TODO
        </Typography>
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
        >
          {props.buttonText}
        </Button>
      </Stack>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 400,
          marginBottom: "16px",
          textAlign: "left",
        }}
      >
        할일을 기록하세요
      </Typography>
    </Stack>
  );
};
