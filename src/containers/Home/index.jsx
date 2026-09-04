import { CategoriesCarousel } from '../../components/CategoriesCarousel';
import { OffersCarousel } from '../../components/OffersCarousel';
import { Banner, Container, Content } from './styles';

export function Home() {
    return (
        <main>
            <Banner>
            <h1>Bem-vindo ao Dev Burguer!</h1>
            </Banner>
            <Container>
                <Content>
                    <CategoriesCarousel />
                    <OffersCarousel />
                </Content>
            </Container>
        </main>
    )
}