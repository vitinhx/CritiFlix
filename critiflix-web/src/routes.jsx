import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Show from './pages/Show';
import SerieForm from './pages/Serie/Register';
import SerieEdit from './pages/Serie/Register/SerieEdit';
import RegisterTemp from './pages/Temporada/Register';
import TemporadaEdicao from './pages/Temporada/TemporadaEdicao';
import EpisodioCadastro from './pages/Episodio/EpisodioCadastro';
import FilmeForm from './pages/Filme/FilmeForm';
import TituloFilmeEdit from './pages/Filme/TituloFilmeEdit';
import GeneroCadastro from './pages/Genero/GeneroCadastro';
import Search from './pages/Search';
import Login from './pages/Login';
import CadastroUsuario from './pages/Register';
import ShowF from './pages/ShowF';

/* Não necessita de verificar a autorização, pois o compontente Header, o faz */
const PrivateRoute = ({ element: Element }) => (
  <>
    <Header />
    <div style={{ marginTop: 70 }}>


      <Element />
    </div>
  </>
)

export default function Routes() {
  return (
    <>
      <Switch>
        {/* Rotas acessadas sem autenticação */}
        {/* <Route path='/' exact element={<Login />} /> */}

        {/* Rotas acessadas somente com autenticação */}
        <Route path='/home' element={<PrivateRoute element={Home} />} />
        <Route path='/show/:id' element={<PrivateRoute element={Show} />} />
        <Route path='/showf/:id' element={<PrivateRoute element={ShowF} />} />
        <Route path='/serie/register' element={<PrivateRoute element={SerieForm} />} />
        <Route path='/serie/edit/:id' element={<PrivateRoute element={SerieEdit} />} />


        <Route path='/temporada' element={<PrivateRoute element={RegisterTemp} />} />
        <Route path='/temporada/:id' element={<PrivateRoute element={TemporadaEdicao} />} />

        <Route path='/filme' element={<PrivateRoute element={FilmeForm} />} />
        <Route path='/filme/:id' element={<PrivateRoute element={TituloFilmeEdit} />} />

        <Route path='/genero' element={<PrivateRoute element={GeneroCadastro} />} />
        {/* <Route path='/genero/:id' element={<PrivateRoute element={TituloFilmeEdit} />} /> */}

        <Route path='/search/:search' element={<PrivateRoute element={Search} />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<CadastroUsuario />} />



        <Route path='/episodio/:id_serie/:id_temporada' element={<PrivateRoute element={EpisodioCadastro} />} />

        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </>
  );
}