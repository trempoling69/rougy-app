import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useGetOneBillById } from '../../../api/bill/hook/bill.hook';
import { Item } from '../../../store/cart.store';
import { calculatePrice } from '../../../components/utils/priceCalculation';

const CountDetail = () => {
  const { id, start, end } = useLocalSearchParams() as { id: string; start: string; end?: string };
  const { data: count, isLoading, isError, isSuccess } = useGetOneBillById(id, start, end);

  const getTotalItem = (product: Item) => {
    return calculatePrice(product.quantity, product.unitPrice);
  };

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

  return (
    <View>
      <Text style={styles.textTotal}>Total : {count?.total}€</Text>
      <FlatList
        style={{ width: '100%', minHeight: '100%' }}
        data={count?.products}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item: product }) => (
          <View style={styles.cardItem}>
            <View style={styles.productDetail}>
              <Text style={styles.productInfo}>
                {product.quantity} x {product.name}
              </Text>
              <Text style={styles.productInfo}>{product.unitPrice}€</Text>
            </View>
            <View>
              <Text style={styles.totalText}>{getTotalItem(product) + '€'}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.priceId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textTotal: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  cardItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    minHeight: 90,
  },
  productDetail: {
    gap: 10,
  },
  productInfo: {
    fontWeight: '500',
    fontSize: 18,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '900',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
});

export default CountDetail;
