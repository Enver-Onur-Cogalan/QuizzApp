import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { quesitons } from '../questions';

const QuizzScreen = ({ navigation }) => {
    const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    const currentQuestion = quesitons[currentQuestionIndex];

    const handleAnswer = (selectedOption) => {
        if (selectedOption === currentQuestion.answer) {
            setScore(score + 1);
        }
        if (currentQuestionIndex < quesitons.length - 1) {
            setcurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            navigation.navigate('Result', { score: score + (selectedOption === currentQuestion.answer ? 1 : 0), total: quesitons.lenght });
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>{currentQuestion.quesitons}</Text>
            </View>
            <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) => (
                    <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(option)}>
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    questionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    question: {
        fontSize: 24,
        marginBottom: 20,
        color: 'black'
    },
    optionsContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    optionButton: {
        backgroundColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
    optionText: {
        fontSize: 18,
    },
});


export default QuizzScreen;