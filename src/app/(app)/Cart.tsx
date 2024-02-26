import { StyleSheet, View } from 'react-native';
import { useCartContext } from '../../context/cartContext';
import { FlatList } from 'react-native-gesture-handler';
import ItemCard from '../../components/cart/ItemCard';
import BottomSheetCheckout from '../../components/cart/BottomSheetCheckout';

const Cart = () => {
  const { items } = useCartContext();
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%', maxHeight: '80%' }}
        data={items}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={(i) => <ItemCard item={i.item} />}
        keyExtractor={(item) => item.priceCode}
      />
      <BottomSheetCheckout />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
});

export default Cart;
