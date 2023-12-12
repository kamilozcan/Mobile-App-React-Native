import { Image, View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { fallbackPersonImage, image185 } from "../api/moviedb";
import { id } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";

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
                    // source={require("../../assets/images/castImage1.png")}
                    source={{
                      uri:
                        image185(person?.profile_path) || fallbackPersonImage,
                    }}
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
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text
                  style={{
                    color: " rgb(163, 163, 163)",
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  {person?.name.length > 10
                    ? person?.name.slice(0, 10) + "..."
                    : person?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
