import { Container, LeftContainer, RightContainer, Title, Form, InputContainer } from './styles'
import Logo from '../../assets/logo.svg'
import { Button } from '../../components/Button'

export function Login() {
    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="Logo" />
            </LeftContainer>
            <RightContainer>
                <Title>Olá, seja bem vindo ao <span>Dev Burguer!</span>
                    <br />
                    Acesse com seu <span>Login e senha.</span></Title>

                <form>
                    <InputContainer>
                        <label>Email</label>
                        <input type="email" placeholder="Digite seu email" />
                        <label>Senha</label>
                        <input type="password" placeholder="Digite sua senha" />
                    </InputContainer>
                    <Button>Entrar</Button>
                </form>
                <p>Não tem uma conta? <a>Clique aqui.</a></p>
            </RightContainer>
        </Container >
    )
}