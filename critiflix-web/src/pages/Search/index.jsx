import React, { useState, useEffect } from "react";
import axios from 'axios';
import List from "./List";
import './styles.css';
import { useParams } from "react-router-dom";

const Search = () => {
    const { search } = useParams();
    const [filmes, setFilmes] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchFilmes = async () => {
            try {
                const filter = {
                    include: [{ relation: 'titulo' }],
                };

                const responseFilmes = await axios.get(`http://localhost:3000/filmes?filter=${JSON.stringify(filter)}`);
                const responseSeries = await axios.get(`http://localhost:3000/series?filter=${JSON.stringify(filter)}`);

                const dataFilme = responseFilmes.data.filter((i) => {
                    const regex = new RegExp(".*" + search + ".*", "i");
                    return regex.test(i.titulo.nome);
                });

                const dataSerie = responseSeries.data.filter((i) => {
                    const regex = new RegExp(".*" + search + ".*", "i");
                    return regex.test(i.titulo.nome);
                });

                setSeries(dataSerie);
                setFilmes(dataFilme);
            } catch (error) {
                console.error('Erro ao obter filmes', error);
            }
        };

        fetchFilmes();
    }, [search]);

    return (
        <div className="App">
            <main style={{ marginTop: 50 }}>
                <section id="filmes">
                    <List titles={filmes} label={"FILMES"} prefix='showf' />
                </section>
                <section id="series">
                    <div style={{ height: 30, width: '100%' }}></div>
                    <List titles={series} label={"SÉRIES"} prefix='show' />
                </section>
            </main>
        </div>
    );
};

export default Search;
