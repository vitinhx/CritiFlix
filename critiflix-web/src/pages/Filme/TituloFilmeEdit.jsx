// TituloFilmeEdit.js
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
    Box,
    FormControl,
    InputLabel,
    Select,
} from '@mui/material';
import moment from 'moment';
import { AddCircleOutline } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';

const TituloFilmeEdit = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [filmeData, setFilmeData] = useState({
        nome: '',
        orcamento: '',
        data_lancamento: '',
        nota_media: '',
        sinopse: '',
        duracao: '',
        ano_producao_inicial: '',
        ano_producao_final: '',
        distribuidor: '',
        where_view: '',
        poster: ''
    });

    const [generos, setGeneros] = useState([]);
    const [selectedGeneros, setSelectedGeneros] = useState([]);


    const fetchSelectedGeneros = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/titulo-generos?filter={"where":{"tituloId":${filmeData.titulo.id}}}`);
            const generosIds = response.data.map((item) => item.generoId);
            setSelectedGeneros(generosIds);
        } catch (error) {
            console.error('Erro ao obter os gêneros associados', error);
        }
    };

    const fetchFilme = async () => {
        try {
            const filter = {
                include: ['titulo'],
            };

            const { data } = await axios.get(`http://localhost:3000/filmes/${id}?filter=${JSON.stringify(filter)}`);
            setFilmeData({ ...data, ...data.titulo, data_lancamento: moment(data.titulo.data_lancamento).format('YYYY-MM-DD') });

            console.log({ ...data, ...data.titulo, data_lancamento: moment(data.titulo.data_lancamento).format('YYYY-MM-DD') })
        } catch (error) {
            console.error('Erro ao obter o filme para edição', error);
        }
    };

    const fetchGeneros = async () => {
        try {
            const response = await axios.get('http://localhost:3000/generos');
            setGeneros(response.data);
        } catch (error) {
            console.error('Erro ao obter os gêneros', error);
        }
    };

    useEffect(() => {
        fetchFilme();
        fetchGeneros();
    }, [id]);

    useEffect(() => {
        if (filmeData?.titulo?.id)
            fetchSelectedGeneros();
    }, [filmeData?.titulo?.id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilmeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            // Atualizar o título primeiro
            const dataTitulo = {
                nome: filmeData.nome,
                orcamento: parseFloat(filmeData.orcamento),
                data_lancamento: moment(filmeData.data_lancamento).toISOString(),
                nota_media: parseFloat(filmeData.nota_media),
                sinopse: filmeData.sinopse,
                where_view: filmeData.where_view,
                poster: filmeData.poster
            };

            await axios.put(`http://localhost:3000/titulos/${filmeData.titulo.id}`, dataTitulo);

            // Atualizar o filme com o ID do título
            const dataFilme = {
                duracao: parseFloat(filmeData.duracao),
                ano_producao_inicial: parseInt(filmeData.ano_producao_inicial),
                ano_producao_final: parseInt(filmeData.ano_producao_final),
                distribuidor: filmeData.distribuidor,
                id_titulo: filmeData.titulo.id,
            };

            await axios.patch(`http://localhost:3000/filmes/${id}`, dataFilme);

            try {
                await axios.delete(`http://localhost:3000/titulo-generos/${filmeData.titulo.id}`);
            } catch (e) { console.log('nao apagou os generos') }
            for (const generoId of selectedGeneros) {
                const dataTituloGenero = {
                    tituloId: filmeData.titulo.id,
                    generoId: generoId,
                };

                await axios.post('http://localhost:3000/titulo-generos', dataTituloGenero);
            }

            navigate('/filme');
            // Lógica adicional após a atualização, se necessário
        } catch (error) {
            console.error('Erro ao atualizar o filme', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 8, marginTop: 4 }}>
                <Typography variant="h4" component="h1" fontWeight="bold" align='center'>
                    Editar Filme
                </Typography>
                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nome"
                                    name="nome"
                                    value={filmeData.nome}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Orçamento"
                                    name="orcamento"
                                    value={filmeData.orcamento}
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
                                    value={filmeData.data_lancamento}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Nota Média"
                                    name="nota_media"
                                    type="number"
                                    inputProps={{ inputMode: 'decimal', step: '0.1' }}
                                    value={filmeData.nota_media}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Duração"
                                    type="number"
                                    name="duracao"
                                    value={filmeData.duracao}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Ano de Produção Inicial"
                                    type="number"
                                    name="ano_producao_inicial"
                                    value={filmeData.ano_producao_inicial}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Ano de Produção Final"
                                    type="number"
                                    name="ano_producao_final"
                                    value={filmeData.ano_producao_final}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    label="Poster"
                                    name="poster"
                                    value={filmeData.poster}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Distribuidor"
                                    name="distribuidor"
                                    value={filmeData.distribuidor}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth style={{ marginTop: 15 }}>
                                    <InputLabel id="where_view-label">Onde Assistir</InputLabel>
                                    <Select
                                        labelId="where_view-label"
                                        id="where_view"
                                        name="where_view"
                                        value={filmeData.where_view}
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
                            {/* Adicione os demais campos de edição conforme necessário */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Sinopse"
                                    name="sinopse"
                                    multiline
                                    rows={4}
                                    value={filmeData.sinopse}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Gêneros"
                                    name="generos"
                                    SelectProps={{
                                        multiple: true,
                                        value: selectedGeneros,
                                        onChange: (e) => setSelectedGeneros(e.target.value),
                                    }}
                                    margin="normal"
                                >
                                    {generos.map((genero) => (
                                        <MenuItem key={genero.id} value={genero.id}>
                                            {genero.nome}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Box mt={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpdate}
                                startIcon={<AddCircleOutline />}
                                sx={{ borderRadius: 12, backgroundColor: '#597092' }}
                            >
                                Atualizar Filme
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </Container>
    );
};

export default TituloFilmeEdit;
