import React from "react";

const CalcHeight = ({ height, children }) => {
  return <div style={{ height: `calc(100vh - ${height}px)` }}>{children}</div>;
};

export default CalcHeight;
