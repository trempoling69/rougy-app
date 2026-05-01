import { StyleSheet, Text, View } from 'react-native';
import AddPriceToCartModal from './AddPriceToCartModal';
import DisplayCategoriesList from './categories/DisplayCategoriesList';
import DisplayPricesList from './DisplayPricesList';

const Prices = () => {
  return (
    <>
      <View style={styles.container}>
        <DisplayCategoriesList />
        <View style={{ flex: 1 }}>
          <Text style={styles.textPrice}>Prix de la categorie :</Text>
          <DisplayPricesList />
        </View>
      </View>
      <AddPriceToCartModal />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textPrice: {
    marginLeft: 10,
    fontSize: 20,
    marginVertical: 15,
    fontWeight: 'bold',
  },
});

export default Prices;
