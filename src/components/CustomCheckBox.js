import React, { useState, useEffect } from 'react'
import Checkbox from 'expo-checkbox'

export default function CustomCheckBox({ setSelected, selected }) {
    return (
        <Checkbox
            value={selected}
            onValueChange={() => setSelected(!selected)}
        />
    )
}