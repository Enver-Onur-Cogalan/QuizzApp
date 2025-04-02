import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { quesitons } from '../questions';

const QuizzScreen = ({ navigation }) => {
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [displayedOptions, setDisplayedOptions] = useState([]);
    const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);

    useEffect(() => {
        const shuffledQuestions = [...quesitons].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, 10);
        setQuizQuestions(selectedQuestions);
    }, []);

    useEffect(() => {
        if (quizQuestions.length === 0) return;
        setDisplayedOptions(quizQuestions[currentQuestionIndex].options);
    }, [currentQuestionIndex, quizQuestions]);


    if (quizQuestions.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Yükleniyor...</Text>
            </View>
        );
    }

    const currentQuestion = quesitons[currentQuestionIndex];

    const handleFiftyFifty = () => {
        if (usedFiftyFifty) return;
        const correct = currentQuestion.answer;
        const options = currentQuestion.options;

        const incorrectIndices = options
            .map((opt, idx) => (opt !== correct ? idx : null))
            .filter(idx => idx !== null);

        const randomIncorrectIndex =
            incorrectIndices[Math.floor(Math.random() * incorrectIndices.length)];

        const newDisplayedOption = options.map((opt, idx) => {
            if (opt === correct || idx === randomIncorrectIndex) {
                return opt;
            } else {
                return '';
            }
        });

        setDisplayedOptions(newDisplayedOption);
        setUsedFiftyFifty(true);
    };

    const handleAnswer = (selectedOption) => {
        if (selectedOption === '') return;

        if (selectedOption === currentQuestion.answer) {
            setScore(score + 1);
            if (currentQuestionIndex < quesitons.length - 1) {
                setcurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                navigation.navigate('Result', { score: score + 1, total: quizQuestions.lenght });
            }
        } else {
            navigation.navigate('Result', { score: score, total: quizQuestions.length })
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.question}>{currentQuestion.quesitons}</Text>
            <TouchableOpacity
                style={[styles.lifelineButton, usedFiftyFifty && styles.lifelineButtonDisabled]}
                onPress={handleFiftyFifty}
                disabled={usedFiftyFifty}
            >
                <Text style={styles.lifelineText}>50-50</Text>
            </TouchableOpacity>

            {displayedOptions.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.optionButton, option === '' && styles.disabledOption]}
                    onPress={() => handleAnswer(option)}
                    disabled={option === ''}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 20,
        textAlign: 'center',
    },
    question: {
        fontSize: 24,
        marginBottom: 20,
        color: 'black',
        textAlign: 'center',
    },
    lifelineButton: {
        backgroundColor: '#f39c12',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 15,
    },
    lifelineButtonDisabled: {
        opacity: 0.5,
    },
    lifelineText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    optionButton: {
        backgroundColor: '#ccc',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        padding: 20,
        borderRadius: 10,
    },
    disabledOption: {
        opacity: 0.3,
    },
    optionText: {
        fontSize: 18,
        textAlign: 'center',
    },
});


export default QuizzScreen;