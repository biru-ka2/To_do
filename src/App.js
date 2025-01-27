import React from "react";
import {
  Button,
  Container,
  Text,
  Modal,
  TextInput,
  Group,
  Card,
  ActionIcon,
} from "@mantine/core";
import { useState, useRef, useEffect } from "react";
import { Trash } from "tabler-icons-react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Footer from "./Footer";
import Header from "./Header";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false);

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const taskTitle = useRef("");
  const taskSummary = useRef("");

  function createTask() {
    setTasks([
      ...tasks,
      {
        title: taskTitle.current.value,
        summary: taskSummary.current.value,
      },
    ]);

    saveTasks([
      ...tasks,
      {
        title: taskTitle.current.value,
        summary: taskSummary.current.value,
      },
    ]);
  }

  function deleteTask(index) {
    var clonedTasks = [...tasks];

    clonedTasks.splice(index, 1);

    setTasks(clonedTasks);

    saveTasks([...clonedTasks]);
  }

  function loadTasks() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme, defaultRadius: "md" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <div className="App">
          {/* Header Section */}
          <Container size={550} my={40}>
            <Header
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            />

            {/* Modal for New Task */}
            <Modal
              opened={opened}
              size={"md"}
              title={"New Task"}
              withCloseButton={false}
              onClose={() => {
                setOpened(false);
              }}
              centered
            >
              <TextInput
                mt={"md"}
                ref={taskTitle}
                placeholder={"Task Title"}
                required
                label={"Title"}
              />
              <TextInput
                ref={taskSummary}
                mt={"md"}
                placeholder={"Task Summary"}
                label={"Summary"}
              />
              <Group mt={"md"} position={"apart"}>
                <Button
                  onClick={() => {
                    setOpened(false);
                  }}
                  variant={"subtle"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    createTask();
                    setOpened(false);
                  }}
                >
                  Create Task
                </Button>
              </Group>
            </Modal>

            {/* Task List */}
            {tasks.length > 0 ? (
              tasks.map((task, index) => {
                if (task.title) {
                  return (
                    <Card withBorder key={index} mt={"sm"}>
                      <Group position={"apart"}>
                        <Text weight={"bold"}>{task.title}</Text>
                        <ActionIcon
                          onClick={() => {
                            deleteTask(index);
                          }}
                          color={"red"}
                          variant={"transparent"}
                        >
                          <Trash />
                        </ActionIcon>
                      </Group>
                      <Text color={"dimmed"} size={"md"} mt={"sm"}>
                        {task.summary
                          ? task.summary
                          : "No summary was provided for this task"}
                      </Text>
                    </Card>
                  );
                }
                return null; // Ensure a value is returned for every iteration
              })
            ) : (
              <Text size={"lg"} mt={"md"} color={"dimmed"}>
                You have no tasks
              </Text>
            )}
            <Button
              onClick={() => {
                setOpened(true);
              }}
              fullWidth
              mt={"md"}
            >
              New Task
            </Button>
          </Container>
          <Footer />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
