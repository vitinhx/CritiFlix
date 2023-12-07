// TemporadaList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Typography,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    TextField,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add } from '@mui/icons-material';

const TemporadaList = () => {
    const navigate = useNavigate();

    const { id_serie } = useParams();
    const [temporadas, setTemporadas] = useState([]);
    const [series, setSeries] = useState([]);
    const [selectedSerie, setSelectedSerie] = useState(id_serie);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const fetchTemporadas = async () => {
            try {
                const filter = { "where": { "id_serie": selectedSerie } }
                const response = await axios.get(`http://localhost:3000/temporadas?filter=${JSON.stringify(filter)}`);
                setTemporadas(response.data);
                setReload(false);
            } catch (error) {
                console.error('Erro ao obter a lista de temporadas', error);
            }
        };

        const fetchSeries = async () => {
            try {
                const filter = { include: ['titulo'] };
                const response = await axios.get(`http://localhost:3000/series?filter=${JSON.stringify(filter)}`);
                setSeries(response.data);
            } catch (error) {
                console.error('Erro ao obter a lista de séries', error);
            }
        };

        fetchTemporadas();
        fetchSeries();
    }, [selectedSerie, reload]);

    const handleEdit = (id) => {
        navigate(`/temporada/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/temporadas/${id}`);
            setReload(true);
        } catch (error) {
            console.error('Erro ao excluir a temporada', error);
        }
    };

    const handleSerieChange = (event, newValue) => {
        setSelectedSerie(newValue?.id || '');
    };

    const redirect = (id) => {
        if (selectedSerie)
            alert('Selecione uma série');
        else
            navigate(`/episodio/${selectedSerie}/${id}`)
    }

    return (
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 8, marginTop: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Lista de Temporadas
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <Autocomplete
                    options={series}
                    getOptionLabel={(option) => option.titulo?.nome}
                    value={series.find((serie) => serie.id === selectedSerie) || null}
                    onChange={handleSerieChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Selecione a Série"
                            fullWidth
                        />
                    )}
                />
            </FormControl>
            {temporadas.length === 0 ? (
                <Typography variant="body2">Nenhuma temporada encontrada.</Typography>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Número</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Data de Lançamento</TableCell>
                                <TableCell>Episódios</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {temporadas.map((temporada) => (
                                <TableRow key={temporada.id}>
                                    <TableCell>{temporada.number}</TableCell>
                                    <TableCell>{temporada.nome}</TableCell>
                                    <TableCell>{new Date(temporada.data_lancamento).toLocaleDateString()}</TableCell>
                                    <TableCell>{temporada.quant_episodio}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(temporada.id)}
                                            aria-label="Editar"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(temporada.id)}
                                            aria-label="Deletar"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            onClick={() => redirect(temporada.id)}
                                            aria-label="Deletar"
                                        >
                                            <Add />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
};

export default TemporadaList;
