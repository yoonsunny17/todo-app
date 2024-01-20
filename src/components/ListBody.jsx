import { Checkbox, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Priority } from "./Priority";

const TodoBox = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 8px;
  margin-bottom: 12px;
  background: #f5f5f5;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }
`;

/** 투두리스트 여러개 쭉 보여주는거 */
export const ListBody = (props) => {
  const navigate = useNavigate();

  // checkbox handling
  const handleCheckboxChange = (idx) => {
    const updatedTodoList = [...props.todoList];
    updatedTodoList[idx].checked = !updatedTodoList[idx].checked;
    props.changeTodoList(updatedTodoList);
  };

  if (localStorage.getItem("todoList") !== null) {
    const todoList = props.todoList;
    return todoList.map((val, idx) => {
      return (
        <TodoBox key={idx}>
          <Checkbox
            checked={todoList[idx].checked}
            onChange={() => {
              handleCheckboxChange(idx);
            }}
            color="default"
            disableRipple
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "calc(100%)" }}
            onClick={() => {
              navigate(process.env.PUBLIC_URL + "/detail/" + todoList[idx].id);
            }}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: 600, marginLeft: "8px" }}
            >
              {todoList[idx].title}
            </Typography>
          </Stack>
          <Priority priority={todoList[idx].priority} />
        </TodoBox>
      );
    });
  }
};
