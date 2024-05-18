import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ anchorEl }) => {
  return (
    <>
      <Menu anchorEl={anchorEl} open={false}>
        <div
          style={{
            width: "200px",
            height: "200px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </Menu>
    </>
  );
};

export default FileMenu;
