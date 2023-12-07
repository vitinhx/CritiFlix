// EpisodioList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
    Container,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const EpisodioList = () => {
    const { id_temporada } = useParams();
    const [episodios, setEpisodios] = useState([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const fetchEpisodios = async () => {
            try {
                const filter = {
                    "where": { "id_temporada": id_temporada }
                };
                const response = await axios.get(`http://localhost:3000/episodios?filter=${JSON.stringify(filter)}`);
                setEpisodios(response.data);
                setReload(false);
            } catch (error) {
                console.error('Erro ao obter a lista de episódios', error);
            }
        };

        fetchEpisodios();
    }, [id_temporada, reload]);

    const handleEdit = (id) => {
        // Implemente a lógica de edição aqui
        console.log(`Editar episódio com ID ${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/episodios/${id}`);
            setReload(true);
        } catch (error) {
            console.error('Erro ao excluir o episódio', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 8, marginTop: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Lista de Episódios
            </Typography>
            {episodios.length === 0 ? (
                <Typography variant="body2">Nenhum episódio encontrado.</Typography>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Número</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Duração (minutos)</TableCell>
                                <TableCell>Sinopse</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {episodios.map((episodio) => (
                                <TableRow key={episodio.id}>
                                    <TableCell>{episodio.number}</TableCell>
                                    <TableCell>{episodio.nome}</TableCell>
                                    <TableCell>{episodio.duracao}</TableCell>
                                    <TableCell>{episodio.sinopse}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(episodio.id)}
                                            aria-label="Editar"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(episodio.id)}
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

export default EpisodioList;
