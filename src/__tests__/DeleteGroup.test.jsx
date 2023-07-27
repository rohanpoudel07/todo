import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../pages/Home/Home";
import { GroupContextProvider } from "../context/GroupContext";
import { initDB } from "../lib/databaseConfig";
import { getStoreData } from "../lib/getData";
import { addData } from "../lib/addData"
import { MemoryRouter } from "react-router-dom";

describe("Testing Group Delete functionality", () => {

  const mockSetGroups = jest.fn();
  const mockSetTasks = jest.fn();
  const testGroups = {
    group_name: "Group 1"
  }

  it("Delete Button should render in the home page and delete group", async () => {
    await initDB();
    render(
      <MemoryRouter>
        <GroupContextProvider
          value={{
            mockSetGroups,
            mockSetTasks
          }}
        >
          <Home />
        </GroupContextProvider>
      </MemoryRouter>
    );

    await addData('groups', { ...testGroups });
    const groupsResponse = await getStoreData("groups", 1);
    expect(groupsResponse).toStrictEqual({ ...testGroups, group_id: 1 })

    const deleteButton = screen.getByTestId("delete_group_btn");
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    const groupsResponseAfterDelete = await getStoreData("groups", 1);
    expect(groupsResponseAfterDelete).not.toBeDefined();

    console.log = jest.fn();

    fireEvent.click(deleteButton);
  })

})