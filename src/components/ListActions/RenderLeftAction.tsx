import { Animated, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  handleOnPress: () => void;
  secondHandleOnPress?: () => void;
};
const RenderLeftActions = ({ handleOnPress, secondHandleOnPress }: Props) => {
  return (
    <>
      <Animated.View style={[rightActionsStyle.continueButton]}>
        <TouchableOpacity onPress={handleOnPress}>
          <Text style={rightActionsStyle.continueButtonText}>Récupérer</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[rightActionsStyle.seeButton]}>
        <TouchableOpacity onPress={secondHandleOnPress}>
          <Text style={rightActionsStyle.seeButtonText}>Voir</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};
const rightActionsStyle = StyleSheet.create({
  continueButton: {
    width: 120,
    backgroundColor: '#2a9134',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  continueButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    padding: 3,
  },
  seeButton: {
    width: 120,
    backgroundColor: '#613dc1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  seeButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    padding: 3,
  },
});

export default RenderLeftActions;
