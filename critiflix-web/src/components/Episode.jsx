export default function Episode({ episode }) {


    return (
        <div style={{ marginBottom: 10, border: 'solid 1px black', borderRadius: 10, padding: 10 }}>
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                {episode.number}. {episode.name} - {episode.duracao}min
            </div>
            <div style={{ textAlign: 'justify', marginLeft: 20 }}>
                {episode.sinopse}
            </div>
        </div>
    )
}