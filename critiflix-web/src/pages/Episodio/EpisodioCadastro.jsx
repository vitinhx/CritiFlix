// EpisodioCadastro.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Paper,
    TextField,
    Button,
    Container,
    Grid,
    Autocomplete,
} from '@mui/material';
import EpisodioList from './EpisodioList';

const EpisodioCadastro = () => {
    const { id_serie, id_temporada } = useParams();
    const [serieData, setSerieData] = useState({});
    const [temporadaData, setTemporadaData] = useState({});
    const [episodioData, setEpisodioData] = useState({
        number: '',
        nome: '',
        duracao: 0,
        sinopse: '',
        id_temporada: id_temporada || '',
    });

    useEffect(() => {
        const fetchSerie = async () => {
            try {
                const filter = { include: ['titulo'] }
                const response = await axios.get(`http://localhost:3000/series/${id_serie}?filter=${JSON.stringify(filter)}`);
                setSerieData(response.data);
            } catch (error) {
                console.error('Erro ao obter os dados da série', error);
            }
        };

        const fetchTemporada = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/temporadas/${id_temporada}`);
                setTemporadaData(response.data);
            } catch (error) {
                console.error('Erro ao obter os dados da temporada', error);
            }
        };

        fetchSerie();
        fetchTemporada();
    }, [id_serie]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEpisodioData((prevData) => ({
            ...prevData,
            [name]: name === 'number' ? parseInt(value, 10) : value,
        }));
    };

    const handleCadastro = async () => {
        try {
            const data = {
                ...episodioData,
                duracao: parseInt(episodioData.duracao, 10),
                number: parseInt(episodioData.number, 10),
                id_temporada: parseInt(episodioData.id_temporada)
            };

            await axios.post('http://localhost:3000/episodios', data);
            alert('Episódio cadastrado com sucesso');
            window.location.reload();
            // Lógica adicional após o cadastro, se necessário
        } catch (error) {
            alert('Erro ao cadastrar o episódio', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 8, marginTop: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Cadastro de Episódio
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Série: {serieData.titulo?.nome}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Temporada: {temporadaData.number}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Número do Episódio"
                                name="number"
                                type="number"
                                value={episodioData.number}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Duração (minutos)"
                                name="duracao"
                                type="number"
                                value={episodioData.duracao}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nome do Episódio"
                                name="nome"
                                value={episodioData.nome}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Sinopse"
                                name="sinopse"
                                multiline
                                rows={4}
                                value={episodioData.sinopse}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCadastro}
                        sx={{ marginTop: 3 }}
                    >
                        Cadastrar Episódio
                    </Button>
                </form>
            </Paper>

            <EpisodioList />
        </Container>
    );
};

export default EpisodioCadastro;
