import { Button } from "@mui/material";
import React from "react";

const DayButton = ({ clickHandler, isSelected, children }) => {
  const styles = {
    btn: {
      color: isSelected ? "#000" : "#fff",
      backgroundColor: isSelected ? "gold" : "#333",
      fontWeight: isSelected ? 700 : 500,
      p: "10px 20px ",
      border: "1px solid gold",
      borderRadius: "5px",
      "&:hover": {
        backgroundColor: "gold",
        color: "#000",
      },
    },
  };

  return (
    <Button onClick={clickHandler} sx={styles.btn}>
      {children} Days
    </Button>
  );
};

export default DayButton;
