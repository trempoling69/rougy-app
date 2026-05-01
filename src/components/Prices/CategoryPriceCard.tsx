import { Pressable, StyleSheet, Text } from 'react-native';
import { CategoryPrice } from '../../type/basic';
import { theme } from '../../core/theme';
import { useCategoryStore } from '../../store/category.store';

type Props = {
  category: CategoryPrice;
};

const CategoryPriceCard = ({ category }: Props) => {
  const selectedCategoryId = useCategoryStore((state) => state.selectedCategoryId);
  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);
  const isSelected = selectedCategoryId === category.id;
  return (
    <Pressable style={isSelected ? styles.cardSelected : styles.card} onPress={() => setSelectedCategory(category.id)}>
      <Text style={isSelected ? styles.textInCardSelected : styles.textInCard}>{category.name}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: theme.colors.beige,
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 110,
  },
  cardSelected: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: theme.colors.violet,
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 110,
  },
  textInCard: {
    color: theme.colors.chocolat,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  textInCardSelected: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
});
export default CategoryPriceCard;
