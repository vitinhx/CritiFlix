import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const CadastroUsuario = () => {
    const navigate = useNavigate();
    const initialFormData = {
        nome: '',
        sexo: '',
        data_nasc: '',
        role: '',
        // Dados específicos para cada role
        altura: 0,
        nacionalidade: '',
        apelido: '',
        biografia: '',
        email: '',
        senha: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            role: selectedRole,
        }));
    };

    const handleSubmit = async () => {
        try {
            // Cadastrar a pessoa primeiro
            const pessoaData = {
                nome: formData.nome,
                sexo: formData.sexo,
                data_nasc: moment(formData.data_nasc).toISOString(),
            };

            const { data: { id: idPessoa } } = await axios.post('http://localhost:3000/pessoas', pessoaData);

            // Dados específicos para cada role
            let roleData = {};

            switch (formData.role) {
                case 'Artista':
                    roleData = {
                        altura: parseFloat(formData.altura),
                        nacionalidade: formData.nacionalidade,
                        id_pessoa: idPessoa,
                    };
                    await axios.post(`http://localhost:3000/pessoas/${idPessoa}/artista`, roleData);
                    break;
                case 'Diretor':
                    roleData = {
                        altura: parseFloat(formData.altura),
                        apelido: formData.apelido,
                        biografia: formData.biografia,
                        nacionalidade: formData.nacionalidade,
                        id_pessoa: idPessoa,
                    };
                    await axios.post(`http://localhost:3000/pessoas/${idPessoa}/diretor`, roleData);
                    break;
                case 'Usuario':
                    roleData = {
                        email: formData.email,
                        senha: formData.senha,
                        id_pessoa: idPessoa,
                    };
                    await axios.post(`http://localhost:3000/pessoas/${idPessoa}/usuario`, roleData);
                    break;
                default:
                    break;
            }

            alert('Usuário cadastrado com sucesso');
            clearForm();
        } catch (error) {
            alert('Erro ao cadastrar o usuário', error);
        }
    };

    const clearForm = () => {
        setFormData(initialFormData);
    };

    const handleLogin = () => {
        // Redirecionar para a página de registro ao clicar em "Não tenho login"
        navigate('/');
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 8 }}>
                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Cadastro de Usuário
                    </Typography >
                    <form>
                        <TextField
                            fullWidth
                            label="Nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <InputLabel id="sexo-label">Informe o sexo:</InputLabel>
                            <Select
                                labelId="sexo-label"
                                id="sexo"
                                value={formData.sexo}
                                onChange={(e) => handleChange({ target: { name: 'sexo', value: e.target.value } })}
                                label="Selecione o Sexo"
                            >
                                <MenuItem value="M">Masculino</MenuItem>
                                <MenuItem value="F">Feminino</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            type="date"
                            fullWidth
                            label="Data de Nascimento"
                            name="data_nasc"
                            value={formData.data_nasc || new Date()}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <InputLabel id="role-label">Selecione o Papel:</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                value={formData.role}
                                onChange={handleRoleChange}
                                label="Selecione o Papel"
                            >
                                <MenuItem value="Artista">Artista</MenuItem>
                                <MenuItem value="Diretor">Diretor</MenuItem>
                                <MenuItem value="Usuario">Usuário</MenuItem>
                            </Select>
                        </FormControl>
                        {/* Dados específicos para cada role */}
                        {formData.role === 'Artista' && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Altura"
                                    name="altura"
                                    value={formData.altura}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Nacionalidade"
                                    name="nacionalidade"
                                    value={formData.nacionalidade}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </>
                        )}

                        {formData.role === 'Diretor' && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Altura"
                                    name="altura"
                                    value={formData.altura}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Nacionalidade"
                                    name="nacionalidade"
                                    value={formData.nacionalidade}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Apelido"
                                    name="apelido"
                                    value={formData.apelido}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Biografia"
                                    name="biografia"
                                    value={formData.biografia}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </>
                        )}
                        {formData.role === 'Usuario' && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Senha"
                                    type="password"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </>
                        )}
                        <Box mt={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                sx={{ borderRadius: 12, backgroundColor: '#597092' }}
                            >
                                Cadastrar
                            </Button>
                        </Box>
                        <Box mt={2}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleLogin}
                            >
                                Já tenho login
                            </Button>
                        </Box>
                    </form>
                </Box >
            </Paper >
        </Container >
    );
};

export default CadastroUsuario;
