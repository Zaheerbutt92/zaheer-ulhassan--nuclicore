import React from "react";
import { Divider, Menu } from "semantic-ui-react";
import tools from "../toolbox/tools.json";
import ToolItem from "./ToolItem";

interface Props {
  addFiedlHandler: (field_type: string) => void;
}
export default function CustomToolBox({ addFiedlHandler }: Props) {
  const moveField = (tool_type: string) => {
    if (tool_type) addFiedlHandler(tool_type);
  };

  return (
    <Menu size="massive" vertical style={{ textAlign: "center" }}>
      <Menu.Item name="basic elements">
        <h3>Basic Elements</h3>
      </Menu.Item>
      <Divider />
      {tools.map((tool) => (
        <ToolItem
          tool_type={tool.tool_type}
          key={tool.tool_id}
          type="field"
          onDropField={moveField}
        />
      ))}
    </Menu>
  );
}
