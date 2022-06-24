import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CreateAccount } from './CreateAccount';

beforeEach(() => {
  render(<CreateAccount />);
});

describe('create account form testing', () => {

  test('inputs should be empty, before creating account', () => {
    expect(screen.getByPlaceholderText("Enter Name").value).toBe("");
    expect(screen.getByPlaceholderText("Enter Email").value).toBe("");
    expect(screen.getByPlaceholderText("Enter Password").value).toBe("");
  });

  test('name input not to be empty', () => {
    const nameInputElement = screen.getByPlaceholderText("Enter Name");
    const submitBtnElement = screen.getByRole("button");
    // fireEvent.change(nameInputElement, {target: {value: "Leon Suarez"}});
    userEvent.type(nameInputElement, "Leon Suarez");
    userEvent.click(submitBtnElement);
    expect(nameInputElement.value).toBe("Leon Suarez");
  });

  test('email input not to be empty', () => {

  });
});