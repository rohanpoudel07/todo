import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AddTask from "../components/addTask/AddTask";
import { GroupContextProvider } from "../context/GroupContext";
import { initDB } from "../lib/databaseConfig";

describe("Testing Task Modal Open and Close", () => {

  it("show modal state should be updated on click ", async () => {
    await initDB();
    const setState = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(initState => [initState, setState]);
    render(<AddTask />);

    const button = screen.getByTestId("Add New Task Button");

    act(() => fireEvent.click(button));
    expect(setState).toHaveBeenCalledWith(true);

    // const modal = screen.queryByTestId("modal");
    // expect(modal).toBeInTheDocument();
  })

  it("modal should open on button click", () => {
    render(
      <GroupContextProvider>
        <AddTask />
      </GroupContextProvider>
    )
    const button = screen.getByTestId("Add New Task Button");

    act(() => fireEvent.click(button));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  })

  it("modal should close on exit click", async () => {
    render(
      <GroupContextProvider>
        <AddTask />
      </GroupContextProvider>
    )
    const button = screen.getByTestId("Add New Task Button");

    act(() => fireEvent.click(button));
    expect(screen.getByTestId("modal")).toBeInTheDocument();

    const close_button = screen.getByTestId("close_modal");
    act(() => fireEvent.click(close_button));
    expect(screen.queryByTestId("modal")).toBe(null);

  });

})