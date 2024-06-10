"use strict";

const logout = new LogoutButton();

logout.action = (func) => {
  ApiConnector.logout((response) => {
    if (response) {
      location.reload();
    }
  });
};

ApiConnector.current((responce) => {
  if (responce) {
    ProfileWidget.showProfile(responce.data);
  }
});

const ratesBoard = new RatesBoard();

function getStocks() {
  ApiConnector.getStocks((response) => {
    if (response) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

getStocks();

setTimeout(getStocks, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Баланс успешно пополнен");
    } else {
      moneyManager.setMessage(false, "Ошибка пополнения баланса");
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Баланс успешно конвертирован");
    } else {
      moneyManager.setMessage(false, "Ошибка конвертации баланса");
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Сумма успешно переведена");
    } else {
      moneyManager.setMessage(false, "Ошибка перевода средств");
    }
  });
};

const favoriteWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.data) {
    favoriteWidget.clearTable();
    favoriteWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoriteWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response) {
      favoriteWidget.clearTable();
      favoriteWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoriteWidget.setMessage(
        true,
        "Пользователь добавлен в список избранных"
      );
    } else {
      favoriteWidget.setMessage(false, "Ошибка добавления пользователя");
    }
  });
};

favoriteWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (callback) => {
    if (response) {
      favoriteWidget.clearTable();
      favoriteWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoriteWidget.setMessage(
        true,
        "Пользователь удален из списка избранных"
      );
    } else {
      favoriteWidget.setMessage(false, "Ошибка удаления пользователя");
    }
  });
};
