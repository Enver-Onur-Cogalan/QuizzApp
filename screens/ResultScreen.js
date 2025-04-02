import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const ResultScreen = ({ route, navigation }) => {
    const { score, total } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Success</Text>
            <Text style={styles.score}>Puan: {score} / {total}</Text>

            <TouchableOpacity style={styles.retryButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>

            <View style={styles.animationContainer}>
                {score === total && (
                    <LottieView
                        source={require('../assets/animations/Fire.json')}
                        autoPlay
                        loop
                        style={styles.flameAnimation}
                    />
                )}
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    score: {
        fontSize: 24,
        marginBottom: 20,
        color: '#fff',
    },
    animationContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    flameAnimation: {
        width: 800,
        height: 400,
    },
    retryButton: {
        backgroundColor: '#e84118',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    retryText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ResultScreen;