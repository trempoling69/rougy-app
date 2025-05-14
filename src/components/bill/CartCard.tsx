import RenderRightActions from '../ListActions/RenderRightActions';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { del } from '../../config/api';
import { router } from 'expo-router';
import { Bill } from '../../context/billContext';
import { memo } from 'react';
import { useCartContext } from '../../context/cartContext';
import { APP_URL } from '../../config/url';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

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
      router.push(APP_URL.BillById(cart.id));
    };
    return (
      <Swipeable
        rightThreshold={40}
        leftThreshold={40}
        containerStyle={{ width: '100%' }}
        renderRightActions={(_, drag) => (
          <>
            <RenderRightActions
              index={1}
              text="Supprimer"
              color="#b60000"
              drag={drag}
              handleOnPress={() => handleDeleteCart(cart.id)}
            />
            <RenderRightActions
              index={2}
              text="Récupérer"
              color="#2a9134"
              drag={drag}
              handleOnPress={() => handleResumeCart()}
            />
          </>
        )}
      >
        <View style={styles.cardItem}>
          <TouchableOpacity style={styles.cardItem} onPress={viewCart}>
            <View style={styles.containerDate}>
              <Text style={styles.dateText}>{new Date(cart.createdAt).toLocaleDateString()}</Text>
              <Text style={styles.dateText}>{new Date(cart.createdAt).toLocaleTimeString()}</Text>
            </View>
            <View>
              <Text style={styles.totalText}>{cart.total + '€'}</Text>
            </View>
          </TouchableOpacity>
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
