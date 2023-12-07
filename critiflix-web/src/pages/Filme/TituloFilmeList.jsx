// TituloFilmeList.js
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
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TituloFilmeList = ({ reload, setReload }) => {
    const navigate = useNavigate();
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const fetchFilmes = async () => {
            try {
                const filter = {
                    include: ['titulo'],
                };

                const response = await axios.get(`http://localhost:3000/filmes?filter=${JSON.stringify(filter)}`);
                setFilmes(response.data);
                setReload(false);
            } catch (error) {
                console.error('Erro ao obter a lista de filmes', error);
            }
        };

        fetchFilmes();
    }, [reload, setReload]);

    const handleEdit = (id) => {
        navigate(`/filme/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/filmes/${id}`);
            setReload(true);
        } catch (error) {
            console.error('Erro ao excluir o filme', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 8, marginTop: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Lista de Filmes
            </Typography>
            {filmes.length === 0 ? (
                <Typography variant="body2">Nenhum filme encontrado.</Typography>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Título</TableCell>
                                <TableCell>Orçamento</TableCell>
                                <TableCell>Data de Lançamento</TableCell>
                                <TableCell>Nota Média</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filmes.map((filme) => (
                                <TableRow key={filme.id}>
                                    <TableCell>{filme.titulo?.nome}</TableCell>
                                    <TableCell>{parseFloat(filme.titulo?.orcamento).toFixed(2)}</TableCell>
                                    <TableCell>{new Date(filme.titulo?.data_lancamento).toLocaleDateString()}</TableCell>
                                    <TableCell>{parseFloat(filme.titulo?.nota_media).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(filme.id)}
                                            aria-label="Editar"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(filme.id)}
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

export default TituloFilmeList;
