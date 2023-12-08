import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../themes";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : { marginTop: 3 };

const MovieScreen = () => {
  const { params: item } = useRoute();
  const [isFavorite, toggleFavorite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);

  let movieName = "Ant-Man and the Wasp: Quantiunania";

  useEffect(() => {
    //call the movie api
  }, [item]);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 32 }}
      style={{ flex: 1, backgroundColor: "rgb(23, 23, 23)" }}
    >
      {/* back button and movie poster */}

      <View style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            position: "absolute",
            zIndex: 20,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            ...topMargin,
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
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={require("../../assets/images/moviePoster2.png")}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{
              position: "absolute",
              bottom: 0,
              width,
              height: height * 0.4,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </View>
      </View>
      {/* Movie Details */}
      <View
        style={{
          marginTop: -(height * 0.09),
          marginBottom: 16,
        }}
      >
        {/* Title */}
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
            letterSpacing: 1,
            marginVertical: 16,
          }}
        >
          {movieName}
        </Text>
        {/* Status of Release and RunTime */}
        <Text
          style={{
            color: "rgb(163, 163, 163)",
            fontWeight: 600,
            fontSize: 16,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Released • 2020 • 170 min
        </Text>

        {/* genres */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginHorizontal: 16,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: "rgb(163, 163, 163)",
              fontWeight: 600,
              fontSize: 16,
              textAlign: "center",
              marginRight: 8,
            }}
          >
            Action •
          </Text>
          <Text
            style={{
              color: "rgb(163, 163, 163)",
              fontWeight: 600,
              fontSize: 16,
              textAlign: "center",
              marginRight: 8,
            }}
          >
            Thrill •
          </Text>
          <Text
            style={{
              color: "rgb(163, 163, 163)",
              fontWeight: 600,
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Comedy
          </Text>
        </View>
        {/* Description */}
        <Text
          style={{
            color: "rgb(163, 163, 163)",
            marginHorizontal: 16,
            letterSpacing: 1,
          }}
        >
          Super-Hero partners Scott Lang and Hope van Dyne, along with with
          Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter
          Cassie Lang, find themselves exploring the Quantum Realm, interacting
          with strange new creatures and embarking on an adventure that will
          push them beyond the limits of what they thought possible.
        </Text>
      </View>

      {/* cast */}

      <Cast navigation={navigation} cast={cast} />

      {/* Similar Movies */}
      <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
    </ScrollView>
  );
};

export default MovieScreen;
