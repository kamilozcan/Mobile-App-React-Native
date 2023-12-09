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

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : { marginVertical: 12 };

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false);
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
            color={isFavorite ? theme.background : "white"}
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
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgb(55, 65, 81)",
            borderRadius: 9999,
          }}
        >
          <View style={{}}>
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
        </View>
      </View>
    </ScrollView>
  );
}
