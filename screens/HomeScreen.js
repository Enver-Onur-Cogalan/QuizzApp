import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.animationContainer}>
                <LottieView
                    source={require('../assets/animations/Animation - 1743604861574.json')}
                    autoPlay
                    loop
                    style={{ width: 200, height: 200 }}
                />
            </View>

            <Text style={styles.title}>Quizz.app</Text>

            <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Quiz')}>
                <Text style={styles.buttonText}>Start Quizz</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#2f3640',
    },
    animationContainer: {
        marginBottom: 20,
    },
    startButton: {
        backgroundColor: '#e84118',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;

