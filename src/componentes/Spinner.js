import React from "react";
import styled, { keyframes } from "styled-components";
import posed from "react-pose";

const rotation = keyframes`
    0% 		{ transform: rotate(0deg); }
	50% 	{ transform: rotate(180deg); }
	100% 	{ transform: rotate(360deg); }
`;

const Container = styled(
  posed.div({
    enter: {
      x: "50%",
      y: "-50%",
      rotate: "45deg"
    },
    exit: {
      x: "100%",
      y: "-100%",
      rotate: "45deg"
    }
  })
)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: #ed4e6e;

  &::before,
  &::after {
    position: absolute;
    bottom: 30px;
    left: 50%;
    display: block;
    border: 5px solid #fff;
    border-radius: 50%;
    content: "";
  }
  &::before {
    margin-left: -40px;
    width: 80px;
    height: 80px;
    border-right-color: #bb344f;
    border-left-color: #bb344f;
    -webkit-animation: ${rotation} 3s linear infinite;
    animation: ${rotation} 3s linear infinite;
  }
  &::after {
    bottom: 50px;
    margin-left: -20px;
    width: 40px;
    height: 40px;
    border-top-color: #bb344f;
    border-bottom-color: #bb344f;
    -webkit-animation: ${rotation} 1s linear infinite;
    animation: ${rotation} 1s linear infinite;
  }
`;

export default props => {
  return <Container pose={props.pose}></Container>;
};