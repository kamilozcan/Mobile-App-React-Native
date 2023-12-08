import { Image, View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

export default function Cast({ cast, navigation }) {
  let personName = "Keanue Reeves";
  let characterName = "John Wick";

  return (
    <View style={{ marginVertical: 24 }}>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
          marginHorizontal: 16,
          marginBottom: 20,
        }}
      >
        Top Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("Person", person)}
                style={{ marginRight: 16, alignItems: "center" }}
              >
                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: 9999,
                    height: 60,
                    width: 60,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "rgb(115, 115, 115)",
                  }}
                >
                  <Image
                    source={require("../../assets/images/castImage1.png")}
                    style={{
                      borderRadius: 16,
                      height: 72,
                      width: 60,
                    }}
                  />
                </View>

                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + "..."
                    : characterName}
                </Text>
                <Text
                  style={{
                    color: " rgb(163, 163, 163)",
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  {personName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : personName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
