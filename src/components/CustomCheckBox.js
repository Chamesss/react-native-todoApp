import Checkbox from 'expo-checkbox'
import { useDispatch } from 'react-redux'

export default function CustomCheckBox({ handleSelection, selected, setSelected, id }) {
    const dispatch = useDispatch()
    return (
        <Checkbox
            value={selected}
            onValueChange={() => handleSelection(dispatch, selected, setSelected, id)}
        />
    )
}