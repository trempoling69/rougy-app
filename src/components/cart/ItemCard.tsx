import { StyleSheet, Text, View } from 'react-native';
import { Item, useCartContext } from '../../context/cartContext';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../core/theme';
import RenderRightActions from '../ListActions/RenderRightActions';

const ItemCard = ({ item }: { item: Item }) => {
  const { addQuantityToItem, removeQuantityToItem, handleRemoveItemToCart } = useCartContext();
  const getTotalItem = () => {
    const total = parseInt(item.quantity) * parseFloat(item.unitPrice);
    return Math.round((total + Number.EPSILON) * 100) / 100;
  };
  return (
    <Swipeable
      renderRightActions={() => <RenderRightActions handleOnPress={() => handleRemoveItemToCart(item.priceCode)} />}
    >
      <View style={styles.cardItem}>
        <View style={styles.containerItem}>
          <View>
            <Text style={styles.itemNameText}>{item.name}</Text>
            <Text style={styles.itemUnitPriceText}>{item.unitPrice}€</Text>
          </View>
          <Text style={styles.totalText}>{getTotalItem() + '€'}</Text>
        </View>
        <View style={styles.containerQuantity}>
          <TouchableOpacity style={styles.buttonAdjustQuantity} onPress={() => removeQuantityToItem(item.priceCode, 1)}>
            <Text style={styles.buttonAdjustQuantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.textQuantity}>{item.quantity}</Text>
          <TouchableOpacity style={styles.buttonAdjustQuantity} onPress={() => addQuantityToItem(item.priceCode, 1)}>
            <Text style={styles.buttonAdjustQuantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  cardItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 5,
    backgroundColor: '#fff',
    minHeight: 150,
  },
  containerItem: {
    gap: 30,
  },
  itemNameText: {
    fontWeight: '800',
    fontSize: 18,
  },
  itemUnitPriceText: {
    fontSize: 18,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '900',
  },
  containerQuantity: {
    display: 'flex',
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textQuantity: {
    fontSize: 25,
  },
  buttonAdjustQuantity: {
    borderWidth: 2,
    borderColor: theme.colors.chocolat,
    borderRadius: 100,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAdjustQuantityText: {
    fontSize: 25,
    color: theme.colors.chocolat,
  },
});
export default ItemCard;
