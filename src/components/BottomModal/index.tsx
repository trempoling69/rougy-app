import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetFooterProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import { FC, ReactNode, forwardRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  title: string;
  children: ReactNode;
  renderFooter?: FC<BottomSheetFooterProps>;
  onDismiss?: () => void;
};
const BottomModal = forwardRef<BottomSheetModal, Props>(({ title, children, renderFooter, onDismiss }, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      keyboardBehavior="interactive"
      footerComponent={renderFooter}
      onDismiss={onDismiss}
    >
      <View style={styles.contentSheetContainer}>
        <Text style={styles.contentSheetHeadline}>{title}</Text>
        {children}
      </View>
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
