import cart from '../../assets/cart.svg';
import { ContainerButton } from './styles';

export function CartButton(props) {

    return (
        <ContainerButton {...props}>
           <img src={cart} alt="carrinho-de-compras" />
        </ContainerButton>
    )
}