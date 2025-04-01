import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quizz.app</Text>
            <Button
                title='Start Quizz'
                onPress={() => navigation.navigate('Quiz')}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
    },
});

export default HomeScreen;