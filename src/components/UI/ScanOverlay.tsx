import { Dimensions, StyleSheet, View } from 'react-native';

const { height, width } = Dimensions.get('window');
const rectHeight = 300;
const rectWidth = 300;

export const ScanOverlay = () => {
  return (
    <View style={styles.container}>
      {/* Overlay supérieur */}
      <View style={[styles.overlay, { height: (height - rectHeight) / 2, width: width }]} />

      {/* Ligne intermédiaire */}
      <View style={{ flexDirection: 'row' }}>
        {/* Overlay gauche */}
        <View style={[styles.overlay, { width: (width - rectWidth) / 2 }]} />
        {/* Zone transparente */}
        <View style={styles.transparentRect} />
        {/* Overlay droit */}
        <View style={[styles.overlay, { width: (width - rectWidth) / 2 }]} />
      </View>

      {/* Overlay inférieur */}
      <View style={[styles.overlay, { height: (height - rectHeight) / 2, width }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'white',
    opacity: 0.5,
  },
  transparentRect: {
    width: rectWidth,
    height: rectHeight,
    backgroundColor: 'transparent',
  },
});
