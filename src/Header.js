import React from "react";
// import PropTypes from "prop-types"; // Import prop-types
import { Group, Title, ActionIcon } from "@mantine/core";
import { MoonStars, Sun } from "tabler-icons-react";

export default function Header({ colorScheme, toggleColorScheme }) {
  return (
    <Group
      position="apart"
      style={{
        marginBottom: "1.5rem", // Add space below header
        padding: "1rem 0", // Add padding around the header
      }}
    >
      <Title
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        My Tasks
      </Title>
      <ActionIcon color="blue" onClick={() => toggleColorScheme()} size="lg">
        {colorScheme === "dark" ? <Sun size={16} /> : <MoonStars size={16} />}
      </ActionIcon>
    </Group>
  );
}

// Add prop type validation
Header.propTypes = {
  colorScheme: PropTypes.oneOf(["light", "dark"]).isRequired, // Validate colorScheme
  toggleColorScheme: PropTypes.func.isRequired, // Validate toggleColorScheme
};
