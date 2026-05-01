import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Price } from '../../type/basic';
import { usePriceSheetStore } from '../../store/priceSheet.store';
import { useCartStore } from '../../store/cart.store';
import { theme } from '../../core/theme';
type Props = {
  price: Price;
};
const PriceCard = ({ price }: Props) => {
  const openPriceSheet = usePriceSheetStore((state) => state.openPriceSheet);
  const quantity = useCartStore((state) => state.products.find((product) => product.priceId === price.id)?.quantity);

  return (
    <TouchableOpacity style={styles.cardPriceContainer} onPress={() => openPriceSheet(price.id)}>
      {quantity && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{quantity}</Text>
        </View>
      )}
      <Text style={styles.textName}>{price.name}</Text>
      <Text style={styles.textAmount}>{price.amount}€</Text>
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
  badgeContainer: {
    top: 10,
    right: 10,
    position: 'absolute',
    backgroundColor: theme.colors.red,
    height: 20,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  badgeText: {
    color: theme.colors.white,
    fontWeight: '800',
  },
});

export default PriceCard;
