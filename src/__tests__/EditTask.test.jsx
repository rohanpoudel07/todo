import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import TasksTable from "../components/tasksTable/TasksTable";
import { GroupContextProvider } from "../context/GroupContext";
import { MemoryRouter } from "react-router-dom";
import { initDB } from "../lib/databaseConfig";

describe("Testing the edit state of TasksTable", () => {

  const testTasks = [
    {
      task_id: 1,
      title: "Task 1",
      desc: "Task Description",
      status: "pending",
      group_id: 1
    }
  ]


  it("Changes the edit state of TaskTable", async () => {
    await initDB();
    const setState = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(initState => [initState, setState]);

    render(
      <MemoryRouter>
        <GroupContextProvider>
          <TasksTable
            tasks={testTasks}
          />
        </GroupContextProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId("task-title")).toBeInTheDocument();

    const editButton = screen.getByTestId("edit-task-btn");
    expect(editButton).toBeInTheDocument();

    act(() => fireEvent.click(editButton));

    // expect(setState).toHaveBeenCalled();

  })

})