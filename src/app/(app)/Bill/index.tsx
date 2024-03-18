import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import CartCard from '../../../components/bill/CartCard';
import { Bill, useBillContext } from '../../../context/billContext';

const index = () => {
  const { fetchAllBill, bills } = useBillContext();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllBill();
    setRefreshing(false);
  }, []);
  const _keyExtractor = useCallback((item: Bill) => {
    return item.id;
  }, []);
  const _renderItem = useCallback(({ item }: { item: Bill }) => <CartCard cart={item} fetchData={fetchAllBill} />, []);
  return (
    <View>
      <FlatList
        style={{ width: '100%', minHeight: '100%' }}
        data={bills.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} title="Recharger l'historique" />}
        maxToRenderPerBatch={10}
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
export default index;
