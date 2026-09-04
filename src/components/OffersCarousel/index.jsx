import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { api } from '../../services/api';
import { Container, Title, ContainerItems } from './styles';

export function OffersCarousel() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');

      const offers = data.filter((product) => product.offer);

      console.log(offers);

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
        spaceBetween={20}
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
            <ContainerItems $imageUrl={product.url}>
              <p>{product.name}</p>
            </ContainerItems>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
