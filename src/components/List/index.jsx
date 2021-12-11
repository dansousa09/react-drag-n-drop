import * as C from "./styles";
import Card from "../Card";
import { MdAdd } from "react-icons/md";

const List = ({ data, index: listIndex }) => {
  return (
    <C.Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#FFFFF3" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => (
          <Card key={card.id} index={index} listIndex={listIndex} data={card} />
        ))}
      </ul>
    </C.Container>
  );
};

export default List;
