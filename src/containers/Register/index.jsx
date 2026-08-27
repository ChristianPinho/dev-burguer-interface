import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link } from './styles'
import Logo from '../../assets/logo.svg'
import { Button } from '../../components/Button'
import { api } from '../../services/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export function Register() {
    const navigate = useNavigate()

    const schema = yup.object({
        name: yup.string().required('O nome é obrigatório'),
        email: yup.string().email('Digite um email válido').required('O email é obrigatório'),
        password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais').required('A confirmação de senha é obrigatória')
    }).required()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        try {
            const { status } = await api.post('/users', {
                name: data.name,
                email: data.email,
                password: data.password
            },
                {
                    validateStatus: () => true,
                }
            )

            if (status === 200 || status === 201) {
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
                toast.success('Conta criada com sucesso!')
            } else if (status === 409) {
                toast.error('Email já cadastrado!')
            } else {
                throw new Error('Ocorreu um erro ao criar a conta!')
            }
        } catch (error) {
            toast.error('Falha ao criar a conta! Tente novamente mais tarde.')
        }
    }

        return (
            <Container>
                <LeftContainer>
                    <img src={Logo} alt="Logo" />
                </LeftContainer>
                <RightContainer>
                    <Title>Criar Conta</Title>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputContainer>
                            <label>Nome</label>
                            <input type="text" placeholder="Digite seu nome" {...register('name')} />
                            <p>{errors?.name?.message}</p>
                        </InputContainer>
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
                        <InputContainer>
                            <label>Confirmar Senha</label>
                            <input type="password" placeholder="Digite sua senha novamente" {...register('confirmPassword')} />
                            <p>{errors?.confirmPassword?.message}</p>
                        </InputContainer>
                        <Button type="submit">Criar Conta</Button>
                    </form>
                    <p>Já tem uma conta? <Link to="/login">Clique aqui.</Link></p>
                </RightContainer>
            </Container >
        )
    }