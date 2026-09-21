import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { api } from '../../services/api';
import { Container, Title } from './styles';
import { CardProduct } from '../CardProduct';
import { formatPrice } from '../../utils/formatPrice';

export function OffersCarousel() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');

      const offers = data
        .filter((product) => product.offer)
        .map((product) => ({
          currencyValue: formatPrice(product.price),
          ...product,
        }));

      setOffers(offers);
    }

    loadProducts();
  }, []);

  if (!offers.length) {
    return null;
  }

  return (
    <Container>
      <Title>Ofertas do Dia</Title>

      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        navigation
        loop
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {offers.map((product) => (
          <SwiperSlide key={product.id}>
            <CardProduct product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
