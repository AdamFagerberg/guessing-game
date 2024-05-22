import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useEffect, useState } from "react";

export default function App() {
  const [number, setNumber] = useState();
  const [inputGuess, setInputGuess] = useState();
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    randomNumberGenerator();
  }, []);

  function randomNumberGenerator() {
    const number = Math.floor(Math.random() * 10) + 1;
    setNumber(number);
  }

  function handleInputChange(text) {
    const numericValue = text.replace(/[^0-9]/g, "");
    setInputGuess(numericValue);
  }

  function handleClick() {
    if (inputGuess == number) {
      setIsCorrect(true);
    } else if (inputGuess > number) {
      setFeedback("Too High!");
    } else {
      setFeedback("Too Low!");
    }
  }

  function handleNewRound() {
    randomNumberGenerator();
    setIsCorrect(false);
  }

  useEffect(() => {
    setTimeout(() => {
      setFeedback("");
    }, "1000");
  }, [feedback]);

  return (
    <View style={styles.container}>
      <View style={styles.feedback}>
        {isCorrect && <Text style={styles.correctText}>Correct!</Text>}
        <Text style={styles.feedbackText}>{feedback}</Text>
      </View>

      <Text style={styles.title}>Guess a number between 1-10</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={handleInputChange}
        value={inputGuess}
        placeholder="Pick a number"
      />

      {!isCorrect && (
        <Pressable
          onPress={handleClick}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#9ed4f7" : "#3498db",
            },
            styles.button,
          ]}
        >
          <Text>Guess!</Text>
        </Pressable>
      )}

      {isCorrect && (
        <Pressable
          onPress={handleNewRound}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#9ed4f7" : "#3498db",
            },
            styles.button,
          ]}
        >
          <Text>Play again!</Text>
        </Pressable>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    margin: 20,
    fontWeight: "700",
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 2,
    borderColor: "#3498db",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: "#333",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  button: {
    borderRadius: 10,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  feedback: {
    margin: 0,
    height: 20,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: "700",
    color: "red",
  },
  correctText: {
    fontSize: 18,
    fontWeight: "700",
    color: "green",
  },
});
