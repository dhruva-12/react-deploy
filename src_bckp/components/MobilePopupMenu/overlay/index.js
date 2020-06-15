import React from "react";
import styled from "styled-components";
import { Spring, animated } from 'react-spring/renderprops';
import withTransitionToggle from "../with-transition-toggle";

const baseStyles = {
  background: "rgba(255,255,255,.6)",
  height: "100vh",
  position: "fixed",
  left: 0,
  right: 0,
  top: 0,
  zIndex: 1
};

const animateOverlay = (style, props) => {
  const { onClick, open, children, ...rest } = props;

  return (
    <animated.div
      onClick={onClick}
      style={{
        ...baseStyles,
        ...style,
        pointerEvents: open ? "auto" : "none"
      }}
      {...rest}
    >
      {children}
    </animated.div>
  );
};

const Overlay = props => {
  const { open, springProps } = props;

  let toOpacity = 0;
  if (open) toOpacity = 0.3;

  return (
    <Spring
      native
      from={{ opacity: 0 }}
      to={{ opacity: toOpacity }}
      {...springProps}
    >
      {style => animateOverlay(style, props)}
    </Spring>
  );
};

export default withTransitionToggle(Overlay);
