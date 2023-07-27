import { render, screen, fireEvent } from "@testing-library/react";
import AddTaskForm from "../components/addTaskForm/AddTaskForm";
import { GroupContextProvider } from "../context/GroupContext";
import { initDB } from "../lib/databaseConfig";
import { getStoreData } from "../lib/getData";

describe("Testing Add / Edit task form", () => {

  let titleInput
  let descInput
  let status
  let submitButton

  const mocksetTasks = jest.fn();
  const handleSubmit = jest.fn();

  it("Form component should render and add to db", async () => {
    await initDB();
    render(
      <GroupContextProvider
        value={{
          currentGroup: 1,
          mocksetTasks
        }}
      >
        <AddTaskForm />
      </GroupContextProvider>
    );

    titleInput = screen.getByTestId("task title input field");
    descInput = screen.getByTestId("task description input field");
    status = screen.getByTestId("task status select field");
    submitButton = screen.getByTestId("submit-button");

    expect(screen.getByTestId("form_title")).toBeInTheDocument();
    expect(screen.getByTestId("task_form")).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(titleInput, { target: { value: "Task 1" } });
    fireEvent.change(descInput, { target: { value: "Task Desc - 1" } });
    fireEvent.change(status, { target: { value: "pending" } });

    fireEvent.click(submitButton);

    const tasksResponse = await getStoreData("tasks");

    expect(tasksResponse).toStrictEqual([{ desc: "Task Desc - 1", "group_id": 1, status: "pending", task_id: 1, title: "Task 1", }]);

  })

  it("Form Component should render and edit to db", async () => {

    const mockhandleToggleEdit = jest.fn();

    render(
      <GroupContextProvider
        value={{
          currentGroup: 1,
          mocksetTasks
        }}
      >
        <AddTaskForm edit={
          {
            task_id: 1,
            title: "Task 1",
            desc: "Task Desc - 1",
            status: "pending",
          }
        } />
      </GroupContextProvider>
    );

    titleInput = screen.getByTestId("task title input field");
    descInput = screen.getByTestId("task description input field");
    status = screen.getByTestId("task status select field");
    submitButton = screen.getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: "Task 1" } });
    fireEvent.change(descInput, { target: { value: "Task Desc - edited" } });
    fireEvent.change(status, { target: { value: "pending" } });

    fireEvent.click(submitButton);

    const tasksResponse = await getStoreData("tasks");

    expect(tasksResponse).toStrictEqual([{ desc: "Task Desc - edited", "group_id": 1, status: "pending", task_id: 1, title: "Task 1", }]);
  });

  it("Form Does not submit if input fields are missing", () => {

    render(
      <GroupContextProvider
        value={{
          currentGroup: 1,
          mocksetTasks
        }}
      >
        <AddTaskForm />
      </GroupContextProvider>
    );

    titleInput = screen.getByTestId("task title input field");
    descInput = screen.getByTestId("task description input field");
    status = screen.getByTestId("task status select field");
    submitButton = screen.getByTestId("submit-button");

    fireEvent.change(descInput, { target: { value: "Task Desc - edited" } });
    fireEvent.change(status, { target: { value: "pending" } });

    fireEvent.click(submitButton);
    expect(handleSubmit).not.toHaveBeenCalled();
  })

})