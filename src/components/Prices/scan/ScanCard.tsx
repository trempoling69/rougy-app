import { StyleSheet, Text, TouchableOpacity } from 'react-native';
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
    <TouchableOpacity style={styles.cardPriceContainer} onPress={handleCamera}>
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
    width: '45%',
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
