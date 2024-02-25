import { Pressable, StyleSheet, Text, View } from 'react-native';
import CustomBottomSheet from '../BottomSheet';
import { useCartContext } from '../../context/cartContext';

const BottomSheetCheckout = () => {
  const { total } = useCartContext();
  return (
    <CustomBottomSheet title={`Total : ${total}€`} indicatorStyle={{ backgroundColor: 'transparent' }}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.modalButtonContainer}>
          <Text style={styles.modalButtonText}>Valider</Text>
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
    margin: 12,
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
});

export default BottomSheetCheckout;
