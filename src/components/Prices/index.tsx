import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePriceContext } from '../../context/priceContext';
import CategoryPriceCard from './CategoryPriceCard';
import { useEffect, useRef, useState } from 'react';
import { Price } from '../../type/basic';
import PriceCard from './PriceCard';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AddPriceToCartModal from './AddPriceToCartModal';

const Prices = () => {
  const { prices, categoriesPrice, isLoading, isError } = usePriceContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [displayPrice, setDisplayPrice] = useState<Price[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<Price>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenSheet = (price: Price) => {
    bottomSheetRef.current?.present();
    setSelectedPrice(price);
  };
  const handleCloseSheet = () => {
    bottomSheetRef.current?.dismiss();
    setSelectedPrice(undefined);
  };
  const handleClickCategoryCard = (id: string) => {
    setSelectedCategory(id);
  };
  useEffect(() => {
    if (categoriesPrice[0]) {
      setSelectedCategory(categoriesPrice[0].id);
    }
  }, [categoriesPrice]);
  useEffect(() => {
    const selectPrice = prices.filter((price) => price.category_id === selectedCategory);
    setDisplayPrice(selectPrice);
  }, [selectedCategory]);

  if (isLoading) {
    return (
      <View>
        <Text>Chargement ....</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text>Une erreur est survenue</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.categoriesScrollViewContainer} contentContainerStyle={{ gap: 10 }}>
        {categoriesPrice.map((category) => (
          <CategoryPriceCard
            category={category}
            handleClickCategoryCard={handleClickCategoryCard}
            key={category.id}
            isSelected={selectedCategory === category.id}
          />
        ))}
        <CategoryPriceCard
          category={{ id: 'CUSTOM', name: 'Autre' }}
          handleClickCategoryCard={handleClickCategoryCard}
          key={'CUSTOM'}
          isSelected={selectedCategory === 'CUSTOM'}
        />
      </ScrollView>
      <Text style={styles.textPrice}>Prix de la categorie :</Text>
      <ScrollView
        style={styles.priceScrollViewContainer}
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 20,
          justifyContent: 'center',
        }}
      >
        {displayPrice.map((price) => (
          <PriceCard price={price} key={price.id} handleOpenSheet={handleOpenSheet} />
        ))}
        {selectedCategory === 'CUSTOM' && (
          <PriceCard
            price={{
              name: 'Personnaliser',
              amount: 0,
              id: `CUSTOM_${Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1)}`,
            }}
            key={'CUSTOM'}
            handleOpenSheet={handleOpenSheet}
          />
        )}
      </ScrollView>
      <AddPriceToCartModal
        handleCloseSheet={handleCloseSheet}
        bottomSheetRef={bottomSheetRef}
        price={selectedPrice}
        isCustomPrice={selectedCategory === 'CUSTOM'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoriesScrollViewContainer: {
    height: '20%',
  },
  textPrice: {
    marginLeft: 10,
    height: '5%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceScrollViewContainer: {
    height: '75%',
  },
});
export default Prices;
