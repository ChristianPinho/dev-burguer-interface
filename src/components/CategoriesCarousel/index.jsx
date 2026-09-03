import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { api } from '../../services/api';
import { Container, Title, ContainerItems } from './styles';

export function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');

      setCategories(data);
      console.log(data);
    }

    loadCategories();
  }, []);

  return (
    <Container>
      <Title>Categorias</Title>

      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        navigation
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
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <ContainerItems $imageUrl={category.url}>
              <p>{category.name}</p>
            </ContainerItems>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
