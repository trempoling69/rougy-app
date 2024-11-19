import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { APP_URL } from '../../../config/url';

const ScanCard = () => {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  const handleCamera = () => {
    if (isPermissionGranted) {
      router.push(APP_URL.scan);
      return;
    }
    requestPermission();
  };
  return (
    <TouchableOpacity containerStyle={{ width: '45%' }} style={styles.cardPriceContainer} onPress={handleCamera}>
      <Text style={styles.textName}>Scanner</Text>
      <Text style={styles.textAmount}>.. €</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardPriceContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    width: '100%',
    height: 130,
  },
  textName: {
    textAlign: 'center',
    fontSize: 20,
  },
  textAmount: {
    fontSize: 21,
    fontWeight: '800',
  },
});

export default ScanCard;
