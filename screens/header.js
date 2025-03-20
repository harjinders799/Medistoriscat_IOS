import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useResponsiveMethods } from "react-native-full-responsive";
import { isTablet } from "../utils";

const Header = ({ title }) => {
    const {goBack}=useNavigation();
  const { rs, rw, rh } = useResponsiveMethods();

  return (
    <View style={{
      alignItems: "center",
      paddingHorizontal: rs(10),
      borderBottomWidth:  rs(0.2),
      paddingBottom: rs(10),
      marginTop:isTablet() ? 50 : 0
    }}>
      <TouchableOpacity 
        style={{ 
          position: 'absolute', 
          left: rs(10),
          height: rs(20),
          width: rs(20)
        }} 
        onPress={goBack}
      >
        <Image
          source={require("../images/back-white.webp")}
          style={{
            height: '100%',
            width: '100%'
          }}
          resizeMode='contain'
        />
      </TouchableOpacity>
      <Text 
        allowFontScaling={false} 
        style={{
          fontSize: rs(20),
          color: "#ffffff",
          fontWeight: "500"
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Header;