import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CategoryPriceCard from '../CategoryPriceCard';
import { useGetAllCategoriesFromPrices } from '../../../api/category/category.hook';

const DisplayCategoriesList = () => {
  const { isLoading, isError, isSuccess, data: categoriesPrice } = useGetAllCategoriesFromPrices();

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
    <ScrollView horizontal={true} style={styles.categoriesScrollViewContainer} contentContainerStyle={{ gap: 10 }}>
      {categoriesPrice.map((category) => (
        <CategoryPriceCard category={category} key={category.id} />
      ))}
      <CategoryPriceCard category={{ id: 'CUSTOM', name: 'Autre' }} key={'CUSTOM'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoriesScrollViewContainer: {
    flexGrow: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default DisplayCategoriesList;
