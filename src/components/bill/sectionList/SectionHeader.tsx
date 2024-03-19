import { StyleSheet, View, Text } from 'react-native';

const SectionHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 32,
    marginBottom: 24,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SectionHeader;
