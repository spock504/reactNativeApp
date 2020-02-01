
import {
    createStore,
    applyMiddleware,
} from 'redux';
import {
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import appReducer from '../reducer/index'

const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
);

function logger({ getState }) {
    return (next) => (action) => {
        console.log('1. will dispatch ---', action) // 可以看到路由的信息
        // 调用 middleware 链中下一个 middleware 的 dispatch。
        let returnValue = next(action)
        // console.log('2. state after dispatch ---', getState())
        // 一般会是 action 本身，除非
        // 后面的 middleware 修改了它。
        return returnValue
    }
}

const middlewares = [
    middleware,
    logger,
]

const store = createStore(
    appReducer,
    applyMiddleware(...middlewares),
);

export default store