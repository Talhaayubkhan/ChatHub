import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor } from "../../constants/color";

const VisuallyHiddenInput = styled("input")({
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: "lightgray";
  }
`;

const InputBox = styled("input")`
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

const SearchField = styled("input")`
  flex-grow: 1;
  height: 3rem;
  padding: 1rem 1rem;
  margin: 1rem 1rem;
  border: none;
  border-radius: 0.8rem;
  background-color: "#1976d2";
  color: black !important;
  outline: none;
`;

const CurveButton = styled("button")`
  background-color: "#1976d2";
  color: black;
  padding: 1rem 1rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const bounceAnimation = keyframes`
  0% {transform: scale(1);}
  50% {transform: scale(1.1);}
  100% {transform: scale(1);}
`;

// Create a styled Skeleton component with the bouncing animation
const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite ease-in-out`,
}));

export {
  VisuallyHiddenInput,
  Link,
  InputBox,
  SearchField,
  CurveButton,
  BouncingSkeleton,
};
