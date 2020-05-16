import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [quotes, setQuotes] = useState([]);
  async function handleButtonPress() {
    try {
      let response = await fetch("https://type.fit/api/quotes");
      let json = await response.json();
      setQuotes(json);
    } catch (error) {
      console.error(error);
    }
  }
  function renderQuotes() {
    const quotesArray = [];
    if (quotes.length > 0) {
      for (let i = 0; i < 30; i++) {
        quotesArray.push(
          <Text style={styles.quoteText} key={i}>
            {quotes[i].text}
          </Text>
        );
      }
    }
    return quotesArray;
  }
  return (
    <View style={styles.container}>
      <Button title="Select!" onPress={handleButtonPress} />
      <ScrollView>
        <View>{renderQuotes()}</View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  quoteText: {
    padding: 10,
    fontFamily: "Times New Roman",
    fontSize: 20,
  },
});
