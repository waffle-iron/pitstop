export const LOAD_USER_NAME = 'LOAD_USER_NAME';

export const CHANGE_INFO = 'CHANGE_INFO';
export const changeInfo = (info) => {
    return {
        type: CHANGE_INFO,
        info
    }
}
