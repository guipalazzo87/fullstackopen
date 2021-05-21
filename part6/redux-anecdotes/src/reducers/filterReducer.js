const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SEARCH':
            return action.data
        default:
            return state
    }
}
export default reducer

export const filterChange = (search) => {
    return {
        type: 'SEARCH',
        data: search
    }
}