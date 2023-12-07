import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', senha: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        try {
            // Fazer a requisição para /usuarios com o filtro de email e senha
            const { data } = await axios.get(`http://localhost:3000/login/${formData.email}/${formData.senha}`);

            // Verificar se algum registro foi retornado
            if (data && data.id) {
                //Sinceramente estou com preguiça
                localStorage.setItem('can_create', formData.email === "admin@gmail.com")
                localStorage.setItem('id_user', data.id);
                // Registro encontrado, redirecionar para a página /home
                navigate('/home');
            } else {
                // Nenhum registro encontrado, tratar como login inválido
                alert('Credenciais inválidas. Por favor, verifique seu email e senha.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Por favor, tente novamente mais tarde.');
        }
    };

    const handleRegister = () => {
        // Redirecionar para a página de registro ao clicar em "Não tenho login"
        navigate('/register');
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 8 }}>
                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Login
                    </Typography>
                    <form>
                        <TextField
                            label="Username"
                            name="email"
                            margin="normal"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            name="senha"
                            type="password"
                            value={formData.senha}
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                        />
                        <Box mt={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleLogin}
                            >
                                Log In
                            </Button>
                        </Box>
                        <Box mt={2}>
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                onClick={handleRegister}
                            >
                                Não tenho login
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
