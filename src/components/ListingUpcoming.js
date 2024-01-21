import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

export default function ListingUpcoming({ tasks }) {
    return (
        <FlatList
            data={tasks}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.title}</Text>
                </View>
            )}
            keyExtractor={(item) => item.id.toString()}
        />
    )
}

const styles = StyleSheet.create({})