import { useCallback } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import ListItem from '../../../components/bill/sectionList/ListItem';
import SectionHeader from '../../../components/bill/sectionList/SectionHeader';

const index = () => {
  const _keyExtractor = useCallback((item: string, index: number) => {
    return item + index;
  }, []);
  const _renderItem = useCallback(({ item }: { item: string }) => <ListItem item={item} />, []);
  const _renderHeader = useCallback(
    ({ section: { title } }: { section: { title: string } }) => <SectionHeader title={title} />,
    []
  );
  const DATA = [
    {
      title: 'Historique',
      data: ['Journée', '7 jours'],
    },
    {
      title: 'Statistique',
      data: ['stats journée'],
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={_keyExtractor}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={_renderItem}
        renderSectionHeader={_renderHeader}
        onEndReachedThreshold={0.5}
        bounces={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    width: '100%',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
});
export default index;
