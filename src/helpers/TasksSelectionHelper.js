import { taskSelected, taskUnselected } from '../slices/selectionSlice'

export const handleSelection = (dispatch, selected, setSelected, id) => {
    if (selected === false) {
        setSelected(true)
        dispatch(taskSelected(id))
    } else {
        setSelected(false)
        dispatch(taskUnselected(id))
    }
}