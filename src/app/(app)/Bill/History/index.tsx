import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import CartCard from '../../../../components/bill/CartCard';
import { Bill, useBillContext } from '../../../../context/billContext';
import { useLocalSearchParams } from 'expo-router';

const History = () => {
  const { start, end } = useLocalSearchParams() as { start: string; end?: string };
  const { fetchAllBill, bills } = useBillContext();
  const [refreshing, setRefreshing] = useState(false);

  const fetch = async () => {
    await fetchAllBill(start, end);
  };

  useEffect(() => {
    fetch();
  }, [start, end]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetch();
    setRefreshing(false);
  }, []);
  const _keyExtractor = useCallback((item: Bill) => {
    return item.id;
  }, []);
  const _renderItem = useCallback(({ item }: { item: Bill }) => <CartCard cart={item} fetchData={fetch} />, []);
  if (bills.length === 0) {
    return (
      <View style={{ width: '100%', flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginTop: 50 }}>Pas de compte à afficher</Text>
      </View>
    );
  }
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
export default History;
