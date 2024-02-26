import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import RenderRightActions from '../cart/RenderRightActions';
import { StyleSheet, Text, View } from 'react-native';
import { CartHistory } from '../../app/(app)/Bill';
import { del } from '../../config/api';

const CartCard = ({ cart, fetchData }: { cart: CartHistory; fetchData: () => void }) => {
  const handleDeleteCart = async (id: string) => {
    await del(`/api/cart/${id}`);
    fetchData();
  };
  console.log(cart);

  return (
    <Swipeable renderRightActions={() => <RenderRightActions handleOnPress={() => handleDeleteCart(cart.id)} />}>
      <View style={styles.cardItem}>
        <View style={styles.containerDate}>
          <Text style={styles.dateText}>{new Date(cart.createdAt).toLocaleDateString()}</Text>
          <Text style={styles.dateText}>{new Date(cart.createdAt).toLocaleTimeString()}</Text>
        </View>
        <View>
          <Text style={styles.totalText}>{cart.total + '€'}</Text>
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
    minHeight: 90,
  },
  containerDate: {
    gap: 10,
  },
  dateText: {
    fontWeight: '500',
    fontSize: 18,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '900',
  },
});

export default CartCard;
