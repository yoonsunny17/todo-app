import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { List } from "./pages/List";
import { New } from "./pages/New";
import { Detail } from "./pages/Detail";

function App() {
  useEffect(() => {
    // 새로운 todoList arr 생성 (빈배열)
    if (localStorage.getItem("todoList") === null) {
      localStorage.setItem("todoList", JSON.stringify([]));
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/"} element={<List />} />
        <Route path={process.env.PUBLIC_URL + "/new"} element={<New />} />
        <Route
          path={process.env.PUBLIC_URL + "/detail/:id"}
          element={<Detail />}
        />
      </Routes>
    </div>
  );
}

export default App;
