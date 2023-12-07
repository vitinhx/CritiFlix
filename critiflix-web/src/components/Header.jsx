import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    Button,
    IconButton,
    Grid,
    MenuItem,
    Menu,
} from '@mui/material';
import {
    Search as SearchIcon,
    Movie as MovieIcon,
    Tv as TvIcon,
    AccountCircle as AccountCircleIcon,
    ArrowDropDown as ArrowDropDownIcon,
    Add,
} from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="absolute">
            <Toolbar style={{ width: '100%' }}>
                <Grid container justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
                    {/* Logo à esquerda */}
                    <Grid item>
                        <Typography variant="h6" component="div">
                            <Link to="/home">
                                <img
                                    src="/images/logo.png"
                                    alt="Critiflix Logo"
                                    style={{ width: '100px', height: '70px' }}
                                />
                            </Link>
                        </Typography>
                    </Grid>

                    {/* Área de busca no centro */}
                    <Grid item style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <InputBase
                                placeholder="Pesquisar..."
                                style={{
                                    padding: '8px',
                                    backgroundColor: 'white',
                                    paddingLeft: '15px',
                                    width: '200px',
                                    height: 36,
                                    border: '1px solid rgba(0,0,0,0.28)',
                                    borderRight: 'none',
                                    borderRadius: 5,
                                }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: 0, marginLeft: '-1px' }}
                                onClick={() => navigate('/search/' + search)}
                            >
                                <SearchIcon style={{ color: 'white' }} />
                            </Button>
                        </div>
                    </Grid>


                    {/* Botões à direita */}
                    <Grid item>
                        {localStorage.getItem('can_create') == "true" ?
                            <>
                                < Button color="inherit" component={Link} to="/filme">
                                    <MovieIcon />
                                    Filmes
                                </Button>
                                <Button color="inherit" component={Link} to="/serie/register">
                                    <TvIcon />
                                    Séries
                                </Button>
                                <Button color="inherit" component={Link} to="/temporada">
                                    <Add />
                                    Temporada
                                </Button>
                                <Button color="inherit" component={Link} to="/genero">
                                    <Add />
                                    Gêneros
                                </Button>
                            </> : false
                        }
                        <IconButton color="inherit" component={Link} to="/">
                            <LogoutIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >
    );
};

export default Navbar;
