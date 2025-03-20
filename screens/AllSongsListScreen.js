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
import { AllsongsList } from "../ScreenSongs/AllSongs";
import { getFontSize } from "../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { rs, useResponsiveMethods } from "react-native-full-responsive";
import OptimiseList from "./optimiseList";
import Header from "./header";

const AllSongsListScreen = ({ navigation }) => {
  const { rs, rw, rh } = useResponsiveMethods();

  return (
    <LinearGradient colors={["#b88c08", "#60045f"]} style={styles.gradient}>
      <SafeAreaView>
      <Header title={'Medistoris.cat'}/>

        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={[styles.title, { fontSize: rs(20) }]}>
            Àudios
          </Text>
        </View>

        <FlatList
          data={AllsongsList}
          renderItem={({ item, index }) => <OptimiseList item={item}
            onPress={() => navigation.navigate("AllSongsPlayScreen", { selectedIndex: index })}
          />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: rh(20) }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    // paddingBottom: 20,
  },
  headerContainer: {
    // flexDirection: "row",
    alignItems: "center",

    // marginTop: Platform.OS === "ios" ? 50 : 50,
    paddingHorizontal: 10,
    borderBottomWidth: rs(0.2),
    paddingBottom: 10,
  },
  backImage: {
    height: getFontSize(20),
    width: getFontSize(20),
  },
  headerText: {
    fontSize: getFontSize(18),
    color: "#ffffff",
    fontWeight: "500",
    // marginLeft: "20%",
    // marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    paddingLeft: 20,
    marginTop: 20,
  },
  title: {
    color: "white",
    marginLeft: 5,
    fontSize: getFontSize(24),
  },
  itemContainer: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: getFontSize(100),
    height: getFontSize(100),
    paddingBottom: 3,
  },
  image: {
    aspectRatio: 1,
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
  artistText: {
    color: "white",
    fontSize: getFontSize(15),
    verticalAlign: "middle",
  },
});

export default AllSongsListScreen;
