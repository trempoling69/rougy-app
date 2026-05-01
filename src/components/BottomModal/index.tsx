import { BottomSheetBackdrop, BottomSheetFooterProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { FC, ReactNode, forwardRef, useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  children: ReactNode;
  renderFooter?: FC<BottomSheetFooterProps>;
  onDismiss?: () => void;
  snapPoints: string[];
};
const BottomModal = forwardRef<BottomSheetModal, Props>(
  ({ title, children, renderFooter, snapPoints, onDismiss }, ref) => {
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
        enablePanDownToClose={true}
        enableDynamicSizing={false}
        footerComponent={renderFooter}
        onDismiss={onDismiss}
        keyboardBehavior="interactive"
      >
        <BottomSheetView style={styles.contentSheetContainer}>
          <Text style={styles.contentSheetHeadline}>{title}</Text>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  contentSheetContainer: {
    // flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  contentSheetHeadline: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default BottomModal;
