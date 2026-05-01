import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../core/theme';
import RenderRightActions from '../ListActions/RenderRightActions';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Item, useCartStore } from '../../store/cart.store';
import { calculatePrice } from '../utils/priceCalculation';

const ItemCard = ({ item }: { item: Item }) => {
  const addQuantityToItem = useCartStore((state) => state.addQuantityToItem);
  const removeQuantityToItem = useCartStore((state) => state.removeQuantityToItem);
  const handleRemoveItemToCart = useCartStore((state) => state.handleRemoveItemToCart);
  const getTotalItem = () => {
    return calculatePrice(item.quantity, item.unitPrice);
  };

  return (
    <Swipeable
      rightThreshold={40}
      leftThreshold={40}
      renderRightActions={(_, drag) => (
        <RenderRightActions
          index={1}
          text="Supprimer"
          color="#b60000"
          drag={drag}
          handleOnPress={() => handleRemoveItemToCart(item.priceId)}
        />
      )}
      containerStyle={{ width: '100%' }}
    >
      <View style={styles.cardItem}>
        <View style={styles.containerItem}>
          <View>
            <Text style={styles.itemNameText} numberOfLines={2} lineBreakMode="tail">
              {item.name}
            </Text>
            <Text style={styles.itemUnitPriceText}>{item.unitPrice}€</Text>
          </View>
          <Text style={styles.totalText}>{getTotalItem() + '€'}</Text>
        </View>
        <View style={styles.containerQuantity}>
          <TouchableOpacity style={styles.buttonAdjustQuantity} onPress={() => removeQuantityToItem(item.priceId, 1)}>
            <Text style={styles.buttonAdjustQuantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.textQuantity}>{item.quantity}</Text>
          <TouchableOpacity style={styles.buttonAdjustQuantity} onPress={() => addQuantityToItem(item.priceId, 1)}>
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
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingLeft: 5,
    backgroundColor: '#fff',
    minHeight: 150,
  },
  containerItem: {
    flex: 1,
    gap: 20,
    paddingRight: 15,
  },
  itemNameText: {
    fontWeight: '800',
    fontSize: 18,
  },
  itemUnitPriceText: {
    fontSize: 18,
    marginTop: 5,
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
    lineHeight: 28,
    color: theme.colors.chocolat,
  },
});
export default ItemCard;
