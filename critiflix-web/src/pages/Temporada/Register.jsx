// RegisterTemp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography,
    Paper,
    TextField,
    Button,
    Container,
    Grid,
    Autocomplete,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import TemporadaList from './TemporadaList';

const RegisterTemp = () => {
    const { id_serie } = useParams();
    const [temporadaData, setTemporadaData] = useState({
        number: '',
        nome: '',
        data_lancamento: '',
        quant_episodio: '',
        id_serie: id_serie,
    });

    const [series, setSeries] = useState([]);
    const [selectedSerie, setSelectedSerie] = useState(null);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const filter = { include: ['titulo'] };
                const response = await axios.get(`http://localhost:3000/series?filter=${JSON.stringify(filter)}`);
                setSeries(response.data);
            } catch (error) {
                console.error('Erro ao obter a lista de séries', error);
            }
        };

        fetchSeries();
    }, []);

    const handleSerieChange = (event, newValue) => {
        setSelectedSerie(newValue);
        setTemporadaData((prevData) => ({
            ...prevData,
            id_serie: newValue?.id || '',
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTemporadaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCadastro = async () => {
        try {
            const data = {
                number: parseFloat(temporadaData.number),
                nome: temporadaData.nome,
                data_lancamento: moment(temporadaData.data_lancamento).toISOString(),
                quant_episodio: parseFloat(temporadaData.quant_episodio)
            };

            const response = await axios.post(`http://localhost:3000/series/${temporadaData.id_serie}/temporada`, data);
            alert('Temporada cadastrada com sucesso');
            window.location.reload()
        } catch (error) {
            console.error('Erro ao cadastrar a temporada', error);
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: 120 }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 8, marginTop: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Cadastro de Temporada
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={series}
                                getOptionLabel={(option) => option.titulo?.nome}
                                value={selectedSerie}
                                onChange={handleSerieChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Escolha a Série"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Número da Temporada"
                                name="number"
                                value={temporadaData.number}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Quantidade de Episódios"
                                name="quant_episodio"
                                type="number"
                                value={temporadaData.quant_episodio}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Data de Lançamento"
                                name="data_lancamento"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={temporadaData.data_lancamento}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Nome da Temporada"
                                name="nome"
                                value={temporadaData.nome}
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
                        Cadastrar Temporada
                    </Button>
                </form>
            </Paper>

            <TemporadaList />
        </Container>
    );
};

export default RegisterTemp;
