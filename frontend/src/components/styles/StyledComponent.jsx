import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor } from "../../constants/color";
export const VisuallyHiddenInput = styled("input")({
  position: "absolute",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: #892901;
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  padding: 0 3rem;
  /* margin: 0.5rem 0; */
  border: 2px solid black;
  outline: none;
  border-radius: 1.5rem;
  background-color: ${grayColor};
  color: black;
`;
