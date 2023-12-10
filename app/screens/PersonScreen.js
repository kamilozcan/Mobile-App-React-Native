import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { styles, theme } from "../themes";
import MovieList from "../components/MovieList";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : { marginVertical: 12 };

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4]);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={{ flex: 1, backgroundColor: "rgb(23, 23, 23)" }}
    >
      {/* Back Button */}
      <SafeAreaView
        style={{
          zIndex: 20,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          ...verticalMargin,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.background,
            {
              borderRadius: 12,
              padding: 5,
            },
          ]}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
          <HeartIcon
            size={35}
            strokeWidth={2.5}
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Person Details */}

      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View
            style={{
              alignItems: "center",
              borderRadius: 9999,
              overflow: "hidden",
              borderWidth: 2,
              borderColor: "rgb(115, 115, 115)",
              height: 320,
              width: 320,
            }}
          >
            <Image
              source={require("../../assets/images/castImage2.png")}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text
            style={{
              fontSize: 30,
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Keanu Reeves
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "rgb(115, 115, 115)",
              textAlign: "center",
            }}
          >
            London, United Kingdom
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 12,
            marginTop: 24,
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgb(55, 65, 81)",
            borderRadius: 9999,
          }}
        >
          <View
            style={{
              borderRightWidth: 2,
              borderRightColor: "rgb(163, 163, 163)",
              paddingHorizontal: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: 600,
              }}
            >
              Gender
            </Text>
            <Text
              style={{
                color: "rgb(212, 212, 212)",
                fontWeight: 600,
              }}
            >
              Male
            </Text>
          </View>
          <View
            style={{
              borderRightWidth: 2,
              borderRightColor: "rgb(163, 163, 163)",
              paddingHorizontal: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: 600,
              }}
            >
              Birthday
            </Text>
            <Text
              style={{
                color: "rgb(212, 212, 212)",
                fontWeight: 600,
              }}
            >
              01-01-1972
            </Text>
          </View>
          <View
            style={{
              borderRightWidth: 2,
              borderRightColor: "rgb(163, 163, 163)",
              paddingHorizontal: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: 600,
              }}
            >
              Known for
            </Text>
            <Text
              style={{
                color: "rgb(212, 212, 212)",
                fontWeight: 600,
              }}
            >
              Acting
            </Text>
          </View>
          <View
            style={{
              borderRightColor: "rgb(163, 163, 163)",
              paddingHorizontal: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: 600,
              }}
            >
              Popularity
            </Text>
            <Text
              style={{
                color: "rgb(212, 212, 212)",
                fontWeight: 600,
              }}
            >
              80
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 24,
            marginHorizontal: 16,
            paddingTop: 8,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Biography
          </Text>
          <Text
            style={{
              color: "rgb(163, 163, 163)",
              // letterSpacing: 1,
              marginBottom: 8,
            }}
          >
            Keanu Charles Reeves is a Canadian actor. Reeves is known for his
            roles in Bill & Ted's Excellent Adventure, Speed, Point Break, and
            The Matrix franchise as Neo. He has collaborated with major
            directors such as Stephen Frears (in the 1988 period drama Dangerous
            Liaisons); Gus Van Sant (in the 1991 independent film My Own Private
            Idaho); and Bernardo Bertolucci (in the 1993 film Little Buddha).
            Referring to his 1991 film releases, The New York Times' critic,
            Janet Maslin, praised Reeves' versatility, saying that he "displays
            considerable discipline and range. He moves easily between the
            buttoned-down demeanor that suits a police procedural story and the
            loose-jointed manner of his comic roles." A repeated theme in roles
            he has portrayed is that of saving the world, including the
            characters of Ted Logan, Buddha, Neo, Johnny Mnemonic, John
            Constantine and Klaatu.
          </Text>
        </View>

        {/* Movies List */}

        {<MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />}
      </View>
    </ScrollView>
  );
}
