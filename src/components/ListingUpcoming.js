import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import CustomCheckBox from './CustomCheckBox';

const ListingUpcoming = ({ task }) => {
    const [selected, setSelected] = useState(false);
    const [dateString, setDateString] = useState('');

    useEffect(() => {
        const today = new Date();
        const taskDate = new Date(task.ending);
        taskDate.setHours(0, 0, 0, 0); // Set the time to midnight

        const timeDifference = taskDate.getTime() - today.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        if (daysDifference === 0) {
            setDateString('Today');
        } else if (daysDifference === 1) {
            setDateString('Tomorrow');
        } else {
            setDateString(taskDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }));
        }
    }, [task]);

    return (
        <TouchableOpacity onPress={() => setSelected(!selected)}>
            <View className={`flex-row justify-between items-center p-4 mt-5`}>
                <View>
                    <Text className={`text-lg ${selected && ' font-semibold'}`}>{task.title}</Text>
                    <Text className={`${selected && ' font-semibold'}`}>
                        {task.ending.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        {'  '}
                        {dateString}
                    </Text>
                </View>
                <CustomCheckBox setSelected={setSelected} selected={selected} />
            </View>
        </TouchableOpacity>
    );
};

export default ListingUpcoming;