import React, { Fragment } from "react";
import { useDrag } from "react-dnd";
import { FaArrowCircleLeft, FaRegEdit } from "react-icons/fa";
import { Divider, Menu } from "semantic-ui-react";

interface Props {
  tool_type: string;
  type: string;
  onDropField: (tool_type:string) => void;
}

export default function ToolItem({
  tool_type,
  type,
  onDropField,
}: Props) {
  const [isDragging, dragRef] = useDrag(() => ({
    type,
    item: { tool_type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDropField(tool_type);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const tool = tool_type === "text" 
    ? ( <Fragment>
            <Menu.Item name="input">
            <FaRegEdit /> Input
            </Menu.Item>
            <Divider />
        </Fragment>)
    : (
        <Menu.Item name="button">
            <FaArrowCircleLeft />
            Button
        </Menu.Item>
    );

  return (
    <div
      className="dragable"
      style={{ backgroundColor: isDragging ? "" : "" }}
      ref={dragRef}
    >
      {tool}
    </div>
  );
}
