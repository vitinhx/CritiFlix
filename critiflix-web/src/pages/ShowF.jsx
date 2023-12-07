import { Grid, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Episode from "../components/Episode";
import SendIcon from "@mui/icons-material/Send";


const ENTERPRISES = {
    'netflix': {
        name: 'Netflix',
        logo: 'https://www.imagensempng.com.br/wp-content/uploads/2023/05/317-3.png'
    },
    'globoplay': {
        name: 'Globoplay',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Globoplay_logo_2020.svg/2560px-Globoplay_logo_2020.svg.png'
    },
    'disney': {
        name: 'Disney+',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/archive/7/77/20230514165915%21Disney_Plus_logo.svg'
    },
    'star+': {
        name: 'Star+',
        logo: 'https://static-assets.bamgrid.com/product/starplus/images/share-default.d72cf588f6d06cba22171f5ae44289d3.png'
    },
    'amazon': {
        name: 'Amazon Prime Video',
        logo: 'https://i.pinimg.com/1200x/7d/53/6b/7d536b5057d6b0d50986a1ec155b034a.jpg'
    },
    'hbo-max': {
        name: 'HBO Max',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO_Max_Logo.svg/2560px-HBO_Max_Logo.svg.png'
    },
    'apple-tv': {
        name: 'Apple TV+',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Apple_TV_Plus_Logo.svg/1024px-Apple_TV_Plus_Logo.svg.png'
    },
    'paramount': {
        name: 'Paramount+',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Paramount%2B_logo.png'
    }
};



export default function ShowF() {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [reviewData, setReviewData] = useState({ descricao: "", nota: '' });

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSendReview = async () => {
        try {
            const idUsuario = localStorage.getItem("id_user");

            if (!idUsuario) {
                alert("ID do usuário não encontrado. Faça login para avaliar.");
                return;
            }

            const reviewPayload = {
                descricao: reviewData.descricao,
                nota: parseFloat(reviewData.nota),
                id_usuario: parseInt(idUsuario),
                id_titulo: parseInt(filme.id_titulo),
            };

            // Fazer a requisição para a rota de avaliações
            await axios.post("http://localhost:3000/avaliacaos", reviewPayload);

            // Limpar o estado dos dados da avaliação após o envio
            setReviewData({ descricao: "", nota: 0 });

            alert("Avaliação enviada com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar a avaliação:", error);
            alert("Erro ao enviar a avaliação. Tente novamente mais tarde.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) return;

                // Fazer uma requisição para obter os detalhes da série ou filme
                const response = await axios.get(`http://localhost:3000/filmes/${id}`); // Substitua com a sua URL e endpoint correto

                setFilme(response.data);
            } catch (error) {
                console.error("Erro ao obter os detalhes da série/filme:", error);
                // Tratar erro, por exemplo, redirecionar para uma página de erro
            }
        };

        fetchData();
    }, [id]);

    console.log(filme.titulo?.where_view.toLowerCase())

    return (
        <Grid container justifyContent={"center"} padding={2} style={{ backgroundColor: "#efcfad", backgroundClip: "content-box", borderRadius: 30 }}>
            <Grid item xs={12} md={8} padding={2}>
                <div style={{ fontSize: 30, fontWeight: "bold", marginBottom: 10 }}>{filme.titulo?.nome}</div>
                <div style={{ marginBottom: 20 }}>{filme.titulo?.sinopse}</div>

                <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <span style={{ height: "100%", width: 10, backgroundColor: "orange", borderRadius: 5 }}>&nbsp;&nbsp;</span>
                        <span style={{ fontSize: 20, fontWeight: "bold" }}>&nbsp;Onde Assistir</span>
                        <div style={{ marginLeft: 20 }}>
                            {
                                filme.titulo?.where_view ?
                                    <img style={{ backgroundColor: "white", borderRadius: 10, maxWidth: '100%' }} width={100} src={ENTERPRISES[filme.titulo?.where_view.toLowerCase()].logo} alt="Onde Assistir" /> : false
                            }

                        </div>
                    </div>

                    <div>
                        <span style={{ height: "100%", width: 10, backgroundColor: "orange", borderRadius: 5 }}>&nbsp;&nbsp;</span>
                        <span style={{ fontSize: 20, fontWeight: "bold" }}>&nbsp;Adicionar Comentário</span>
                        <div style={{ marginLeft: 20 }}>
                            <TextField
                                sx={{ background: "#fff", borderRadius: 1 }}
                                placeholder="Descrição da Avaliação"
                                multiline
                                rows={2}
                                name="descricao"
                                value={reviewData.descricao}
                                onChange={handleReviewChange}
                            />
                            <TextField
                                sx={{ background: "#fff", borderRadius: 1, height: 79, width: 60 }}
                                placeholder="Nota (0-10)"
                                type="number"
                                name="nota"
                                value={reviewData.nota}
                                onChange={handleReviewChange}
                            />
                            <Button variant="contained" color="primary" style={{ height: 78, marginLeft: 2 }} onClick={handleSendReview}>
                                <SendIcon fontSize="small" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Grid>

            <Grid item xs={12} md={4} style={{ textAlign: "center" }} padding={2}>
                <div>
                    <img height={"100%"} style={{ borderRadius: 10, maxWidth: '100%', maxHeight: '100%' }} src={filme.titulo?.poster} alt={`Poster de ${filme.titulo?.nome}`} />

                    <button style={{ backgroundColor: "#e68530", color: "white", borderRadius: 20, width: "79%" }}>
                        Assistir mais tarde
                    </button>
                </div>
            </Grid>
        </Grid>
    );
}
