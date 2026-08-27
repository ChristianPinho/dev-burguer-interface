import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link } from './styles'
import Logo from '../../assets/logo.svg'
import { Button } from '../../components/Button'
import { api } from '../../services/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export function Login() {
    const navigate = useNavigate()

    const schema = yup.object({
        email: yup.string().email('Digite um email válido').required('O email é obrigatório'),
        password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
    }).required()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        try {
            const response = await toast.promise(
                api.post('/sessions', {
                    email: data.email,
                    password: data.password
                }),
                {
                    pending: 'Verificando suas credenciais...',
                    success: 'Login realizado com sucesso!',
                    error: 'Email ou senha inválidos!'
                }
            )

            setTimeout(() => {
                navigate('/')
            }, 2000)
            console.log(response)
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="Logo" />
            </LeftContainer>
            <RightContainer>
                <Title>Olá, seja bem vindo ao <span>Dev Burguer!</span>
                    <br />
                    Acesse com seu <span>Login e senha.</span></Title>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Email</label>
                        <input type="email" placeholder="Digite seu email" {...register('email')} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" placeholder="Digite sua senha" {...register('password')} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>
                    <Button type="submit">Entrar</Button>
                </form>
                <p>Não tem uma conta? <Link to="/cadastro">Clique aqui.</Link></p>
            </RightContainer>
        </Container >
    )
}