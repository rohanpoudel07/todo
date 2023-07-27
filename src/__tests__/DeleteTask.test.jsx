import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Home from "../pages/Home/Home";
import { GroupContextProvider } from "../context/GroupContext";
import { initDB } from "../lib/databaseConfig";
import { getStoreData } from "../lib/getData";
import { addData } from "../lib/addData"
import { MemoryRouter } from "react-router-dom";

describe("Testing task delete functionality", () => {
  const mockSetGroups = jest.fn();
  const mockSetTasks = jest.fn();
  const testTasks = {
    title: "Task 1",
    desc: "Task Description",
    status: "pending",
    group_id: 1
  }
  let deleteTaskBtn;

  it("Task should be deleted from the group", async () => {
    await initDB();
    await addData('tasks', { ...testTasks });

    render(
      <MemoryRouter>
        <GroupContextProvider>
          <Home />
        </GroupContextProvider>
      </MemoryRouter>
    )

    await waitFor(async () => {
      expect(screen.getByTestId("task_table")).toBeInTheDocument();
      expect(screen.getByTestId("task-title").textContent).toBe("Task 1");

      deleteTaskBtn = screen.getByTestId("delete-task-btn");
      expect(deleteTaskBtn).toBeInTheDocument();
    });


    act(() => fireEvent.click(deleteTaskBtn));

    const taskRes = await getStoreData("tasks");
    expect(taskRes).toStrictEqual([]);

  })
})