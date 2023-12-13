import React, { useEffect, useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";

import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { styles, theme } from "../themes";
import MovieList from "../components/MovieList";
import {
  fallbackPersonImage,
  fetchMovieCredits,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : { marginVertical: 12 };

export default function PersonScreen() {
  const navigation = useNavigation();

  const { params: item } = useRoute();

  const [isFavorite, toggleFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true);
    // console.log("person: ", item);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);

    if (data) setPerson(data);
    setLoading(false);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);

    // console.log("person Movies", data)

    if (data && data.cast) setPersonMovies(data.cast)

  };

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
              // source={require("../../assets/images/castImage2.png")}
              source={{
                uri: image342(person?.profile_path) || fallbackPersonImage,
              }}
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
            {person?.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "rgb(115, 115, 115)",
              textAlign: "center",
            }}
          >
            {person?.place_of_birth}
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
              {person?.gender == 1 ? "Female" : "Male"}
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
              {person?.birthday}
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
              {person?.known_for_department}
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
              {person?.popularity?.toFixed(2)} %
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
            {person?.biography || "N/A" }
          </Text>
        </View>

        {/* Movies List */}

        {<MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />}
      </View>
    </ScrollView>
  );
}
