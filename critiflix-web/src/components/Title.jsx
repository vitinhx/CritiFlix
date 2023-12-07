import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Title({ title, backgroundColor = '#efcfad', prefix }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${prefix}/${title.id}`);
    }

    return (
        <div onClick={handleClick} style={{ display: 'flex', cursor: 'pointer', backgroundColor: backgroundColor, padding: 10, spacing: 10, borderRadius: 10, height: 'calc(100% - 16px)' }} spacing={2}>
            <div style={{ width: '90%', marginRight: 10 }}>
                <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>{title.titulo?.nome}</div>
                <div style={{ fontWeight: '400', fontSize: 17, marginBottom: 10 }}>{moment(title.titulo?.data_lancamento).format('DD/MM/YYYY')}</div>

                <div style={{ textAlign: 'justify', marginBottom: 10 }}>
                    {title.titulo?.sinopse}
                </div>

                <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 5 }}>Categorias</div>

                    {title?.generos && title.generos.map((genero) => (
                        <span key={genero.id} style={{ backgroundColor: 'green', padding: 5, color: 'white', borderRadius: 5, marginRight: 5 }}>
                            {genero.nome}
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <div>
                    <img
                        style={{ borderRadius: 10 }}
                        width={'100%'}
                        src={title.titulo?.poster}
                    />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <img
                        width={15}
                        src="https://pngimg.com/d/star_PNG41474.png"
                    />
                    <img
                        width={15}
                        src="https://pngimg.com/d/star_PNG41474.png"
                    />
                    <img
                        width={15}
                        src="https://pngimg.com/d/star_PNG41474.png"
                    />
                    <img
                        width={15}
                        src="https://pngimg.com/d/star_PNG41474.png"
                    />

                </div>
            </div>
        </div>
    )
}