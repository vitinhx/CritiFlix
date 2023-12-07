import { Grid } from "@mui/material";
import Title from "../../components/Title";

export default function List({ titles, label, prefix }) {


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div style={{ display: "flex", marginBottom: 20 }}>
                    <div style={{ height: "100%", width: 10, backgroundColor: 'green', borderRadius: 5 }}>&nbsp;</div>

                    <div>&nbsp;{label}</div>
                </div>
            </Grid>

            {
                titles.map((title, key) => (
                    <Grid item md={4} key={key}>
                        <Title title={title} prefix={prefix} backgroundColor={'#9acfa5'} />
                    </Grid>
                ))
            }
        </Grid>
    )
}