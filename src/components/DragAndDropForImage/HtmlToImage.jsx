// HtmlToImage.js
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import backgroundImage from '../img/background.svg'; // Update with your actual background image path
import Header from "../../components/Home/Header";

const ItemTypes = {
  BOX: 'box',
};

const DraggableBox = ({ item, index, moveBox }) => {
  const [, ref] = useDrag({
    type: ItemTypes.BOX,
    item: { index },
  });

  return (
    <div
      ref={ref}
      className="box p-4 border rounded-lg shadow-md m-2 bg-white"
      style={{ cursor: 'move' }}
    >
      {item}
    </div>
  );
};

const DroppableArea = ({ items, moveBox }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveBox(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={drop}
      className="droppable-area min-h-32 border-dashed border-2 border-gray-400 p-4 bg-gray-50"
    >
      {items.map((item, index) => (
        <DraggableBox key={index} item={item} index={index} moveBox={moveBox} />
      ))}
    </div>
  );
};

const HtmlToImage = () => {
  const [items, setItems] = useState(['Text 1', 'Text 2', 'Text 3']);
  const [imageSrc, setImageSrc] = useState(null);
  const containerRef = useRef();

  const moveBox = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  const convertToImage = () => {
    if (containerRef.current) {
      html2canvas(containerRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        setImageSrc(imgData);
      });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <div
        className="flex flex-col items-center justify-start min-h-screen bg-cover bg-no-repeat pt-16"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h2 className="text-4xl font-bold mt-7 mb-6 text-gray-800">Convert HTML to Image</h2>
        <div
          ref={containerRef}
          className="w-96 p-4 bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          <DroppableArea items={items} moveBox={moveBox} />
        </div>
        <button
          onClick={convertToImage}
          className="mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Convert to Image
        </button>
        {imageSrc && (
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-800">Generated Image:</h3>
            <img src={imageSrc} alt="Converted" className="mt-2 rounded-lg border" />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default HtmlToImage;
