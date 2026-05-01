import { Pressable, StyleSheet, Text, View } from 'react-native';
import CustomBottomSheet from '../BottomSheet';
import { theme } from '../../core/theme';
import { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useValidateCart } from '../../api/cart/hook/cart.hook';
import { useCartTotal } from '../../store/cart.store';

const BottomSheetCheckout = () => {
  const total = useCartTotal();
  const modalRef = useRef<BottomSheet>(null);

  const { mutate, isError, isPending } = useValidateCart();

  const validateCart = () => {
    mutate();
  };

  return (
    <CustomBottomSheet title={`Total : ${total}€`} indicatorStyle={{ backgroundColor: 'transparent' }} ref={modalRef}>
      <View style={styles.modalContainer}>
        {isError && <Text style={styles.textError}>Une erreur est survenue :(</Text>}
        <Pressable style={styles.modalButtonContainer} onPress={validateCart} disabled={isPending}>
          <Text style={styles.modalButtonText}>{isPending ? 'Chargement...' : 'Valider'}</Text>
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
