import { PriceProvider } from '../../context/priceContext';
import Prices from '../../components/Prices';

const index = () => {
  return (
    <PriceProvider>
      <Prices />
    </PriceProvider>
  );
};

export default index;
