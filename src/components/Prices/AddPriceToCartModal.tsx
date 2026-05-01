import { BottomSheetFooter, BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import BottomModal from '../BottomModal';
import { Controller, useForm } from 'react-hook-form';
import { usePriceSheetStore } from '../../store/priceSheet.store';
import { useGetOnePriceById } from '../../api/price/hook/price.hook';
import { randomUUID } from 'expo-crypto';
import { useCartStore } from '../../store/cart.store';

type QuantityData = {
  unitPrice: string;
  priceId: string;
  quantity: string;
  name: string;
};

const AddPriceToCartModal = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const handleAddItemToCart = useCartStore((state) => state.handleAddItemToCart);
  const isSubmittingRef = useRef(false);
  const isPriceSheetOpen = usePriceSheetStore((state) => state.isPriceSheetOpen);
  const closePriceSheet = usePriceSheetStore((state) => state.closePriceSheet);
  const priceSheetData = usePriceSheetStore((state) => state.priceSheetData);
  const priceId = priceSheetData?.priceId;
  const isCustomPrice = priceId?.startsWith('CUSTOM');
  const { data: price, isLoading, isError } = useGetOnePriceById(isCustomPrice ? null : (priceId ?? null));

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<QuantityData>({
    defaultValues: {
      quantity: '1',
      unitPrice: '0',
    },
  });

  useEffect(() => {
    if (isPriceSheetOpen) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
      reset();
    }
  }, [isPriceSheetOpen]);

  const handleClose = () => {
    closePriceSheet();
  };

  const inputValue = watch('quantity');
  const unitPriceValue = watch('unitPrice');

  const total = useMemo(() => {
    const amountStr = unitPriceValue?.replace(',', '.') || '0';
    const quantity = parseInt(inputValue || '0', 10);

    if (isNaN(quantity)) return 0;
    const unitPriceInCents = Math.round(parseFloat(amountStr) * 100);

    if (isNaN(unitPriceInCents)) return 0;

    const totalInCents = unitPriceInCents * quantity;

    return totalInCents / 100;
  }, [inputValue, unitPriceValue]);

  const handleQuantityChange = (delta: number) => {
    const current = parseInt(inputValue || '1', 10);
    const newValue = Math.max(1, current + delta);
    setValue('quantity', `${newValue}`, { shouldValidate: true });
  };

  const onSubmit = (data: QuantityData) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    handleAddItemToCart(data);
    handleClose();
    setTimeout(() => {
      isSubmittingRef.current = false;
    }, 300);
  };

  useEffect(() => {
    if (isCustomPrice) {
      reset({
        quantity: '1',
        priceId: `CUSTOM_${randomUUID()}`,
        unitPrice: '0',
        name: 'Personnalisé',
      });
    } else if (price && !isLoading && !isError) {
      reset({
        quantity: '1',
        priceId: price.id,
        unitPrice: `${price.amount}`,
        name: price.name,
      });
    }
  }, [price, isCustomPrice, isLoading, isError, reset]);

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <Pressable style={styles.footerContainer} onPress={handleSubmit(onSubmit)} disabled={isSubmittingRef.current}>
          <Text style={styles.footerText}>Ajouter</Text>
        </Pressable>
      </BottomSheetFooter>
    ),
    [handleSubmit]
  );

  return (
    <BottomModal
      ref={bottomSheetRef}
      title="Ajouter au panier"
      renderFooter={renderFooter}
      onDismiss={handleClose}
      snapPoints={snapPoints}
    >
      <View style={styles.container}>
        {isLoading && <Text>Chargement du prix...</Text>}
        {!isLoading && !isError && (price || isCustomPrice) ? (
          <>
            {price ? (
              <>
                <Text style={styles.textPriceName}>{price.name}</Text>
                <Text style={styles.textPriceAmount}>
                  Prix unitaire : <Text style={styles.textAmount}>{price.amount}€</Text>
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.textPriceName}>Personnalisé</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="unitPrice"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputUnitPriceContainer}>
                      <Text style={styles.textPriceAmount}>Prix unitaire :</Text>
                      <BottomSheetTextInput
                        onBlur={onBlur}
                        style={styles.inputUnitPrice}
                        onChangeText={(text) => onChange(text.replace(/,/g, '.'))}
                        value={value}
                        keyboardType="decimal-pad"
                      />
                      <Text style={styles.inputUnitPriceText}>€</Text>
                    </View>
                  )}
                />
              </>
            )}

            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.buttonAdjustQuantity} onPress={() => handleQuantityChange(-1)}>
                <Text style={styles.buttonAdjustQuantityText}>-</Text>
              </TouchableOpacity>

              <Controller
                control={control}
                rules={{ required: true }}
                name="quantity"
                render={({ field: { onChange, onBlur, value } }) => (
                  <BottomSheetTextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="number-pad"
                  />
                )}
              />

              <TouchableOpacity style={styles.buttonAdjustQuantity} onPress={() => handleQuantityChange(1)}>
                <Text style={styles.buttonAdjustQuantityText}>+</Text>
              </TouchableOpacity>
            </View>

            {errors.quantity && <Text style={{ color: 'red' }}>Quantité requise</Text>}

            <Text style={styles.textTotal}>
              Total: <Text style={styles.textTotalValue}>{total}€</Text>
            </Text>
          </>
        ) : (
          !isLoading && <Text>Une erreur est survenue, Prix introuvable.</Text>
        )}
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    gap: 30,
  },
  textPriceName: { fontSize: 20 },
  textPriceAmount: { fontSize: 20 },
  textAmount: { fontWeight: 'bold' },
  quantityContainer: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 50 },
  buttonAdjustQuantity: {},
  buttonAdjustQuantityText: {
    marginHorizontal: 10,
    fontSize: 55,
    color: 'blue',
  },
  input: {
    textAlign: 'center',
    width: 90,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    fontSize: 50,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  inputUnitPriceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputUnitPrice: {
    textAlign: 'center',
    minWidth: 70,
    borderRadius: 10,
    fontSize: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  inputUnitPriceText: {
    fontSize: 20,
  },
  textTotal: { fontSize: 25 },
  textTotalValue: { fontWeight: 'bold' },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: '#80f',
  },
  footerText: {
    margin: 5,
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
  },
});
export default AddPriceToCartModal;
