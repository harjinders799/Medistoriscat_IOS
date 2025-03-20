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
import { CanconsSongList } from "../ScreenSongs/CanconsSongList";
import { getFontSize } from "../utils"; // Updated import
import { rs, useResponsiveMethods } from "react-native-full-responsive";
import { SafeAreaView } from "react-native-safe-area-context";
import OptimiseList from "./optimiseList";
import Header from "./header";

const CanconsSongsListScreen = ({ navigation }) => {
  const { rs, rw, rh } = useResponsiveMethods(); 

  return (
    <LinearGradient
      colors={["#fe01bf", "#ca30df", "#885ce9"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
      <Header title={'Medistoris.cat'}/>
     
    
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text allowFontScaling={false} style={[styles.title,{fontSize:rs(20)}]}>
        Cançons populars Catalanes
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={CanconsSongList}
        renderItem={({ item, index }) => <OptimiseList item={item}
          onPress={() => navigation.navigate("CanConsSongsPlayScreen", { selectedIndex: index })}
        />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: rh(20) }}
        // renderItem={({ item, index }) => {
        //   return (
        //     <TouchableOpacity
        //       onPress={() =>
        //         navigation.navigate("CanConsSongsPlayScreen", {
        //           selectedIndex: index,
        //         })
        //       }
        //       style={{
        //         width: "100%",
        //         flexDirection: "row",
        //         justifyContent: "space-between",
        //         marginTop: 10,
        //         paddingBottom: 10,
        //       }}
        //       activeOpacity={1}
        //     >
        //       <View
        //         style={{
        //           flexDirection: "row",
        //           alignItems: "center",
        //           paddingLeft: 20,
        //           paddingRight: 20,
        //         }}
        //       >
        //         <View style={[styles.imageContainer, styles.shadowProp]}>
        //           <Image source={item.artwork} style={styles.image} />
        //         </View>
        //         <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        //           <Text
        //             allowFontScaling={false}
        //             style={{
        //               color: "white",
        //               fontSize: getFontSize(16),
        //               width: "100%",
        //             }}
        //             adjustsFontSizeToFit={true}
        //             numberOfLines={1}
        //           >
        //             {item.title}
        //           </Text>
        //           <View
        //             style={{
        //               flexDirection: "row",
        //               alignItems: "center",
        //               marginTop: 5,
        //             }}
        //           >
        //             <Text
        //               allowFontScaling={false}
        //               style={{
        //                 color: "white",
        //                 fontSize: getFontSize(16),
        //                 verticalAlign: "middle",
        //               }}
        //             >
        //               {item.artist}
        //             </Text>
        //           </View>
        //         </View>
        //       </View>
        //     </TouchableOpacity>
        //   );
        // }}
      />
      </SafeAreaView>

    </LinearGradient>
  );
};

export default CanconsSongsListScreen;

const styles = StyleSheet.create({
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
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 150,
    height: 150,
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
});
