import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import RenderRightActions from '../ListActions/RenderRightActions';
import { StyleSheet, Text, View } from 'react-native';
import { del } from '../../config/api';
import RenderLeftActions from '../ListActions/RenderLeftAction';
import { router } from 'expo-router';
import { Bill } from '../../context/billContext';
import { memo } from 'react';
import { useCartContext } from '../../context/cartContext';

const CartCard = memo(
  ({ cart, fetchData }: { cart: Bill; fetchData: () => void }) => {
    const { retrieveCart } = useCartContext();

    const handleDeleteCart = async (id: string) => {
      await del(`/api/cart/${id}`);
      fetchData();
    };
    const handleResumeCart = async () => {
      retrieveCart(cart.products, cart.total, cart.id);
    };

    const viewCart = () => {
      router.push(`/Bill/${cart.id}`);
    };
    return (
      <Swipeable
        renderRightActions={() => <RenderRightActions handleOnPress={() => handleDeleteCart(cart.id)} />}
        renderLeftActions={() => <RenderLeftActions handleOnPress={handleResumeCart} secondHandleOnPress={viewCart} />}
      >
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
  },
  (prevProps, nextProps) => {
    return prevProps.cart.total === nextProps.cart.total;
  }
);
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
