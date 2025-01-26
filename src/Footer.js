import React from "react";
import { useMantineTheme } from "@mantine/core";

const Footer = () => {
  const theme = useMantineTheme();

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[1],
        color:
          theme.colorScheme === "dark"
            ? theme.colors.gray[2]
            : theme.colors.dark[7],
        textAlign: "center",
        padding: "1rem",
        marginTop: "2rem",
      }}
    >
      <p>Developed by Biruk Worku</p>
    </footer>
  );
};

export default Footer;
