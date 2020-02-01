import themeTypes from '../constants/theme'
// 初始值
const initState = {
    theme: ''
}

export default (state = initState, action) => {
    switch (action.type) {
        case themeTypes.CHANGE_THEME:
            return {
                ...state,
                theme: action.payload
            }
        default:
            return state
    }
}