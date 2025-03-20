import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Animated,
} from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
import Slider from '@react-native-community/slider';
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AllsongsList } from '../ScreenSongs/AllSongs';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { getFontSize } from '../utils';
import { rh, rs, useResponsiveMethods } from 'react-native-full-responsive';

const setupPlayer = async (initialIndex = 0) => {
  try {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      await TrackPlayer.reset();
    }

    await TrackPlayer.setupPlayer({
      waitForBuffer: true,
      autoUpdateMetadata: true,
      minBuffer: 5,
      maxBuffer: 15,
      playBuffer: 3
    });

    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });

    // await TrackPlayer.add(AllsongsList);
    await TrackPlayer.add([...AllsongsList.slice(initialIndex), ...AllsongsList.slice(0, initialIndex)]);

    // await new Promise(resolve => setTimeout(resolve, 5000));
    // const validIndex = Math.min(Math.max(0, initialIndex), AllsongsList.length - 1);
    //  console.log("Setting up player with index:", validIndex);
    // await TrackPlayer.skip(validIndex);
  } catch (error) {
    console.log('Error setting up player:', error);
  }
};

const togglePlayback = async (playbackState) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    if (playbackState === State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const AllSongsPlayScreen = ({ navigation, route }) => {
  const { selectedIndex = 0 } = route.params || {};
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const songSlider = useRef(null);
  const { rs, rw, rh } = useResponsiveMethods();

  const songs = [...AllsongsList.slice(selectedIndex), ...AllsongsList.slice(0, selectedIndex)]

  // Skip to the specified track
  const skipTo = async (trackId) => {
    try {
      console.log("Skipping to track:", trackId);
      // Validate track index is within bounds
      if (trackId < 0 || trackId >= songs.length) {
        console.log("Invalid track index:", trackId);
        return;
      }
      await TrackPlayer.skip(trackId);
      await TrackPlayer.play();
      setSongIndex(trackId);
    } catch (error) {
      console.log("Error in skipTo:", error);
    }
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged) {
      const currentTrack = event.nextTrack;
      if (currentTrack !== null) {
        setSongIndex(currentTrack);
        // Scroll to the new track smoothly
        songSlider.current.scrollToOffset({
          offset: currentTrack * width,
          animated: true,
        });
      } else {
        // If track is null (looped to first track), reset scroll and song index
        setSongIndex(0);
        songSlider.current.scrollToOffset({
          offset: 0,
          animated: true,
        });
      }
    }
  });

  const isInitialMount = useRef(true);

  useEffect(() => {
    let isMounted = true;

    const startPlayer = async () => {
      try {
        await TrackPlayer.reset();
        await setupPlayer(selectedIndex);

        if (isMounted) {
          // setSongIndex(selectedIndex);
          await TrackPlayer.play();

          setTimeout(() => {
            if (songSlider.current) {
              songSlider.current.scrollToOffset({
                offset: songIndex * width,
                animated: false,
              });
            }
          }, 200);
        }
      } catch (error) {
        console.log('Error starting player:', error);
      }
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
      startPlayer();
    } else {
      skipTo(0);
    }

    return () => {
      isMounted = false;
      scrollX.removeAllListeners();
    };
  }, [selectedIndex]);

  const skipToNext = async () => {
    let nextIndex = songIndex + 1;
    if (nextIndex >= songs.length) {
      nextIndex = 0;
    }
    try {
      if (songSlider.current) {
        songSlider.current.scrollToOffset({
          offset: nextIndex * width,
          animated: true,
        });
      }
    } catch (error) {
      console.log("Error skipping to next track:", error);
    }
  };

  const skipToPrevious = async () => {
    let previousIndex = songIndex - 1;
    if (previousIndex < 0) {
      previousIndex = songs.length - 1;
    }
    try {
      if (songSlider.current) {
        songSlider.current.scrollToOffset({
          offset: previousIndex * width,
          animated: true,
        });
      }
    } catch (error) {
      console.log("Error skipping to previous track:", error);
    }
  };

  // Called when the user finishes swiping; calculates new index and plays the track
  const onScrollEnd = async (event) => {
    const offset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / width);
    console.log('new index', newIndex, songIndex)
    // Only change if index is different and valid
    if (newIndex !== songIndex && newIndex >= 0 && newIndex < songs.length) {
      await skipTo(newIndex);
    }
  };

  const SongItem = React.memo(({ item }) => (
    <Animated.View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.artworkWrapper}>
        <Image source={item?.artwork} style={[styles.artworkimage,{height:rh(40)}]} resizeMode='contain' />
      </View>
    </Animated.View>
  ));

  const renderSongs = useCallback(({ item }) => <SongItem item={item} />, []);

  return (
    <LinearGradient colors={["#d9d600", "#760075"]} style={{ flex: 1}}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.goBack()}>
            <Image
              source={require("../images/back-white.webp")}
              style={{ height: rs(20), width: rs(20), marginLeft: rs(15), tintColor: 'black' }}
            />
          </TouchableOpacity>
          <View style={styles.mainContainer}>
            <View style={{ width: width }}>
              <Animated.FlatList
                ref={songSlider}
                data={songs}
                renderItem={renderSongs}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: true }
                )}
                onMomentumScrollEnd={onScrollEnd}
              />
            </View>

            <View style={{ marginTop: 5, width: width, paddingHorizontal:'5%' }}>
              <Text allowFontScaling={false} style={[styles.title, { marginBottom: rs(10),fontSize:rs(20) }]}>
                {songs && songIndex >= 0 ? songs[songIndex].title : 'Loading...'}
              </Text>
              <Text allowFontScaling={false} style={[styles.artist,{fontSize:rs(14)}]}>
                {songs && songIndex >= 0 ? songs[songIndex].artist : 'Loading...'}
              </Text>
            </View>

            <View style={{ marginTop: 25 }}>
              <Slider
                style={styles.progressContainer}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                minimumTrackTintColor="black"
                thumbTintColor="green"
                onSlidingComplete={async (value) => {
                  await TrackPlayer.seekTo(value);
                }}
              />
              <View style={styles.progressLabelContainer}>
                <Text allowFontScaling={false} style={[styles.progressLebelText,{fontSize:rs(12)}]}>
                  {new Date(progress.position * 1000).toISOString().substr(14, 5)}
                </Text>
                <Text allowFontScaling={false} style={[styles.progressLebelText,{fontSize:rs(12)}]}>
                  {new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}
                </Text>
              </View>
            </View>

            <View style={styles.musicControls}>
              <TouchableOpacity onPress={skipToPrevious} style={styles.skipButton}>
                <Ionicons name="play-skip-back-outline" size={rs(28)} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => togglePlayback(playbackState)} style={styles.playButton}>
                <Ionicons
                  name={playbackState === State.Playing ? "pause-circle" : "play-circle"}
                  size={rs(65)}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={skipToNext} style={styles.skipButton}>
                <Ionicons name="play-skip-forward-outline" size={rs(28)} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.queueIconContainer}
                onPress={() => navigation.navigate('AllSongsListScreen')}
              >
                <MaterialIcons name="queue-music" size={rs(28)} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
};

export default AllSongsPlayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkWrapper: {
    width: '100%',
    justifyContent:'center',
    alignItems:'center',
    height: rh(42),
    marginBottom: rs(25),
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    borderRadius: 15,
    overflow:'hidden'
  },
  artworkimage: {
    width: '90%',
    borderRadius: 15,
    overflow:'hidden'
  },
  title: {
    fontSize: getFontSize(25),
    fontWeight: '700',
    color: '#EEEEEEE',
  },
  artist: {
    fontSize: getFontSize(16),
    fontWeight: '500',
    color: '#EEEEEEE',
  },
  progressContainer: {
    width: width/1.1,
    height: 40,
    marginTop: 25,
  },
  progressLabelContainer: {
    width: width/1.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLebelText: {
    fontSize: getFontSize(14),
    color: 'black',
  },
  musicControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
    position: 'relative',
  },
  skipButton: {
    marginHorizontal: 20,
  },
  playButton: {
    marginHorizontal: 10,
  },
  queueIconContainer: {
    position: 'absolute',
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
