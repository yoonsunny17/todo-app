import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { TodoHeader } from "../components/TodoHeader";
import { Input, Stack, TextField, Typography } from "@mui/material";
import { Priority } from "../components/Priority";
import { useState } from "react";
import { TodoBtn } from "../components/TodoBtn";

export const Detail = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // 해당 투두의 아이디 가져오기

  let getTodoList = localStorage.getItem("todoList");
  getTodoList = JSON.parse(getTodoList);

  const matchedTodo = getTodoList.find((item) => item.id === id);
  const matchedTodoIdx = getTodoList.findIndex((item) => item.id === id);
  console.log(matchedTodo);

  const [isEditMode, setIsEditMode] = useState(false);

  const [title, setTitle] = useState(matchedTodo.title);
  const [content, setContent] = useState(matchedTodo.content);
  const [priority, setPriority] = useState(matchedTodo.priority);

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

  const handleSubmitEditTodo = () => {
    const updatedTodoList = getTodoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: title,
          content: content,
          priority: priority,
        };
      } else {
        return todo;
      }
    });

    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    setIsEditMode(false);
  };

  const handleDeleteTodo = () => {
    const copyList = [...getTodoList];
    copyList.splice(matchedTodoIdx, 1); // 해당 투두 인덱스 하나만 제거
    localStorage.setItem("todoList", JSON.stringify(copyList));
    navigate(process.env.PUBLIC_URL + "/");
  };

  return (
    <PageLayout sx={{ padding: "48px 24px" }}>
      <TodoHeader
        buttonText="BACK"
        onClick={() => {
          navigate(process.env.PUBLIC_URL + "/");
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
        {!isEditMode ? (
          <>
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
              <Typography
                sx={{ fontSize: "16px", fontWeight: 600, height: "24px" }}
              >
                {title}
              </Typography>
              <Priority priority={priority} />
            </Stack>
            <Typography
              sx={{
                fontSize: "14px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                padding: "12px",
                height: "270px",
                textAlign: "start",
              }}
            >
              {content}
            </Typography>
          </>
        ) : (
          <>
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
                height: "270px",
              }}
            />
          </>
        )}
      </Stack>
      {!isEditMode ? (
        <Stack
          direction="row"
          justifyContent="end"
          gap={1.5}
          sx={{ marginTop: "12px" }}
        >
          <TodoBtn buttonText="DELETE" onClick={handleDeleteTodo} />
          <TodoBtn buttonText="EDIT" onClick={() => setIsEditMode(true)} />
        </Stack>
      ) : (
        <Stack
          direction="row"
          justifyContent="end"
          gap={1.5}
          sx={{ marginTop: "12px" }}
        >
          <TodoBtn
            buttonText="CANCEL"
            onClick={() => {
              setIsEditMode(false);
            }}
          />
          <TodoBtn buttonText="SAVE" onClick={handleSubmitEditTodo} />
        </Stack>
      )}
    </PageLayout>
  );
};
