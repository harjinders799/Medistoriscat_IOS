import React, { memo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useResponsiveMethods } from "react-native-full-responsive";

const OptimiseList = memo(({ onPress, item }) => {
  const { rs } = useResponsiveMethods();

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        // height: rs(100),
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: rs(15),
        marginVertical: rs(10)
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <View style={[{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: rs(10),
          width: rs(80),
          height: rs(80),
          paddingBottom: rs(3)
        }, {
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: rs(4) },
          shadowOpacity: 0.2,
          shadowRadius: 1,
          backgroundColor: "transparent",
          elevation: 2
        }]}>
          <Image 
            source={item.artwork} 
            style={{
              width: "100%",
              height: "100%",
              borderRadius: rs(10)
            }} 
            resizeMode="cover"
            loading="lazy"
          />
        </View>
        <View style={{ paddingHorizontal: rs(10), flex: 1, justifyContent: "center" }}>
          <Text
            allowFontScaling={false}
            style={{
              color: "white",
              width: "100%",
              fontWeight: "500",
              fontSize: rs(16)
            }}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: rs(5) }}>
            <Text 
              allowFontScaling={false} 
              style={{
                color: "white",
                verticalAlign: "middle",
                fontSize: rs(13)
              }}
            >
              {item.artist}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

OptimiseList.displayName = 'OptimiseList';

export default OptimiseList;