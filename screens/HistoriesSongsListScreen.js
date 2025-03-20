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
import { songsList } from "../ScreenSongs/Histories";
import { getFontSize } from "../utils"; // Responsive font utility
import OptimiseList from "./optimiseList";
import { useResponsiveMethods } from "react-native-full-responsive";
import Header from "./header";
import { SafeAreaView } from "react-native-safe-area-context";

const HistoriesSongsListScreen = ({ navigation }) => {
  const { rs, rw, rh } = useResponsiveMethods();

  return (
    <LinearGradient
      colors={["#fcfe19", "#b47404", "#de5c19"]}
      style={{ flex: 1  }}
    >
      <SafeAreaView>
       <Header title={'Medistoris.cat'}/>
      <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 20 }}>
        <Text
          allowFontScaling={false}
          style={{ color: "white", fontSize: rs(20), marginLeft: 0 }}
        >
          Històries \ Historias
        </Text>
      </View>

      <FlatList
        data={songsList}
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={<View style={{ height: 1 }} />}
        renderItem={({ item, index }) => <OptimiseList item={item}
            onPress={() => navigation.navigate("HistoriesSongPlayScreen", { selectedIndex: index })}
          />}
          contentContainerStyle={{ paddingBottom: rh(20) }}
      />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HistoriesSongsListScreen;

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
    aspectRatio: 1, // Keeps height equal to width
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
