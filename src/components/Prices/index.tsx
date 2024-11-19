import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePriceContext } from '../../context/priceContext';
import CategoryPriceCard from './CategoryPriceCard';
import { useEffect, useRef, useState } from 'react';
import { Price } from '../../type/basic';
import PriceCard from './PriceCard';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AddPriceToCartModal from './AddPriceToCartModal';
import ScanCard from './scan/ScanCard';

const Prices = () => {
  const { prices, categoriesPrice, isLoading, isError, scanError, setScanError, scannedPrice, setScannedPrice } =
    usePriceContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState<Price | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [displayPrice, setDisplayPrice] = useState<Price[]>([]);
  const handleOpenSheet = (price: Price) => {
    setSelectedPrice(price);
    bottomSheetRef.current?.present();
  };
  const handleCloseSheet = () => {
    bottomSheetRef.current?.dismiss();
    setSelectedPrice(null);
    if (scannedPrice) {
      setScannedPrice(null);
    }
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
    if (scanError) {
      Alert.alert('Erreur du scan', 'Une erreur est survenue lors de la récupération du prix', [
        {
          text: 'Cancel',
          onPress: () => setScanError(false),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => setScanError(false) },
      ]);
    }
  }, [scanError]);

  useEffect(() => {
    if (scannedPrice) {
      handleOpenSheet(scannedPrice);
    }
  }, [scannedPrice]);

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
        {displayPrice.map((price, index) => (
          <PriceCard price={price} key={index} handleOpenSheet={handleOpenSheet} />
        ))}
        {selectedCategory === 'CUSTOM' && (
          <>
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
            <ScanCard key={'CUSTOM_2'} />
          </>
        )}
      </ScrollView>
      <AddPriceToCartModal
        ref={bottomSheetRef}
        handleCloseSheet={handleCloseSheet}
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
