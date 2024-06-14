"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    if (response.success === true) {
      location.reload();
    } else {
      throw new Error(
        userForm.setLoginErrorMessage("Неверные логин или пароль")
      );
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.success === true) {
      location.reload();
    } else {
      throw new Error(
        userForm.setRegisterErrorMessage("Ошибка при регистрации")
      );
    }
  });
};
