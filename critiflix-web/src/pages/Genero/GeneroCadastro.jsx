import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
} from '@mui/material';
import GeneroList from './GeneroList';

const GeneroCadastro = () => {
    const [nome, setNome] = useState('');
    const [reload, setReload] = useState(true);

    const handleCadastro = async () => {
        try {
            const data = {
                nome: nome.trim(),
            };

            await axios.post('http://localhost:3000/generos', data);
            alert('Gênero cadastrado com sucesso');
            setReload(true);
            // Lógica adicional após o cadastro, se necessário
        } catch (error) {
            alert('Erro ao cadastrar o gênero', error);
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: 120 }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 8 }}>
                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Cadastro de Gênero
                    </Typography>
                    <form>
                        <TextField
                            fullWidth
                            label="Nome do Gênero"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            margin="normal"
                        />
                        <Box mt={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCadastro}
                                sx={{ borderRadius: 12, backgroundColor: '#597092' }}
                            >
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>

            <GeneroList reload={reload} setReload={setReload} />
        </Container>
    );
};

export default GeneroCadastro;
