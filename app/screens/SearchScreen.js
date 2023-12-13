import { useNavigation } from "@react-navigation/native";
import { value } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import {
  Image,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  let movieName = "Ant-Man and the Wasp: Quantiunania";

  const handleSearch = (value) => {
    // console.log("value", value);
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        // console.log("got movies", data);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={{ backgroundColor: "rgb(23,23,23)", flex: 1 }}>
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          borderWidth: 1,
          borderColor: "rgb(115, 115, 115)",
          borderRadius: 9999,
        }}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={{
            paddingBottom: 4,
            paddingLeft: 24,
            flex: 1,
            fontSize: 16,
            fontWeight: "600",
            color: "white",
            // letterSpacing: 1,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            margin: 4,
            padding: 12,
            backgroundColor: "rgb(115, 115, 115)",
            borderRadius: 9999,
          }}
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* Results */}
      {results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={{
            paddingTop: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              marginLeft: 4,
            }}
          >
            Results ({results.length})
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View
                    style={{
                      paddingVertical: 8,
                      marginBottom: 16,
                    }}
                  >
                    <Image
                      // source={require("../../assets/images/moviePoster2.png")}
                      source={{
                        uri: image185(item?.poster_path) || fallbackMoviePoster,
                      }}
                      style={{
                        borderRadius: 24,
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                    />
                    <Text
                      style={{
                        color: "rgb(163, 163, 163)",
                        marginLeft: 4,
                      }}
                    >
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/images/movieTime.png")}
            style={{
              height: 480,
              width: 480,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
