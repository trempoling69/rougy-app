import { Animated, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RenderRightActions = ({ handleOnPress }: { handleOnPress: () => void }) => {
  return (
    <Animated.View style={[rightActionsStyle.deleteButton]}>
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={rightActionsStyle.deleteButtonText}>Supprimer</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
const rightActionsStyle = StyleSheet.create({
  deleteButton: {
    width: 120,
    backgroundColor: '#b60000',
    flexDirection: 'row',
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
