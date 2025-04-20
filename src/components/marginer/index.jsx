import React from "react";
import styled from "styled-components";

const HorizontalMargin = styled.span`
  display: flex;
  width: ${({ margin }) =>
    typeof margin === "string" ? margin : `${margin}px`};
  transition: width 300ms ease-in-out; /* Added transition for smooth width changes */
`;

const VerticalMargin = styled.span`
  display: flex;
  height: ${({ margin }) =>
    typeof margin === "string" ? margin : `${margin}px`};
  transition: height 300ms ease-in-out; /* Added transition for smooth height changes */
`;


function Marginer(props) {
  const { direction } = props;

  if (direction === "horizontal") return <HorizontalMargin {...props} />;
  else {
    return <VerticalMargin {...props} />;
  }
}

Marginer.defaultProps = {
  direction: "horizontal",
};

export { Marginer };