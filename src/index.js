import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import photos from "./reducers/photos";
import currentPhoto from "./reducers/currentPhoto";
import Authorize from "./connection/authorize";
import Photos from "./containers/Photos";
import CurrentPhoto from "./containers/CurrentPhoto";
// Импортируем стили
import './GLOBAL.css';

// Создаем хранилище состояний
const rootReducer = combineReducers({photos, currentPhoto});
const store = createStore(rootReducer);
// Присваиваем номер страницы
localStorage.setItem("page", "1");

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Authorize} />
          <Route exact path="/photos" component={Photos} />
          <Route exact path="/photos/:id" component={CurrentPhoto} />
          <Redirect to={"/"} />
        </Switch>
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);