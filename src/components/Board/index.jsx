import { useState } from "react";
import BoardContext from "./context";
import produce from "immer";
import * as C from "./styles";
import List from "../List";
import { loadLists } from "../../services/api";

const data = loadLists();

const Board = () => {
  const [lists, setLists] = useState(data);

  const move = (fromList, toList, from, to) => {
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromList].cards[from];
        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      })
    );
  };

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <C.Container>
        {lists.map((list, index) => (
          <List key={list.title} index={index} data={list} />
        ))}
      </C.Container>
    </BoardContext.Provider>
  );
};

export default Board;
