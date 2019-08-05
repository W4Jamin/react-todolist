import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_SELECT_ITEM } from './actionType'

export const getHandleInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
})

export const getHandleBtnClickAction = () => ({
    type: ADD_TODO_ITEM
})

export const getHandleItemClickAction = (index) => ({
    type: DELETE_SELECT_ITEM,
    index
})