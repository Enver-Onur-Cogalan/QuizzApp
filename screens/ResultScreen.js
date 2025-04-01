import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ResultScreen = ({ route, navigation }) => {
    const { score, total } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Success</Text>
            <Text style={styles.score}>Puan: {score} / {total}</Text>
            <Button title='Try Again' onPress={() => navigation.navigate('Home')} />
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
    score: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default ResultScreen;