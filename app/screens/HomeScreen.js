import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

import { styles } from "../themes";
import TrendingMovies from "../components/TrendingMovies";

const ios = Platform.OS == "ios";

const HomeScreen = () => {

    const [trending, setTrending] = useState([1,2,3])

  return (
    <View style={{ flex: 1, backgroundColor: "#3A3B3C" }}>
      <SafeAreaView style={{}}>
        <StatusBar style={{ color: "light" }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text
            style={{
              color: "white",
              fontSize: 30,
              lineHeight: 36,
              fontWeight: "bold",
            }}
          >
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Trending movies */}
        <TrendingMovies data={trending} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
