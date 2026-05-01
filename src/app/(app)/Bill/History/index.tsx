import { useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import CartCard from '../../../../components/bill/CartCard';
import { useLocalSearchParams } from 'expo-router';
import { useGetBillHistory } from '../../../../api/bill/hook/bill.hook';
import { Bill } from '../../../../type/basic';

const History = () => {
  const { start, end } = useLocalSearchParams() as { start: string; end?: string };
  const { data: bills, isLoading, isError, isSuccess, refetch, isFetching, isPending } = useGetBillHistory(start, end);

  const onRefresh = useCallback(async () => {
    refetch();
  }, []);

  const _keyExtractor = useCallback((item: Bill) => {
    return item.id;
  }, []);
  const _renderItem = useCallback(({ item }: { item: Bill }) => <CartCard cart={item} params={{ start, end }} />, []);

  if (isLoading) {
    return (
      <View>
        <Text>Chargement ....</Text>
      </View>
    );
  }

  if (isError || !isSuccess) {
    return (
      <View>
        <Text>Une erreur est survenue</Text>
      </View>
    );
  }

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
        refreshControl={
          <RefreshControl refreshing={isFetching && !isPending} onRefresh={onRefresh} title="Recharger l'historique" />
        }
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
