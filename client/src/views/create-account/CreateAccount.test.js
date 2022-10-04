import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CreateAccount } from './CreateAccount';

beforeEach(() => {
  render(<CreateAccount />);
});

const typeInfoCreateAccountForm = ({ userName, email, password }) => {
  const userNameInputElement = screen.getByPlaceholderText("Enter Name");
  const emailInputElement = screen.getByPlaceholderText("Enter Email");
  const passwordInputElement = screen.getByPlaceholderText("Enter Password");
  if (userName) {
    userEvent.type(userNameInputElement, userName)
  }
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  return {
    userNameInputElement,
    emailInputElement,
    passwordInputElement
  }
}

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole("button");
  userEvent.click(submitBtnElement);
}

describe('create account form testing', () => {
  test('inputs should be initially empty, before creating account', () => {
    expect(screen.getByPlaceholderText("Enter Name").value).toBe("");
    expect(screen.getByPlaceholderText("Enter Email").value).toBe("");
    expect(screen.getByPlaceholderText("Enter Password").value).toBe("");
  });

  test('name input not to be empty', () => {
    // fireEvent.change(nameInputElement, {target: {value: "Leon Suarez"}});
    const { userNameInputElement } = typeInfoCreateAccountForm({userName: "Leon Suarez"});
    clickOnSubmitButton();
    expect(userNameInputElement.value).toBe("Leon Suarez");
  });

  test('email input not to be empty', () => {
    const { userNameInputElement, emailInputElement } = typeInfoCreateAccountForm({ userName: "Leon Suarez", email: "leonsua@gmail.com" })
    clickOnSubmitButton();
    expect(userNameInputElement.value).toBe("Leon Suarez");
    expect(emailInputElement.value).toBe("leonsua@gmail.com");
  });

  test('password imput not to be empty', () => {
    const { userNameInputElement, emailInputElement, passwordInputElement } = typeInfoCreateAccountForm({ userName: "Leon Suarez", email: "leonsua@gmail.com", password: "12345678" });
    clickOnSubmitButton();
    expect(userNameInputElement.value).toBe("Leon Suarez");
    expect(emailInputElement.value).toBe("leonsua@gmail.com");
    // expect(passwordInputElement.value).toBe("12345678");
  });
});

describe('handling error message', () => {
  test('name input validation, the fied is not empty when submit', () => {
    typeInfoCreateAccountForm({ userName: '' });
    const enterUserNameMessageError = screen.getByRole('alert');
    // expect(enterUserNameMessageError).not.toBeInTheDocument();
    clickOnSubmitButton();
    expect(enterUserNameMessageError).toBeInTheDocument();
  });
});