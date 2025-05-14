import { Pressable, StyleSheet, Text } from 'react-native';
import { CategoryPrice } from '../../type/basic';
import { theme } from '../../core/theme';

type Props = {
  category: CategoryPrice;
  handleClickCategoryCard: (id: string) => void;
  isSelected: boolean;
};
const CategoryPriceCard = ({ category, handleClickCategoryCard, isSelected }: Props) => {
  return (
    <Pressable
      style={isSelected ? styles.cardSelected : styles.card}
      onPress={() => handleClickCategoryCard(category.id)}
    >
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
