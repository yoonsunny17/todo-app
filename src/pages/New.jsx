import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { TodoHeader } from "../components/TodoHeader";
import { Input, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Priority } from "../components/Priority";
import { TodoBtn } from "../components/TodoBtn";
import moment from "moment";
import "moment/locale/ko";

export const New = () => {
  const navigate = useNavigate();

  const newId = uuidv4(); // 고유 아이디 생성해주기
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

  let getTodoList = localStorage.getItem("todoList");
  getTodoList = JSON.parse(getTodoList);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleChangePriority = () => {
    switch (priority) {
      case "HIGH":
        setPriority("LOW");
        break;
      case "MEDIUM":
        setPriority("HIGH");
        break;
      case "LOW":
        setPriority("MEDIUM");
        break;
      default:
        setPriority("MEDIUM");
        break;
    }
  };

  const handleSubmitNewTodo = () => {
    getTodoList.push({
      id: newId,
      title: title,
      content: content,
      priority: priority,
      checked: false,
      createdAt: createdAt,
    });
    localStorage.setItem("todoList", JSON.stringify(getTodoList));
    navigate(process.env.PUBLIC_URL + "/");
  };
  return (
    <PageLayout sx={{ padding: "48px 24px" }}>
      <TodoHeader
        buttonText="BACK"
        onClick={() => {
          navigate(-1);
        }}
      />
      {/* title & content */}
      <Stack
        sx={{
          backgroundColor: "#F5F5F5",
          padding: "20px",
          borderRadius: "4px",
        }}
        gap={1.5}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
            padding: "12px",
          }}
        >
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력해 주세요."
            disableUnderline
            sx={{
              width: "100%",
              fontSize: "16px",
              fontWeight: 600,
              height: "24px",
            }}
          />
          {/* <SelectPriority /> */}
          <Stack
            onClick={handleChangePriority}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <Priority priority={priority} />
          </Stack>
        </Stack>
        <TextField
          value={content}
          onChange={handleContentChange}
          placeholder="내용을 입력해 주세요."
          variant="standard"
          InputProps={{
            disableUnderline: true,
            style: { fontSize: "14px" },
          }}
          multiline
          rows={12}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
            padding: "12px",
          }}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="end"
        gap={1.5}
        sx={{ marginTop: "12px" }}
      >
        <TodoBtn
          buttonText="CANCEL"
          onClick={() => {
            navigate(-1);
          }}
        />
        <TodoBtn
          buttonText="SAVE"
          onClick={handleSubmitNewTodo}
          disabled={title.length === 0 ? true : false}
        />
      </Stack>
    </PageLayout>
  );
};
