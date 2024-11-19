import BottomSheet, { BottomSheetFooterProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { FC, ReactNode, forwardRef, useMemo } from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type Props = {
  title: string;
  children: ReactNode;
  renderFooter?: FC<BottomSheetFooterProps>;
  indicatorStyle?: StyleProp<ViewStyle>;
};
const CustomBottomSheet = forwardRef<BottomSheet, Props>(({ title, children, renderFooter, indicatorStyle }, ref) => {
  const snapPoints = useMemo(() => ['20%'], []);

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      keyboardBehavior="interactive"
      footerComponent={renderFooter}
      handleIndicatorStyle={indicatorStyle}
    >
      <BottomSheetView style={styles.contentSheetContainer}>
        <Text style={styles.contentSheetHeadline}>{title}</Text>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentSheetContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  contentSheetHeadline: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: '#80f',
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
  },
});

export default CustomBottomSheet;
