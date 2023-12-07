// SerieEdit.js
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
  MenuItem,
} from '@mui/material';
import moment from 'moment';
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';

const SerieEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [serieData, setSerieData] = useState({
    nome: '',
    orcamento: '',
    data_lancamento: '',
    nota_media: '',
    sinopse: '',
    quant_temporada: '',
    quant_episodio: '',
    poster: '',
  });

  const [generos, setGeneros] = useState([]);
  const [selectedGeneros, setSelectedGeneros] = useState([]);

  const fetchSelectedGeneros = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/titulo-generos?filter={"where":{"tituloId":${serieData.titulo.id}}}`);
      const generosIds = response.data.map((item) => item.generoId);
      setSelectedGeneros(generosIds);
    } catch (error) {
      console.error('Erro ao obter os gêneros associados', error);
    }
  };

  const fetchSerie = async () => {
    try {
      const filter = {
        include: ['titulo'],
      };

      const { data } = await axios.get(`http://localhost:3000/series/${id}?filter=${JSON.stringify(filter)}`);
      setSerieData({ ...data, ...data.titulo, data_lancamento: moment(data.titulo.data_lancamento).format('YYYY-MM-DD') });
    } catch (error) {
      console.error('Erro ao obter a série para edição', error);
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
    fetchSerie();
    fetchGeneros();
  }, [id]);

  useEffect(() => {
    if (serieData?.titulo?.id)
      fetchSelectedGeneros();
  }, [serieData?.titulo?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSerieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const dataTitle = {
        nome: serieData.nome,
        orcamento: parseFloat(serieData.orcamento),
        data_lancamento: moment(serieData.data_lancamento).toISOString(),
        nota_media: parseFloat(serieData.nota_media),
        sinopse: serieData.sinopse,
        where_view: "DISNEY",
        poster: serieData.poster
      };

      await axios.put(`http://localhost:3000/titulos/${serieData.titulo.id}`, dataTitle);

      const dataSerie = {
        quant_temporada: parseFloat(serieData.quant_temporada),
        quant_episodio: parseFloat(serieData.quant_episodio)
      };

      await axios.patch(`http://localhost:3000/series/${id}`, dataSerie);

      try {
        await axios.delete(`http://localhost:3000/titulo-generos/${serieData.titulo.id}`);
      } catch (e) { console.log('nao apagou os generos') }

      for (const generoId of selectedGeneros) {
        const dataTituloGenero = {
          tituloId: serieData.titulo.id,
          generoId: generoId,
        };

        await axios.post('http://localhost:3000/titulo-generos', dataTituloGenero);
      }

      navigate('/serie/register');
      // Lógica adicional após a atualização, se necessário
    } catch (error) {
      console.error('Erro ao atualizar a série', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 8, marginTop: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" align='center'>
          Editar Série
        </Typography>
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="nome"
                  value={serieData.nome}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Orçamento"
                  name="orcamento"
                  value={serieData.orcamento}
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
                  value={serieData.data_lancamento}
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
                  value={serieData.nota_media}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Link do Poster"
                  name="poster"
                  value={serieData.poster}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              {/* Adicione os demais campos de edição conforme necessário */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Sinopse"
                  name="sinopse"
                  multiline
                  rows={4}
                  value={serieData.sinopse}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Temporadas"
                  name="quant_temporada"
                  type="number"
                  value={serieData.quant_temporada}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Episódios"
                  name="quant_episodio"
                  type="number"
                  value={serieData.quant_episodio}
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
                startIcon={<AddCircleOutlineIcon />}
                sx={{ borderRadius: 12, backgroundColor: '#597092' }}
              >
                Atualizar Série
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default SerieEdit;
