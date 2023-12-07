// TemporadaEdicao.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Typography,
    Paper,
    TextField,
    Button,
    Container,
    Grid,
} from '@mui/material';
import moment from 'moment';

const TemporadaEdicao = () => {
    const navigate = useNavigate();

    const { id: id_temporada } = useParams();
    const [temporadaData, setTemporadaData] = useState({
        number: '',
        nome: '',
        data_lancamento: '',
        quant_episodio: '',
        id_serie: '',
    });

    useEffect(() => {
        const fetchTemporada = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/temporadas/${id_temporada}`);
                const temporada = response.data;
                setTemporadaData({
                    number: temporada.number,
                    nome: temporada.nome,
                    data_lancamento: new Date(temporada.data_lancamento).toISOString().split('T')[0],
                    quant_episodio: temporada.quant_episodio,
                    id_serie: temporada.id_serie,
                });
            } catch (error) {
                console.error('Erro ao obter os dados da temporada', error);
            }
        };

        fetchTemporada();
    }, [id_temporada]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTemporadaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEdicao = async () => {
        try {
            const data = {
                number: parseFloat(temporadaData.number),
                nome: temporadaData.nome,
                data_lancamento: moment(temporadaData.data_lancamento).toISOString(),
                quant_episodio: parseFloat(temporadaData.quant_episodio)
            };

            await axios.patch(`http://localhost:3000/temporadas/${id_temporada}`, data);
            alert('Temporada editada com sucesso');
            navigate('/temporada');
            // Lógica adicional após a edição, se necessário
        } catch (error) {
            alert('Erro ao editar a temporada', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 8, marginTop: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Edição de Temporada
                </Typography>
                <form>
                    <Grid container spacing={2}>
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
                        onClick={handleEdicao}
                        sx={{ marginTop: 3 }}
                    >
                        Editar Temporada
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default TemporadaEdicao;
