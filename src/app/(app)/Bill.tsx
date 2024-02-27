import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Item } from '../../context/cartContext';
import { get } from '../../config/api';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import CartCard from '../../components/bill/CartCard';
export type CartHistory = {
  id: string;
  products: Item[];
  total: number;
  createdAt: string;
};
type CartHistoryRequest = {
  id: string;
  products: string;
  total: number;
  createdAt: string;
};
const Bill = () => {
  const [cartHistory, setCartHistory] = useState<CartHistory[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);
  const fetchData = async () => {
    const request = await get<CartHistory[]>('/api/cart');
    console.log(request.data);

    // const product: CartHistory[] = request.data.map((cart) => ({
    //   ...cart,
    //   products: JSON.parse(cart.products),
    // }));
    setCartHistory(request.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View>
      <FlatList
        style={{ width: '100%', minHeight: '100%' }}
        data={cartHistory}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={(i) => <CartCard cart={i.item} fetchData={fetchData} />}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} title="Recharger l'historique" />}
      />
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
export default Bill;
