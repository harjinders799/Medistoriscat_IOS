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
import { LegendsongsList } from "../ScreenSongs/LegendsongsList";
import { getFontSize } from "../utils"; // Responsive font utility
import OptimiseList from "./optimiseList";
import { useResponsiveMethods } from "react-native-full-responsive";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./header";

const LegendsSongsListScreen = ({ navigation }) => {
  const { rs, rw, rh } = useResponsiveMethods();

  return (
    <LinearGradient
      colors={["rgba(189,0,138,0.49)", "#bd008a"]}
      style={{ flex: 1 }}
    >
    <SafeAreaView>
<Header title={'Medistoris.cat'}/>

      <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 20 }}>
        <Text
          allowFontScaling={false}
          style={{ color: "white", fontSize: rs(20), marginLeft: 0 }}
        >
          Llegendes immersives
        </Text>
      </View>

      <FlatList
        data={LegendsongsList}
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={<View style={{ height: 1 }} />}
        renderItem={({ item, index }) => <OptimiseList item={item}
            onPress={() => navigation.navigate("LegendsSongsPlayScreens", { selectedIndex: index })}
          />}
          contentContainerStyle={{ paddingBottom: rh(20) }}

      />
      </SafeAreaView>

    </LinearGradient>
  );
};

export default LegendsSongsListScreen;

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
  medistories_cat: {
    fontSize: getFontSize(18),
    color: "#ffffff",
    fontWeight: "500",
    marginLeft: "20%",
    marginTop: 10,
  },
  artistView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  itemartist: {
    color: "white",
    fontSize: getFontSize(13),
  },
  FirstTouchebleopacity: {
    width: "100%",
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingBottom: 10,
  },
  firstView: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
