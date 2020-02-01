import homeTypes from '../constants/home'

export function actionTest({ payload, callback = null }) {
    return {
        type: homeTypes.ACTION_TEST,
        payload,
        callback,
    }
}