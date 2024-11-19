import { BottomSheetBackdrop, BottomSheetFooterProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { FC, ReactNode, forwardRef, useCallback, useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  children: ReactNode;
  renderFooter?: FC<BottomSheetFooterProps>;
  onDismiss?: () => void;
};
const BottomModal = forwardRef<BottomSheetModal, Props>(({ title, children, renderFooter, onDismiss }, ref) => {
  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  return (
    <BottomSheetModal
      index={0}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      enableDynamicSizing={false}
      keyboardBehavior="interactive"
      footerComponent={renderFooter}
      onDismiss={onDismiss}
    >
      <BottomSheetView style={styles.contentSheetContainer}>
        <Text style={styles.contentSheetHeadline}>{title}</Text>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
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

export default BottomModal;
