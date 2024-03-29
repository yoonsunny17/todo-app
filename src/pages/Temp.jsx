import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { TodoHeader } from "../components/TodoHeader";
import { Box, Input, MenuItem, Select, Stack } from "@mui/material";
import { ListBody } from "../components/ListBody";

export const List = () => {
  const navigate = useNavigate();

  // 투두리스트 가져오기
  let getTodoList = localStorage.getItem("todoList");
  getTodoList = JSON.parse(getTodoList) || null;

  const [todoList, setTodoList] = useState(getTodoList); // 원본 데이터 담긴 변수
  const [sortedList, setSortedList] = useState(getTodoList); // 정렬 필터링 거친 변수

  // const sortFilter = [
  //   "최근생성순",
  //   "오래된순",
  //   "우선순위 높은순",
  //   "우선순위 낮은순",
  // ];
  // const [selectedSortFilter, setSelectedSortFilter] = useState("최근생성순");

  // const handleSearchInput = useCallback(
  //   (e) => {
  //     const inputValue = e.target.value.toLowerCase();
  //     const copy = [...sortedList];

  //     if (inputValue.length !== 0) {
  //       const searchedTodoList = copy.filter((item) =>
  //         item.title.toLowerCase().includes(inputValue)
  //       );
  //       setSortedList(searchedTodoList);
  //     } else {
  //       setSortedList(copy);
  //     }
  //   },
  //   [sortedList]
  // );

  const handleBtnClick = () => {
    navigate(process.env.PUBLIC_URL + "/new");
  };

  const handleTodoListUpdate = (newTodoList) => {
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

  // useEffect(() => {
  //   let copyList = [...todoList];
  //   if (selectedSortFilter === "최근생성순") {
  //     copyList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  //   } else if (selectedSortFilter === "오래된순") {
  //     copyList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //   }
  //   setSortedList(copyList);
  // }, [selectedSortFilter, todoList]);

  return (
    <PageLayout sx={{ padding: "48px 24px" }}>
      <TodoHeader buttonText="NEW" onClick={handleBtnClick} />
      <Stack direction="row" justifyContent="space-between">
        {/* searchbar */}
        <Input
          disableUnderline
          placeholder="제목으로 검색"
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            height: "40px",
            width: "calc(64% - 12px)",
            padding: "0px 16px",
            backgroundColor: "#F5F5F5",
            borderRadius: "8px",
          }}
          // onChange={handleSearchInput}
        />
        <Select
          variant="standard"
          disableUnderline
          // value={selectedSortFilter}
          // onChange={(e) => {
          //   setSelectedSortFilter(e.target.value);
          // }}
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            height: "40px",
            width: "calc(36%)",
            backgroundColor: "#F5F5F5",
            borderRadius: "8px",
            marginBottom: "24px",
            textAlign: "start",
            padding: "12px",
          }}
        >
          {/* {sortFilter.map((item) => {
            return (
              <MenuItem
                key={item}
                value={item}
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  height: "40px",
                }}
              >
                {item}
              </MenuItem>
            );
          })} */}
        </Select>
      </Stack>
      <Box
        sx={{
          maxHeight: "calc(84% - 8px)",
          overflowY: "auto",
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        <ListBody todoList={todoList} changeTodoList={handleTodoListUpdate} />
      </Box>
    </PageLayout>
  );
};
