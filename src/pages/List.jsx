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
  getTodoList = JSON.parse(getTodoList);

  const [todoList, setTodoList] = useState(getTodoList);

  const sortFilter = [
    "최근생성순",
    "오래된순",
    "우선순위 높은순",
    "우선순위 낮은순",
  ];
  const [selectedSortFilter, setSelectedSortFilter] = useState("최근생성순");

  // TODO: 필터링 기능 추가 (최근생성순 / 오래된 생성순 / 우선순위 낮은순 높은순)
  // TODO: 필터링 기능 추가 (최근생성순 / 오래된 생성순 / 우선순위 낮은순 높은순)
  // TODO: 필터링 기능 추가 (최근생성순 / 오래된 생성순 / 우선순위 낮은순 높은순)

  // useEffect(() => {
  //   const priorityLevel = {
  //     HIGH: 0,
  //     MEDIUM: 1,
  //     LOW: 2,
  //   };
  //   switch (selectedSortFilter) {
  //     case "우선순위 높은순":
  //       setTodoList((prevList) =>
  //         [...prevList].sort(
  //           (a, b) => priorityLevel[a.priority] - priorityLevel[b.priority]
  //         )
  //       );
  //       // setTodoList(
  //       //   [...todoList].sort(
  //       //     (a, b) => priorityLevel[a.priority] - priorityLevel[b.priority]
  //       //   )
  //       // );
  //       break;
  //     case "우선순위 낮은순":
  //       setTodoList((prevList) =>
  //         [...prevList].sort(
  //           (a, b) => priorityLevel[a.priority] - priorityLevel[b.priority]
  //         )
  //       );
  //       break;
  //     default:
  //       setTodoList((prevList) => [...prevList]);
  //   }
  // }, [selectedSortFilter]);

  const handleSearchInput = useCallback(
    (e) => {
      const inputValue = e.target.value;
      const copy = [...getTodoList];

      if (inputValue.length !== "") {
        const searchedTodoList = copy.filter((item) => {
          if (item.title.toUpperCase().includes(inputValue.toUpperCase())) {
            return item;
          }
        });
        setTodoList(searchedTodoList);
      } else {
        return setTodoList(getTodoList);
      }
    },
    [getTodoList]
  );

  const handleBtnClick = () => {
    navigate("/new");
  };

  const handleTodoListUpdate = (newTodoList) => {
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

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
          onChange={handleSearchInput}
        />
        <Select
          variant="standard"
          disableUnderline
          value={selectedSortFilter}
          onChange={(e) => {
            setSelectedSortFilter(e.target.value);
          }}
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
          {sortFilter.map((item) => {
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
          })}
        </Select>
      </Stack>
      <Box sx={{ maxHeight: "calc(84% - 8px)", overflowY: "scroll" }}>
        <ListBody todoList={todoList} changeTodoList={handleTodoListUpdate} />
      </Box>
    </PageLayout>
  );
};
