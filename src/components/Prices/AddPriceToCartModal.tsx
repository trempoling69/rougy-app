import { BottomSheetFooter, BottomSheetModal, BottomSheetTextInput, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import BottomModal from '../BottomModal';
import { Controller, useForm } from 'react-hook-form';
import { Price } from '../../type/basic';
import { useCartContext } from '../../context/cartContext';

type QuantityData = {
  unitPrice: string;
  priceId: string;
  quantity: string;
  name: string;
};
type Props = {
  price?: Price | null;
  isCustomPrice: boolean;
  handleCloseSheet: () => void;
};
const AddPriceToCartModal = forwardRef<BottomSheetModal, Props>(({ price, isCustomPrice, handleCloseSheet }, ref) => {
  const { dismiss } = useBottomSheetModal();
  const { handleAddItemToCart } = useCartContext();
  const [total, setTotal] = useState(0);
  const isSubmittingRef = useRef(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuantityData>({
    defaultValues: {
      quantity: '1',
    },
  });

  const inputValue = watch('quantity');
  const unitPriceValue = watch('unitPrice');

  const handleAddValue = () => {
    const value = parseInt(inputValue, 10);
    const newValue = value + 1;
    setValue('quantity', `${newValue}`);
  };

  const handleReduceValue = () => {
    const value = parseInt(inputValue, 10);
    let newValue = 1;
    if (value > 1) {
      newValue = value - 1;
    }
    setValue('quantity', `${newValue}`);
  };

  const onSubmit = (data: QuantityData) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    handleAddItemToCart(data);
    dismiss();
    setTimeout(() => {
      isSubmittingRef.current = false;
    }, 300);
  };

  useEffect(() => {
    if (price) {
      setValue('quantity', '1');
      setValue('priceId', price.id);
      setValue('unitPrice', `${price.amount}`);
      setValue('name', price.name);
    }
  }, [price]);

  useEffect(() => {
    const amo = isNaN(parseFloat(unitPriceValue)) ? 0 : parseFloat(unitPriceValue);
    const quan = isNaN(parseInt(inputValue, 10)) ? 0 : parseInt(inputValue, 10);
    const tot = Math.round((amo * quan + Number.EPSILON) * 100) / 100;
    setTotal(tot);
  }, [inputValue, price, unitPriceValue]);

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <Pressable style={styles.footerContainer} onPress={handleSubmit(onSubmit)} disabled={isSubmittingRef.current}>
          <Text style={styles.footerText}>Ajouter</Text>
        </Pressable>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <BottomModal ref={ref} title="Ajouter au panier" renderFooter={renderFooter} onDismiss={handleCloseSheet}>
      <View style={styles.container}>
        {price ? (
          <>
            <Text style={styles.textPriceName}>{price.name}</Text>
            {isCustomPrice ? (
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputUnitPriceContainer}>
                    <Text style={styles.textPriceAmount}>Prix unitaire :</Text>
                    <BottomSheetTextInput
                      onBlur={onBlur}
                      style={styles.inputUnitPrice}
                      onChangeText={(text) => {
                        const sanitizedValue = text.replace(/,/g, '.');
                        onChange(sanitizedValue);
                      }}
                      value={value}
                      keyboardType="decimal-pad"
                    />
                    <Text style={styles.inputUnitPriceText}>€</Text>
                  </View>
                )}
                name="unitPrice"
              />
            ) : (
              <Text style={styles.textPriceAmount}>
                Prix unitaire : <Text style={styles.textAmount}>{price.amount}€</Text>
              </Text>
            )}
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.buttonAdjustQuantity} onPress={handleReduceValue}>
                <Text style={styles.buttonAdjustQuantityText}>-</Text>
              </TouchableOpacity>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <BottomSheetTextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="number-pad"
                  />
                )}
                name="quantity"
              />
              {errors.quantity && <Text>Quantité requise</Text>}
              <TouchableOpacity style={styles.buttonAdjustQuantity} onPress={handleAddValue}>
                <Text style={styles.buttonAdjustQuantityText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.textTotal}>
              Total: <Text style={styles.textTotalValue}>{total}€</Text>
            </Text>
          </>
        ) : (
          <Text>Une erreur est survenue</Text>
        )}
      </View>
    </BottomModal>
  );
});
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
    width: 70,
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
