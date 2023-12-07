import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    IconButton,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const GeneroList = ({ reload, setReload }) => {
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        const fetchGeneros = async () => {
            try {
                const response = await axios.get('http://localhost:3000/generos');
                setGeneros(response.data);
                setReload(false);
            } catch (error) {
                console.error('Erro ao obter a lista de gêneros', error);
            }
        };

        if (reload)
            fetchGeneros();
    }, [reload]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/generos/${id}`);
            setReload(!reload);
            alert('Gênero removido com sucesso');
        } catch (error) {
            alert('Erro ao excluir o gênero', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 8, marginTop: 4 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome do Gênero</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {generos.map((genero) => (
                            <TableRow key={genero.id}>
                                <TableCell>{genero.id}</TableCell>
                                <TableCell>{genero.nome}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        aria-label="editar"
                                        component={Link}
                                        to={`/genero/${genero.id}`}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        aria-label="deletar"
                                        onClick={() => handleDelete(genero.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default GeneroList;
