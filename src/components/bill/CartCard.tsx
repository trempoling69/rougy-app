import RenderRightActions from '../ListActions/RenderRightActions';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { del } from '../../config/api';
import { router } from 'expo-router';
import { memo } from 'react';
import { APP_URL } from '../../config/url';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useQueryClient } from '@tanstack/react-query';
import { billQueryKeys } from '../../api/bill/queryKey/bill.key';
import { Bill } from '../../type/basic';
import { useCartStore } from '../../store/cart.store';

const CartCard = memo(
  ({ cart, params }: { cart: Bill; params: { start: string; end?: string } }) => {
    const queryClient = useQueryClient();
    const retrieveCart = useCartStore((state) => state.retrieveCart);

    const handleDeleteCart = async (id: string) => {
      await del(`/api/cart/${id}`);
      queryClient.invalidateQueries({ queryKey: billQueryKeys.basic });
    };
    const handleResumeCart = async () => {
      retrieveCart(cart.products, cart.id);
    };

    const viewCart = () => {
      router.push({ pathname: APP_URL.BillById(cart.id), params });
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
