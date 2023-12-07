// SerieList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    Button,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SerieList = ({ reload, setReload }) => {
    const navigate = useNavigate();
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const filter = {
                    include: ['titulo']
                };

                const response = await axios.get(`http://localhost:3000/series?filter=${JSON.stringify(filter)}`);
                setSeries(response.data);
                setReload(false)
            } catch (error) {
                console.error('Erro ao obter a lista de séries', error);
            }
        };

        if (reload)
            fetchSeries();
    }, [reload]);

    const handleEdit = (id) => {
        navigate(`/serie/edit/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/series/${id}`)
            .then((response) => {
                alert('Série deletada com sucesso');
                setReload(true);
            })
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 8, marginTop: 4 }}>
            <Typography variant="h4" component="h1" fontWeight="bold" align='center'>
                Listagem de Série
            </Typography>
            {series.length === 0 ? (
                <Typography variant="body2">Nenhuma série encontrada.</Typography>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Orçamento</TableCell>
                                <TableCell>Data de Lançamento</TableCell>
                                <TableCell>Nota Média</TableCell>
                                <TableCell>Temporadas</TableCell>
                                <TableCell>Episódios</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {series.map((serie) => (
                                <TableRow key={serie.id}>
                                    <TableCell>{serie.titulo?.nome}</TableCell>
                                    <TableCell>{serie.titulo?.orcamento}</TableCell>
                                    <TableCell>{new Date(serie.titulo?.data_lancamento).toLocaleDateString()}</TableCell>
                                    <TableCell>{serie.titulo?.nota_media}</TableCell>
                                    <TableCell>{serie.quant_temporada}</TableCell>
                                    <TableCell>{serie.quant_episodio}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(serie.id)}
                                            aria-label="Editar"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(serie.id)}
                                            aria-label="Deletar"
                                        >
                                            <DeleteIcon />
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

export default SerieList;
