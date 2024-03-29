import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { selectTheme } from '../slices/themeSlice'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Octicons'
import { getFormattedDate } from '../utils/Date'
import TaskBox from '../components/TaskBox'
import Add from '../components/Add'
import { tasks } from '../slices/tasksSlice'
import { computed } from '@preact/signals'

const Home = () => {
    const data = useSelector(tasks)
    const dark = useSelector(selectTheme)
    const navigation = useNavigation()
    const date = getFormattedDate()
    const count = computed(() => data.tasks?.length)
    const categories = computed(() => {
        let countByCategory = {}
        data.tasks?.length > 0 ? data.tasks.forEach((task) => countByCategory[task.category] = (countByCategory[task.category] || 0) + 1) : null
        delete countByCategory['undefined']
        return countByCategory
    })

    return (
        <>
            <View className={`relative flex-1 ${dark ? 'bg-slate-900' : 'bg-[rgb(252,252,252)]'}`}>
                <View className='flex-row justify-between items-start pt-8 px-8'>
                    <View>
                        <Text className='opacity-80 text-xl font-semibold tracking-wider'>Today</Text>
                        <Text className='opacity-50 mb-5'>{date}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon color={'black'} name='three-bars' size={30} />
                    </TouchableOpacity>
                </View>
                <View className='mt-4 px-8 pb-4'>
                    <Text className=" opacity-80 text-3xl font-semibold tracking-widest">Lists</Text>
                </View>
                {count.value > 0 ? (
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View className='mt-5 w-full px-8 pb-4 flex-wrap flex-row items-center justify-between gap-2'>
                            <View className='w-44 h-44'>
                                <TaskBox categoryName={'all'} itemCount={count} tasks={data.tasks} />
                            </View>
                            {categories.value &&
                                Object.entries(categories.value).map((item) => {
                                    const tasks = data.tasks.filter((task) => task.category === item[0])
                                    return (
                                        <View key={item[0]} className='w-44 h-44 mt-4'>
                                            <TaskBox
                                                categoryName={item[0]}
                                                itemCount={item[1]}
                                                tasks={tasks}
                                            />
                                        </View>
                                    )
                                })}
                        </View>
                    </ScrollView>
                ) : (
                    <View className='flex-1 mb-32 items-center justify-center'>
                        <Image
                            source={require('../../assets/note.png')}
                            style={{ width: 100, height: 100 }}
                        />
                        <Text className='text-lg font-semibold tracking-wider mt-4 opacity-50'>Lost in the labyrinth of notes?</Text>
                        <Text className='text-lg font-semibold tracking-wider opacity-50'>Let's coax them back shall we?</Text>
                    </View>
                )}
            </View>
            <Add />
        </>
    )
}

export default Home

