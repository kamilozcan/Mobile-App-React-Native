import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

import { styles} from "../themes"

const ios = Platform.OS == "ios";
const HomeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <SafeAreaView style={{}}>
        <StatusBar style={{ color: "light" }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 4,
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
      contentContainerStyle={{paddingBottom: 10}}
      >
{/* Trending movies */}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
