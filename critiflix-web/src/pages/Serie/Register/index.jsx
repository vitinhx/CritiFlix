import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Container,
    Box,
    Typography,
    Grid,
    Paper,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import axios from 'axios';
import SerieList from './SerieList';
import moment from 'moment';

const SerieForm = () => {
    const initialFormData = {
        nome: '',
        orcamento: '',
        data_lancamento: '',
        nota_media: '',
        sinopse: '',
        quant_temporada: '',
        quant_episodio: '',
        poster: '',
        generos: [], // Lista de gêneros selecionados
        artistas: [],
        diretores: [],
        where_view: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [generos, setGeneros] = useState([]); // Lista de todos os gêneros disponíveis
    const [artistas, setArtistas] = useState([]);
    const [diretores, setDiretores] = useState([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const fetchGeneros = async () => {
            try {
                const response = await axios.get('http://localhost:3000/generos');
                setGeneros(response.data);
            } catch (error) {
                console.error('Erro ao obter a lista de gêneros', error);
            }
        };

        const fetchArtistas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/artistas');
                setArtistas(response.data);
            } catch (error) {
                console.error('Erro ao obter a lista de artistas', error);
            }
        };

        const fetchDiretores = async () => {
            try {
                const response = await axios.get('http://localhost:3000/diretors');
                setDiretores(response.data);
            } catch (error) {
                console.error('Erro ao obter a lista de diretores', error);
            }
        };

        fetchGeneros();
        fetchArtistas();
        fetchDiretores();
    }, [reload]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleGeneroChange = (event) => {
        const selectedGeneros = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            generos: selectedGeneros,
        }));
    };

    const handleArtistasChange = (event) => {
        const selectedArtistas = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            artistas: selectedArtistas,
        }));
    };

    const handleDiretoresChange = (event) => {
        const selectedDiretores = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            diretores: selectedDiretores,
        }));
    };

    const handleSubmit = async () => {
        try {
            const dataTitle = {
                nome: formData.nome,
                orcamento: parseFloat(formData.orcamento),
                data_lancamento: moment(formData.data_lancamento).toISOString(),
                nota_media: parseFloat(formData.nota_media),
                sinopse: formData.sinopse,
                where_view: formData.where_view,
                poster: formData.poster,
            };

            const { data: { id: idTitle } } = await axios.post('http://localhost:3000/titulos', dataTitle);

            const dataSerie = {
                quant_temporada: parseFloat(formData.quant_temporada),
                quant_episodio: parseFloat(formData.quant_episodio),
                id_titulo: idTitle,
            };

            await axios.post('http://localhost:3000/series', dataSerie);

            // Cadastrar os gêneros para o título
            for (const generoId of formData.generos) {
                const dataTituloGenero = {
                    tituloId: idTitle,
                    generoId: generoId,
                };

                await axios.post('http://localhost:3000/titulo-generos', dataTituloGenero);
            }

            // Cadastrar os artistas para a série
            for (const artistaId of formData.artistas) {
                const dataSerieArtista = {
                    tituloId: idTitle,
                    artistaId: artistaId,
                };
                await axios.post('http://localhost:3000/atuacaos', dataSerieArtista);
            }

            // Cadastrar os diretores para a série
            for (const diretorId of formData.diretores) {
                const dataSerieDiretor = {
                    tituloId: idTitle,
                    diretorId: diretorId,
                };
                await axios.post('http://localhost:3000/direcaos', dataSerieDiretor);
            }

            setReload(true);
            alert('Série cadastrada com sucesso');
            clearForm();
            // Lógica adicional após o cadastro, se necessário
        } catch (error) {
            alert('Erro ao cadastrar a série', error);
        }
    };

    const clearForm = () => {
        setFormData(initialFormData);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: 120 }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 8 }}>
                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Cadastro de Série
                    </Typography>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Orçamento"
                                    type="number"
                                    name="orcamento"
                                    value={formData.orcamento}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    type="date"
                                    fullWidth
                                    label="Data de Lançamento"
                                    name="data_lancamento"
                                    value={formData.data_lancamento || new Date()}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Nota Média"
                                    name="nota_media"
                                    type="number"
                                    value={formData.nota_media}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Sinopse"
                                    name="sinopse"
                                    value={formData.sinopse}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Quantidade de Temporadas"
                                    name="quant_temporada"
                                    type="number"
                                    value={formData.quant_temporada}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Quantidade de Episódios"
                                    name="quant_episodio"
                                    type="number"
                                    value={formData.quant_episodio}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Link do Poster"
                                    name="poster"
                                    value={formData.poster}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="where_view-label">Onde Assistir</InputLabel>
                                    <Select
                                        labelId="where_view-label"
                                        id="where_view"
                                        name="where_view"
                                        value={formData.where_view}
                                        onChange={handleChange}
                                        label="Onde Assistir"
                                    >
                                        <MenuItem value="netflix">Netflix</MenuItem>
                                        <MenuItem value="globoplay">Globoplay</MenuItem>
                                        <MenuItem value="disney">Disney+</MenuItem>
                                        <MenuItem value="star+">Star+</MenuItem>
                                        <MenuItem value="amazon">Amazon Prime Video</MenuItem>
                                        <MenuItem value="hbo-max">HBO Max</MenuItem>
                                        <MenuItem value="apple-tv">Apple TV+</MenuItem>
                                        <MenuItem value="paramount">Paramount+</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Campo de seleção de gêneros */}
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="generos-label">Selecione os Gêneros:</InputLabel>
                                    <Select
                                        labelId="generos-label"
                                        id="generos"
                                        multiple
                                        value={formData.generos}
                                        onChange={handleGeneroChange}
                                        label="Selecione os Gêneros"
                                    >
                                        {generos.map((genero) => (
                                            <MenuItem key={genero.id} value={genero.id}>
                                                {genero.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="artistas-label">Selecione os Artistas:</InputLabel>
                                    <Select
                                        labelId="artistas-label"
                                        id="artistas"
                                        multiple
                                        value={formData.artistas}
                                        onChange={handleArtistasChange}
                                        label="Selecione os Artistas"
                                    >
                                        {artistas.map((artista) => (
                                            <MenuItem key={artista.id} value={artista.id}>
                                                {artista?.pessoa?.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Campo de seleção de diretores */}
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="diretores-label">Selecione os Diretores:</InputLabel>
                                    <Select
                                        labelId="diretores-label"
                                        id="diretores"
                                        multiple
                                        value={formData.diretores}
                                        onChange={handleDiretoresChange}
                                        label="Selecione os Diretores"
                                    >
                                        {diretores.map((diretor) => (
                                            <MenuItem key={diretor.id} value={diretor.id}>
                                                {diretor.apelido}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Botão de Cadastrar */}
                        <Box mt={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                startIcon={<AddCircleOutlineIcon />}
                                sx={{ borderRadius: 12, backgroundColor: '#597092' }}
                            >
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>

            <SerieList reload={reload} setReload={setReload} />
        </Container>
    );
};

export default SerieForm;
