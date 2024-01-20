import { Typography } from "@mui/material";

export const Priority = (props) => {
  // 우선순위에 따라 글자 및 배경 색 바꾸기
  let backgroundColor, fontColor;

  switch (props.priority) {
    case "HIGH":
      backgroundColor = "#FFD1D1";
      fontColor = "#B50000";
      break;
    case "MEDIUM":
      backgroundColor = "#FFED92";
      fontColor = "#B65700";
      break;
    case "LOW":
      backgroundColor = "#BEFF8B";
      fontColor = "#00750C";
      break;
    default:
      backgroundColor = "transparent";
      fontColor = "transparent";
  }

  return (
    <Typography
      sx={{
        borderRadius: "4px",
        fontSize: "10px",
        fontWeight: 600,
        backgroundColor: backgroundColor,
        color: fontColor,
        padding: "2px 4px",
        marginRight: "8px",
      }}
    >
      {props.priority}
    </Typography>
  );
};
