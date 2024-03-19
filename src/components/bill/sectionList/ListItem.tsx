import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { APP_URL } from '../../../config/url';
import { Ionicons } from '@expo/vector-icons';

const ListItem = ({ item }: { item: string }) => {
  return (
    <TouchableOpacity style={styles.touchableStyle} onPress={() => actionForMenuItem(item)}>
      <Text>{item}</Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <View>
          <Ionicons name="chevron-forward-outline" color="grey" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
});

const actionForMenuItem = (item: string) => {
  switch (item) {
    case 'Journée': {
      router.push({ pathname: APP_URL.BillHistory, params: { start: new Date().toISOString().split('T')[0] } });
      break;
    }
    case '7 jours': {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
      router.push({
        pathname: APP_URL.BillHistory,
        params: { start: startDate.toISOString().split('T')[0], end: endDate.toISOString().split('T')[0] },
      });
      break;
    }
    case 'stats journée': {
      router.push(APP_URL.stats);
      break;
    }
  }
};
export default ListItem;
