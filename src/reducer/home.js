import homeTypes from '../constants/home'
// 初始值
const initState = {
    testCount: 0
}

export default (state = initState, action) => {
    switch (action.type) {
        case homeTypes.ACTION_TEST:
            return {
                ...state,
                testCount: 1
            }
        default:
            return state
    }
}