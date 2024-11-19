import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
  handleOnPress: () => void;
  prog: SharedValue<number>;
  drag: SharedValue<number>;
};
const RenderLeftActions = ({ handleOnPress, prog, drag }: Props) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 300 }],
    };
  });

  return (
    <Reanimated.View style={[styleAnimation]}>
      <Pressable onPress={() => handleOnPress()} style={rightActionsStyle.continueButton}>
        <Text style={rightActionsStyle.continueButtonText}>Récupérer</Text>
      </Pressable>
    </Reanimated.View>
  );
};
const rightActionsStyle = StyleSheet.create({
  continueButton: {
    width: 100,
    backgroundColor: '#2a9134',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  continueButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
  },
});

export default RenderLeftActions;
