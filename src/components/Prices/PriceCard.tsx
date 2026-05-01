import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Price } from '../../type/basic';
type Props = {
  price: Price;
  handleOpenSheet: (price: Price) => void;
};
const PriceCard = ({ price, handleOpenSheet }: Props) => {
  return (
    <TouchableOpacity style={styles.cardPriceContainer} onPress={() => handleOpenSheet(price)}>
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
});

export default PriceCard;
