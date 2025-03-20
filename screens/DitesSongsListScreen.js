import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { DitesSongsList } from "../ScreenSongs/DitesSongList";
import { getFontSize } from "../utils"; // Responsive font utility
import { useResponsiveMethods } from "react-native-full-responsive";
import OptimiseList from "./optimiseList";
import Header from "./header";
import { SafeAreaView } from "react-native-safe-area-context";

const DitesSongsListScreen = ({ navigation }) => {
  const { rs, rw, rh } = useResponsiveMethods();

  return (
    <LinearGradient
      colors={["#9840a9", "#24056f", "#532cab"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView>

      <Header title={'Medistoris.cat'}/>

      <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 20 }}>
        <Text
          allowFontScaling={false}
          style={{ color: "white", fontSize: rs(20), marginLeft: 0 }}
        >
          Dites
        </Text>
      </View>

      <FlatList
        data={DitesSongsList}
        renderItem={({ item, index }) => <OptimiseList item={item}
          onPress={() => navigation.navigate("DitesSongsPlayScreen", { selectedIndex: index })}
        />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: rh(20) }}
       
      />
      </SafeAreaView>

    </LinearGradient>
  );
};

export default DitesSongsListScreen;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 100,
    height: 100,
    paddingBottom: 3,
  },
  image: {
    aspectRatio: 1, // Maintain square aspect ratio
    flex: 1,
    height: "100%",
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "rgba(0,0,0,0)",
    elevation: 2,
  },
  flag: {
    width: 20,
    height: 20,
    marginLeft: 5,
    borderRadius: 100,
  },
  title: {
    fontSize: getFontSize(25),
    fontWeight: "700",
    color: "#EEEEEEE",
  },
});
