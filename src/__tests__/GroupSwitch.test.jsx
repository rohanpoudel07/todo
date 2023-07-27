import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../pages/Home/Home";
import { GroupContextProvider } from "../context/GroupContext";
import { initDB } from "../lib/databaseConfig";
import { MemoryRouter } from "react-router-dom";
import { addData } from "../lib/addData";


describe("Testing Group Switching", () => {
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

  it("Group Changing Should Work", async () => {

    await initDB();
    await addData('groups', { ...testGroup });
    await addData('tasks', { ...testTask });
    await addData('groups', { ...testGroup, group_name: "Group 2" });
    await addData('tasks', { ...testTask, title: "Task 2", desc: "Task 2 description", status: "completed", group_id: 2 });

    render(
      <MemoryRouter>
        <GroupContextProvider
          value={{
            mockSetGroups,
            mockSetTasks,
            mockSetCurrentGroup,
            mockCurrentGroup,
            mockGroups,
            mockTasks
          }}
        >
          <Home />
        </GroupContextProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      const dropdown = screen.getByTestId("groups-dropdown");
      expect(dropdown).toBeInTheDocument();

      fireEvent.change(dropdown, { target: { value: 1 } });

      expect(screen.getByTestId("task_table")).toBeInTheDocument();
      expect(screen.getByTestId("task-title").textContent).toBe("Task 1");
    });

    await waitFor(() => {
      const dropdown = screen.getByTestId("groups-dropdown");
      fireEvent.change(dropdown, { target: { value: 2 } });
    });

    await waitFor(() => {
      expect(screen.getByTestId("task_table")).toBeInTheDocument();
      expect(screen.getByTestId("task-title").textContent).toBe("Task 2");
    });
  });


});