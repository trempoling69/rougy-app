import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCartStore, useCartTotal } from '../../../store/cart.store';
import { createOneCart, updateOneCart } from '../service/cart.service';
import { billQueryKeys } from '../../bill/queryKey/bill.key';

export const useValidateCart = () => {
  const { products, idUpdated, clearCart } = useCartStore();
  const total = useCartTotal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (products.length === 0) throw new Error('Cart is empty');

      const payload = { products, total };

      if (idUpdated !== null) {
        await updateOneCart({ cartId: idUpdated, ...payload });
      } else {
        await createOneCart(payload);
      }
    },
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: billQueryKeys.basic });
    },

    onError: (error) => {
      console.error('Erreur lors de la validation du panier', error);
    },
  });
};
