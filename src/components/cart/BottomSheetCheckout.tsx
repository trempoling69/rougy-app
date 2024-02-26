import { Pressable, StyleSheet, Text, View } from 'react-native';
import CustomBottomSheet from '../BottomSheet';
import { useCartContext } from '../../context/cartContext';
import { theme } from '../../core/theme';

const BottomSheetCheckout = () => {
  const { total, validateCart, validateCartError, validateCartLoading } = useCartContext();
  return (
    <CustomBottomSheet title={`Total : ${total}€`} indicatorStyle={{ backgroundColor: 'transparent' }}>
      <View style={styles.modalContainer}>
        {validateCartError && <Text style={styles.textError}>Une erreur est survenue :(</Text>}
        <Pressable style={styles.modalButtonContainer} onPress={validateCart} disabled={validateCartLoading}>
          <Text style={styles.modalButtonText}>{validateCartLoading ? 'Chargement...' : 'Valider'}</Text>
        </Pressable>
      </View>
    </CustomBottomSheet>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  modalButtonContainer: {
    width: '80%',
    padding: 12,
    margin: 7,
    borderRadius: 12,
    backgroundColor: '#80f',
  },
  modalButtonText: {
    margin: 5,
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
  },
  textError: {
    color: theme.colors.red,
    fontWeight: '800',
  },
});

export default BottomSheetCheckout;
