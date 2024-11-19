import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

const RenderRightActions = ({
  handleOnPress,
  index,
  drag,
  text,
  color,
}: {
  handleOnPress: () => void;
  index: number;
  drag: SharedValue<number>;
  text: string;
  color: string;
}) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 100 + (index !== 1 ? 100 * index : 0) }],
    };
  });
  return (
    <Reanimated.View style={[styleAnimation]}>
      <TouchableOpacity
        onPress={() => handleOnPress()}
        style={[rightActionsStyle.deleteButton, { backgroundColor: color }]}
      >
        <Text style={rightActionsStyle.deleteButtonText}>{text}</Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
};
const rightActionsStyle = StyleSheet.create({
  deleteButton: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  deleteButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    padding: 3,
  },
});

export default RenderRightActions;
