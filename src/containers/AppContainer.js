import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

// components , reducers, sagas
import AppPage from '../pages/AppPage';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas'

// initial store setup
function configureStore(initialState){
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const enhancers = [applyMiddleware(...middlewares)]
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  )
  // saga initialization
  sagaMiddleware.run(rootSaga)
  return store
}

const store = configureStore({});

const AppContainer = () => (
  <Provider store={store}>
    <AppPage />
  </Provider>
)

export default AppContainer
