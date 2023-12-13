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
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";
import { id } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : { marginTop: 12 };

const MovieScreen = () => {
  const navigation = useNavigation();

  const { params: item } = useRoute();
  const [isFavorite, toggleFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  // let movieName = "Ant-Man and the Wasp: Quantiunania";
  useEffect(() => {
    // console.log("itemid:   ", item.id);

    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log("movie details ", data);

    if (data) setMovie(data);
    setLoading(false);
  };

  // cast details
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);

    // console.log("creditss: ", data)

    if (data && data.cast) setCast(data.cast);
  };

  //similar movies
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);

    // console.log("similar movies: ", data);

    if (data && data.results) setSimilarMovies(data.results);
  };

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
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require("../../assets/images/moviePoster2.png")}
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
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
        )}
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
          {movie?.title}
        </Text>
        {/* Status of Release and RunTime */}

        {movie?.id ? (
          <Text
            style={{
              color: "rgb(163, 163, 163)",
              fontWeight: 600,
              fontSize: 16,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginHorizontal: 16,
            marginBottom: 16,
          }}
        >
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length;

            return (
              <Text
                key={index}
                style={{
                  color: "rgb(163, 163, 163)",
                  fontWeight: 600,
                  fontSize: 16,
                  textAlign: "center",
                  marginRight: 8,
                }}
              >
                {genre?.name} {showDot ? "•" : null}
              </Text>
            );
          })}

          {/* <Text
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
          </Text> */}
        </View>
        {/* Description */}
        <Text
          style={{
            color: "rgb(163, 163, 163)",
            marginHorizontal: 16,
            // letterSpacing: 1,
          }}
        >
          {movie?.overview}
        </Text>
      </View>

      {/* cast */}

      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* Similar Movies */}
      {
        similarMovies.length > 0 && <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovies}
      />
      }
      
    </ScrollView>
  );
};

export default MovieScreen;
