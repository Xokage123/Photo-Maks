import React from 'react';
import uuid from 'react-uuid'
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import photos from "./reducers/photos";
import currentPhoto from "./reducers/currentPhoto";
import Authorize from "./connection/authorize";
import Photos from "./containers/Photos";
import CurrentPhoto from "./containers/CurrentPhoto";
import Header from "./case/Header"
import Footer from "./case/Footer"
// Импортируем стили
import './GLOBAL.css';

// Создаем хранилище состояний
const rootReducer = combineReducers({photos, currentPhoto});
const store = createStore(rootReducer);
// Присваиваем номер страницы
localStorage.setItem("page", "1");

ReactDOM.render(
  <>
  <Header />
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
          <Route key={uuid()} exact path="/" component={Authorize} />
          <Route key={uuid()} exact path="/photos" component={Photos} />
          <Route key={uuid()} exact path="/photos/:id">
            <CurrentPhoto />
            <Photos />
            </Route>
          <Redirect to={"/"} />
          </Switch>
        </BrowserRouter>
      </Provider>
      <Footer />
  </>,
  document.getElementById('main')
);