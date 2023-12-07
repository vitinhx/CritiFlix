import React, { useState, useEffect } from "react";
import axios from 'axios';
import List from "./List";
import './styles.css';

const Home = () => {
    const [filmes, setFilmes] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchFilmes = async () => {
            try {
                const filter = {
                    include: ['titulo'],
                };

                const responseFilmes = await axios.get(`http://localhost:3000/filmes?filter=${JSON.stringify(filter)}`);
                setFilmes(responseFilmes.data);
            } catch (error) {
                console.error('Erro ao obter filmes', error);
            }
        };

        const fetchSeries = async () => {
            try {
                const filter = {
                    include: ['titulo'],
                };

                const responseSeries = await axios.get(`http://localhost:3000/series?filter=${JSON.stringify(filter)}`);
                setSeries(responseSeries.data);
            } catch (error) {
                console.error('Erro ao obter séries', error);
            }
        };

        fetchFilmes();
        fetchSeries();
    }, []);

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

export default Home;
