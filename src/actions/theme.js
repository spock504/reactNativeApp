import themeTypes from '../constants/theme'

export function onChangeTheme({ payload }) {
    return {
        type: themeTypes.CHANGE_THEME,
        payload,
    }
}