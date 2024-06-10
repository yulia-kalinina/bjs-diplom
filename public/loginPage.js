"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    console.log(ApiConnector.parseResponseBody(response));
    if (response) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(
        "Ошибка при попытке входа в личный кабинет"
      );
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    console.log(ApiConnector.parseResponseBody(response));
    if (response) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(
        "Ошибка при регистрации в личном кабинете"
      );
    }
  });
};
