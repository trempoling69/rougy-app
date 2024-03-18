import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Bill, useBillContext } from '../../../context/billContext';
import { useEffect, useState } from 'react';
import { Item } from '../../../context/cartContext';

const CountDetail = () => {
  const [count, setCount] = useState<Bill>();
  const { id } = useLocalSearchParams();
  const { bills } = useBillContext();
  useEffect(() => {
    setCount(bills.find((bill) => bill.id === id));
  }, [id]);
  const getTotalItem = (product: Item) => {
    const total = parseInt(product.quantity) * parseFloat(product.unitPrice);
    return Math.round((total + Number.EPSILON) * 100) / 100;
  };
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
        keyExtractor={(item) => item.priceCode}
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
