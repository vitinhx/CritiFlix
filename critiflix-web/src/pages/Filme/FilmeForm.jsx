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
import TituloFilmeList from './TituloFilmeList';

const TituloFilmeForm = () => {
  const initialFormData = {
    nome: '',
    orcamento: '',
    data_lancamento: '',
    nota_media: '',
    sinopse: '',
    duracao: '',
    ano_producao_inicial: '',
    ano_producao_final: '',
    distribuidor: '',
    generos: [],
    artistas: [],
    diretores: [],
    where_view: '',
    poster: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [generos, setGeneros] = useState([]);
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
      // Cadastrar o título primeiro
      const dataTitulo = {
        nome: formData.nome,
        orcamento: parseFloat(formData.orcamento),
        data_lancamento: new Date(formData.data_lancamento),
        nota_media: parseFloat(formData.nota_media),
        sinopse: formData.sinopse,
        where_view: formData.where_view,
        poster: formData.poster
      };

      const { data: { id: idTitulo } } = await axios.post('http://localhost:3000/titulos', dataTitulo);

      const dataFilme = {
        duracao: parseFloat(formData.duracao),
        ano_producao_inicial: parseInt(formData.ano_producao_inicial),
        ano_producao_final: parseInt(formData.ano_producao_final),
        distribuidor: formData.distribuidor,
        id_titulo: idTitulo
      };

      await axios.post('http://localhost:3000/filmes', dataFilme);

      // Cadastrar os gêneros para o título
      for (const generoId of formData.generos) {
        const dataTituloGenero = {
          tituloId: idTitulo,
          generoId: generoId,
        };
        await axios.post('http://localhost:3000/titulo-generos', dataTituloGenero);
      }

      // Cadastrar os artistas para o filme
      for (const artistaId of formData.artistas) {
        const dataFilmeArtista = {
          tituloId: idTitulo,
          artistaId: artistaId,
        };
        await axios.post('http://localhost:3000/atuacaos', dataFilmeArtista);
      }

      // Cadastrar os diretores para o filme
      for (const diretorId of formData.diretores) {
        const dataFilmeDiretor = {
          tituloId: idTitulo,
          diretorId: diretorId,
        };
        await axios.post('http://localhost:3000/direcaos', dataFilmeDiretor);
      }

      setReload(true);
      alert('Filme cadastrado com sucesso');
      clearForm();
      // Lógica adicional após o cadastro, se necessário
    } catch (error) {
      alert('Erro ao cadastrar o filme', error);
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
            Cadastro de Filme
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
                  label="Duração"
                  type="number"
                  name="duracao"
                  value={formData.duracao}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Ano de Produção Inicial"
                  type="number"
                  name="ano_producao_inicial"
                  value={formData.ano_producao_inicial}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Ano de Produção Final"
                  type="number"
                  name="ano_producao_final"
                  value={formData.ano_producao_final}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Poster"
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Distribuidor"
                  name="distribuidor"
                  value={formData.distribuidor}
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
              {/* Outros campos ... */}
              {/* Campo de seleção de gêneros */}
              <Grid item xs={12}>
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

              {/* Campo de seleção de artistas */}
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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

      <TituloFilmeList reload={reload} setReload={setReload} />
    </Container >
  );
};

export default TituloFilmeForm;
