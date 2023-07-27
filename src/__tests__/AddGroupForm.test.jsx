import { render, screen, fireEvent } from "@testing-library/react";
import AddGroup from "../pages/addGroup/AddGroup";
import { GroupContextProvider } from "../context/GroupContext";
import { initDB } from "../lib/databaseConfig";
import { getStoreData } from "../lib/getData";
import { MemoryRouter } from "react-router-dom";

describe("Testing Adding Group to the database", () => {

  const mocksetGroups = jest.fn();
  const mockOnSubmit = jest.fn();
  let GroupNameInput;
  let SubmitFormButton;

  it("Form should render and add to db", async () => {
    await initDB();
    render(
      <MemoryRouter>
        <GroupContextProvider
          value={{
            mocksetGroups
          }}
        >
          <AddGroup />
        </GroupContextProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Add Group")).toBeInTheDocument();
    expect(screen.getByTestId("back_btn")).toBeInTheDocument();
    expect(screen.getByTestId("add_group_form")).toBeInTheDocument();

    GroupNameInput = screen.getByTestId('group_name_input_field');
    SubmitFormButton = screen.getByTestId('submit');

    fireEvent.change(GroupNameInput, { target: { value: "Group 1" } });
    fireEvent.click(SubmitFormButton);

    const groupsResponse = await getStoreData("groups");

    expect(groupsResponse).toStrictEqual([{ group_id: 1, group_name: "Group 1" }]);
  });

  it("Form Should not submit if input field is empty", async () => {
    render(
      <MemoryRouter>
        <GroupContextProvider
          value={{
            mocksetGroups
          }}
        >
          <AddGroup />
        </GroupContextProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Add Group")).toBeInTheDocument();
    expect(screen.getByTestId("back_btn")).toBeInTheDocument();
    expect(screen.getByTestId("add_group_form")).toBeInTheDocument();

    GroupNameInput = screen.getByTestId('group_name_input_field');
    SubmitFormButton = screen.getByTestId('submit');

    fireEvent.click(SubmitFormButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  })
})