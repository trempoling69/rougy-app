import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGetAllBasicPriceOfCategory } from '../../api/price/hook/price.hook';
import PriceCard from './PriceCard';
import ScanCard from './scan/ScanCard';
import { useCategoryStore } from '../../store/category.store';

const DisplayPricesList = () => {
  const selectedCategoryId = useCategoryStore((state) => state.selectedCategoryId);
  const { data: pricesOfCategory, isLoading, isError, isSuccess } = useGetAllBasicPriceOfCategory(selectedCategoryId);

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
    <ScrollView style={styles.priceScrollViewContainer} contentContainerStyle={styles.priceContentContainerStyle}>
      {pricesOfCategory.map((price, index) => (
        <PriceCard price={price} key={index} />
      ))}
      {selectedCategoryId === 'CUSTOM' && (
        <>
          <PriceCard
            price={{
              name: 'Personnaliser',
              amount: 0,
              id: 'CUSTOM',
            }}
            key={'CUSTOM'}
          />
          <ScanCard key={'CUSTOM_2'} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  priceScrollViewContainer: {
    flex: 1,
  },
  priceContentContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    paddingBottom: 20,
  },
});

export default DisplayPricesList;
