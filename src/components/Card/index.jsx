import { useRef, useContext } from "react";
import BoardContext from "../Board/context";
import * as C from "./styles";
import { useDrag, useDrop } from "react-dnd";

const Card = ({ data, index, listIndex }) => {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { index, listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover: (item, monitor) => {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex)
        return;

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = ((targetSize.bottom - targetSize.top) / 2).toFixed();

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = (draggedOffset.y - targetSize.top).toFixed();

      if (
        (draggedIndex < targetIndex && draggedTop < targetCenter) ||
        (draggedIndex > targetIndex && draggedTop > targetCenter)
      ) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <C.Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map((label) => (
          <C.Label key={label} color={label} />
        ))}
      </header>
      <C.Content>{data.content}</C.Content>
      {data.user && <img src={data.user} alt="user_avatar" />}
    </C.Container>
  );
};

export default Card;
