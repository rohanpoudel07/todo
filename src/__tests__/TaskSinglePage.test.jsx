import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../pages/Home/Home";
import { GroupContextProvider } from "../context/GroupContext";
import { initDB } from "../lib/databaseConfig";
import { MemoryRouter } from "react-router-dom";
import { addData } from "../lib/addData";


describe("Testing Single Page Load for Task", () => {
  const mockSetGroups = jest.fn();
  const mockSetTasks = jest.fn();
  const mockSetCurrentGroup = jest.fn();
  const mockCurrentGroup = 1;
  let mockGroups;
  let mockTasks;

  const testGroup = {
    group_name: "Group 1"
  }

  const testTask = {
    title: "Task 1",
    desc: "Task 1 description",
    status: "pending",
    group_id: 1,
  }

  it("Single Task Page should load correctly", async () => {

    await initDB();
    await addData('groups', { ...testGroup });
    await addData('tasks', { ...testTask });

    render(
      <MemoryRouter>
        <GroupContextProvider
          value={{
            mockSetGroups,
            mockSetTasks,
            mockGroups,
            mockTasks,
            mockSetCurrentGroup,
            mockCurrentGroup,
          }}
        >
          <Home />
        </GroupContextProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const taskTitle = screen.getByTestId("task-title");
      expect(screen.getByTestId("task_table")).toBeInTheDocument();
      expect(taskTitle.textContent).toBe("Task 1");

      fireEvent.click(taskTitle);

      expect(taskTitle).toHaveAttribute('href', '/task?1');

    })

  })
})