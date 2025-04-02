import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { quesitons } from '../questions';
import { Audio } from 'expo-av';

const QuizzScreen = ({ navigation }) => {
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [displayedOptions, setDisplayedOptions] = useState([]);
    const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null);
    const [bgMusic, setBgMusic] = useState(null);

    const shakeAnim = useState(new Animated.Value(0))[0];
    const blinkAnim = useState(new Animated.Value(1))[0];

    useEffect(() => {
        const shuffled = [...quesitons].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        setQuizQuestions(selected);
    }, []);

    useEffect(() => {
        if (quizQuestions.length === 0 || currentQuestionIndex >= quizQuestions.length) return;
        setDisplayedOptions(quizQuestions[currentQuestionIndex].options);
        shakeAnim.setValue(0);
        blinkAnim.setValue(1);
        setSelectedOptionIndex(null);
        setAnswerStatus(null);
    }, [currentQuestionIndex, quizQuestions]);

    useEffect(() => {
        async function loadBgMusic() {
            try {
                const { sound } = await Audio.Sound.createAsync(
                    require('../assets/sounds/tema müziği.mp3'),
                    { isLooping: true }
                );
                setBgMusic(sound);
                await sound.playAsync();
            } catch (error) {
                console.log('Error loading background music', error);
            }
        }
        loadBgMusic();

        return () => {
            if (bgMusic) {
                bgMusic.unloadAsync();
            }
        };
    }, []);


    useEffect(() => {
        async function resumeBgMusic() {
            try {
                const status = await bgMusic.getStatusAsync();
                if (!status.isPlaying) {
                    await bgMusic.setPositionAsync(0);
                    await bgMusic.playAsync();
                }
            } catch (error) {
                console.log('Error resuming bgMusic:', error);
            }
        }
        if (bgMusic && quizQuestions.length > 0 && currentQuestionIndex < quizQuestions.length) {
            bgMusic.setPositionAsync(0)
                .then(() => bgMusic.playAsync())
                .catch(error => console.log('Error resuming bgMusic:', error));
        }
    }, [currentQuestionIndex, bgMusic, quizQuestions.length]);


    if (quizQuestions.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Yükleniyor...</Text>
            </View>
        );
    }


    const currentQuestion = quizQuestions[currentQuestionIndex];

    const playSound = async (isCorrect) => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(
                isCorrect
                    ? require('../assets/sounds/doğru cevap.mp3')
                    : require('../assets/sounds/yanlış cevap.mp3')
            );
            await soundObject.playAsync();
        } catch (error) {
            console.log('Error playing sound', error)
        }
    };

    const handleFiftyFifty = () => {
        if (usedFiftyFifty) return;
        const correct = currentQuestion.answer;
        const options = currentQuestion.options;
        const incorrectIndices = options
            .map((opt, idx) => (opt !== correct ? idx : null))
            .filter(idx => idx !== null);
        const randomIncorrectIndex =
            incorrectIndices[Math.floor(Math.random() * incorrectIndices.length)];
        const newDisplayedOptions = options.map((opt, idx) => {
            if (opt === correct || idx === randomIncorrectIndex) {
                return opt;
            } else {
                return '';
            }
        });
        setDisplayedOptions(newDisplayedOptions);
        setUsedFiftyFifty(true);
    };

    const handleAnswer = (selectedOption, index) => {
        if (selectedOption === '' || selectedOptionIndex !== null) return;
        const isCorrect = selectedOption === currentQuestion.answer;
        setSelectedOptionIndex(index);
        setAnswerStatus(isCorrect ? 'correct' : 'wrong');

        if (bgMusic) {
            bgMusic.pauseAsync();
        }

        Animated.sequence([
            Animated.timing(shakeAnim, {
                toValue: -10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start(() => {
            const blinkAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(blinkAnim, {
                        toValue: 0.5,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(blinkAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
                { iterations: 3 }
            );

            blinkAnimation.start();
            playSound(isCorrect);
            setTimeout(() => {
                if (isCorrect) {
                    if (currentQuestionIndex < quizQuestions.length - 1) {
                        setScore(score + 1);
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                    } else {
                        navigation.navigate('Result', {
                            score: score + 1,
                            total: quizQuestions.length,
                        });
                    }
                } else {
                    navigation.navigate('Result', {
                        score: score,
                        total: quizQuestions.length,
                    });
                }
            }, 3000);
        });
    };



    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.question, { opacity: 1 }]}>
                {currentQuestion.quesiton}
            </Animated.Text>

            <TouchableOpacity
                style={[styles.lifelineButton, usedFiftyFifty && styles.lifelineButtonDisabled,]}
                onPress={handleFiftyFifty}
                disabled={usedFiftyFifty}
            >
                <Text style={styles.lifelineText}>50-50</Text>
            </TouchableOpacity>

            {displayedOptions.map((option, index) => {
                let backgroundColor = '#ccc';

                if (answerStatus !== null && option !== '') {
                    if (answerStatus === 'correct') {
                        if (index === selectedOptionIndex) {
                            backgroundColor = 'green';
                        }
                    } else if (answerStatus === 'wrong') {
                        if (index === selectedOptionIndex) {
                            backgroundColor = 'red';
                        } else if (option === currentQuestion.answer) {
                            backgroundColor = 'green';
                        }
                    }
                }

                if (index === selectedOptionIndex) {
                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.optionButton,
                                option === '' && styles.disabledOption,
                                {
                                    transform: [{ translateX: shakeAnim }],
                                    opacity: blinkAnim,
                                    backgroundColor: backgroundColor,
                                },
                            ]}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </Animated.View>
                    );
                } else {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionButton,
                                option === '' && styles.disabledOption,
                                { backgroundColor: backgroundColor },
                            ]}
                            onPress={() => handleAnswer(option, index)}
                            disabled={selectedOptionIndex !== null || option === ''}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    );
                }
            })}
        </View>
    );
};



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