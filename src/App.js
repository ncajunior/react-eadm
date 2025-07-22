import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  IconButton,
  Divider,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { 
  LocationOn as LocationIcon,
  Place as PlaceIcon,
  Info as InfoIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

// Custom theme com cores da CCPatrimonial
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
  },
});

// Dados do GeoJSON embutidos
const eadmData = {
  "type": "FeatureCollection",
  "features": [
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fbb","geometry":{"type":"Point","coordinates":[-40.7403,-18.9844]},"properties":{"CÓDIGO":"001000000000000","DESCRIÇÃO":"PREFEITURA MUNICIPAL DE ÁGUIA BRANCA","SECRETARIA":"PREFEITURA MUNICIPAL DE ÁGUIA BRANCA","DEPARTAMENTO":"PREFEITURA MUNICIPAL DE ÁGUIA BRANCA","IMAGEM":"https://ab.patriid.com:15001/eadm/001000000000000.png","QTD DEPARTAMENTOS":0,"QTD_LOCAIS":0,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fba","geometry":{"type":"Point","coordinates":[-40.7403,-18.9844]},"properties":{"CÓDIGO":"001001000000000","DESCRIÇÃO":"PREFEITURA MUNICIPAL DE ÁGUIA BRANCA","SECRETARIA":"PREFEITURA MUNICIPAL DE ÁGUIA BRANCA","DEPARTAMENTO":"PREFEITURA MUNICIPAL DE ÁGUIA BRANCA","IMAGEM":"https://ab.patriid.com:15001/eadm/001001000000000.png","QTD DEPARTAMENTOS":0,"QTD_LOCAIS":0,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fb9","geometry":{"type":"Point","coordinates":[-40.7403,-18.9844]},"properties":{"CÓDIGO":"001001001000000","DESCRIÇÃO":"GABINETE DO PREFEITO","SECRETARIA":"GABINETE DO PREFEITO","DEPARTAMENTO":"GABINETE DO PREFEITO","IMAGEM":"https://ab.patriid.com:15001/eadm/001001001000000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fb8","geometry":{"type":"Point","coordinates":[-40.7403,-18.9844]},"properties":{"CÓDIGO":"001001001001000","DESCRIÇÃO":"GABINETE DO PREFEITO","SECRETARIA":"GABINETE DO PREFEITO","DEPARTAMENTO":"GABINETE DO PREFEITO","IMAGEM":"https://ab.patriid.com:15001/eadm/001001001001000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fb7","geometry":{"type":"Point","coordinates":[-40.7403,-18.9844]},"properties":{"CÓDIGO":"001001001002000","DESCRIÇÃO":"PROCURADORIA GERAL","SECRETARIA":"GABINETE DO PREFEITO","DEPARTAMENTO":"PROCURADORIA GERAL","IMAGEM":"https://ab.patriid.com:15001/eadm/001001001002000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fb6","geometry":{"type":"Point","coordinates":[-40.7403,-18.9844]},"properties":{"CÓDIGO":"001001001003000","DESCRIÇÃO":"UNIDADE DE CONTROLE CENTRAL","SECRETARIA":"GABINETE DO PREFEITO","DEPARTAMENTO":"UNIDADE DE CONTROLE CENTRAL","IMAGEM":"https://ab.patriid.com:15001/eadm/001001001003000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fb5","geometry":{"type":"Point","coordinates":[-40.7403,-18.9844]},"properties":{"CÓDIGO":"001001002000000","DESCRIÇÃO":"SECRETARIA DE ADMINISTRAÇÃO","SECRETARIA":"SECRETARIA DE ADMINISTRAÇÃO","DEPARTAMENTO":"SECRETARIA DE ADMINISTRAÇÃO","IMAGEM":"https://ab.patriid.com:15001/eadm/001001002000000.png","QTD DEPARTAMENTOS":5,"QTD_LOCAIS":5,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fb4","geometry":{"type":"Point","coordinates":[-40.7403,-18.9844]},"properties":{"CÓDIGO":"001001002001000","DESCRIÇÃO":"SECRETARIA DE ADMINISTRAÇÃO","SECRETARIA":"SECRETARIA DE ADMINISTRAÇÃO","DEPARTAMENTO":"SECRETARIA DE ADMINISTRAÇÃO","IMAGEM":"https://ab.patriid.com:15001/eadm/001001002001000.png","QTD DEPARTAMENTOS":5,"QTD_LOCAIS":5,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fb3","geometry":{"type":"Point","coordinates":[-40.7403,-18.9847]},"properties":{"CÓDIGO":"001001002002000","DESCRIÇÃO":"ALMOXARIFADO - PATRIMÔNIO","SECRETARIA":"SECRETARIA DE ADMINISTRAÇÃO","DEPARTAMENTO":"ALMOXARIFADO - PATRIMÔNIO","IMAGEM":"https://ab.patriid.com:15001/eadm/001001002002000.png","QTD DEPARTAMENTOS":5,"QTD_LOCAIS":5,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fb2","geometry":{"type":"Point","coordinates":[-40.7401,-18.9856]},"properties":{"CÓDIGO":"001001002003000","DESCRIÇÃO":"ARQUIVO MORTO 01","SECRETARIA":"SECRETARIA DE ADMINISTRAÇÃO","DEPARTAMENTO":"ARQUIVO MORTO 01","IMAGEM":"https://ab.patriid.com:15001/eadm/001001002003000.png","QTD DEPARTAMENTOS":5,"QTD_LOCAIS":5,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fb1","geometry":{"type":"Point","coordinates":[-40.7404,-18.9816]},"properties":{"CÓDIGO":"001001002005000","DESCRIÇÃO":"DELEGACIA DE POLÍCIA CIVIL","SECRETARIA":"SECRETARIA DE ADMINISTRAÇÃO","DEPARTAMENTO":"DELEGACIA DE POLÍCIA CIVIL","IMAGEM":"https://ab.patriid.com:15001/eadm/001001002005000.png","QTD DEPARTAMENTOS":5,"QTD_LOCAIS":5,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fb0","geometry":{"type":"Point","coordinates":[-40.7381,-18.9868]},"properties":{"CÓDIGO":"001001002006000","DESCRIÇÃO":"SALA DO EMPREENDEDOR","SECRETARIA":"SECRETARIA DE ADMINISTRAÇÃO","DEPARTAMENTO":"SALA DO EMPREENDEDOR","IMAGEM":"https://ab.patriid.com:15001/eadm/001001002006000.png","QTD DEPARTAMENTOS":5,"QTD_LOCAIS":5,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7faf","geometry":{"type":"Point","coordinates":[-40.7413,-18.984]},"properties":{"CÓDIGO":"001001003000000","DESCRIÇÃO":"SECRETARIA DE ASSISTÊNCIA SOCIAL","SECRETARIA":"SECRETARIA DE ASSISTÊNCIA SOCIAL","DEPARTAMENTO":"SECRETARIA DE ASSISTÊNCIA SOCIAL","IMAGEM":"https://ab.patriid.com:15001/eadm/001001003000000.png","QTD DEPARTAMENTOS":8,"QTD_LOCAIS":8,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fae","geometry":{"type":"Point","coordinates":[-40.7413,-18.984]},"properties":{"CÓDIGO":"001001003001000","DESCRIÇÃO":"SECRETARIA DE ASSISTÊNCIA SOCIAL","SECRETARIA":"SECRETARIA DE ASSISTÊNCIA SOCIAL","DEPARTAMENTO":"SECRETARIA DE ASSISTÊNCIA SOCIAL","IMAGEM":"https://ab.patriid.com:15001/eadm/001001003001000.png","QTD DEPARTAMENTOS":8,"QTD_LOCAIS":8,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fad","geometry":{"type":"Point","coordinates":[-40.7407,-18.974]},"properties":{"CÓDIGO":"001001003002000","DESCRIÇÃO":"ASSOCIAÇÃO PESTALOZZI ÁGUIA BRANCA","SECRETARIA":"SECRETARIA DE ASSISTÊNCIA SOCIAL","DEPARTAMENTO":"ASSOCIAÇÃO PESTALOZZI ÁGUIA BRANCA","IMAGEM":"https://ab.patriid.com:15001/eadm/001001003002000.png","QTD DEPARTAMENTOS":8,"QTD_LOCAIS":8,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fac","geometry":{"type":"Point","coordinates":[-40.7409,-18.9823]},"properties":{"CÓDIGO":"001001003003000","DESCRIÇÃO":"CAPELA MORTUÁRIA RESSUREIÇÃO","SECRETARIA":"SECRETARIA DE ASSISTÊNCIA SOCIAL","DEPARTAMENTO":"CAPELA MORTUÁRIA RESSUREIÇÃO","IMAGEM":"https://ab.patriid.com:15001/eadm/001001003003000.png","QTD DEPARTAMENTOS":8,"QTD_LOCAIS":8,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fab","geometry":{"type":"Point","coordinates":[-40.7405,-18.9854]},"properties":{"CÓDIGO":"001001003004000","DESCRIÇÃO":"CASA DE PASSAGEM ARI SOUZA MARTINS","SECRETARIA":"SECRETARIA DE ASSISTÊNCIA SOCIAL","DEPARTAMENTO":"CASA DE PASSAGEM ARI SOUZA MARTINS","IMAGEM":"https://ab.patriid.com:15001/eadm/001001003004000.png","QTD DEPARTAMENTOS":8,"QTD_LOCAIS":8,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7faa","geometry":{"type":"Point","coordinates":[-40.74,-18.9819]},"properties":{"CÓDIGO":"001001003005000","DESCRIÇÃO":"CENTRO DE CONVIVÊNCIA DA TERCEIRA IDADE","SECRETARIA":"SECRETARIA DE ASSISTÊNCIA SOCIAL","DEPARTAMENTO":"CENTRO DE CONVIVÊNCIA DA TERCEIRA IDADE","IMAGEM":"https://ab.patriid.com:15001/eadm/001001003005000.png","QTD DEPARTAMENTOS":8,"QTD_LOCAIS":8,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fa9","geometry":{"type":"Point","coordinates":[-40.7413,-18.984]},"properties":{"CÓDIGO":"001001003006000","DESCRIÇÃO":"CONSELHO TUTELAR","SECRETARIA":"SECRETARIA DE ASSISTÊNCIA SOCIAL","DEPARTAMENTO":"CONSELHO TUTELAR","IMAGEM":"https://ab.patriid.com:15001/eadm/001001003006000.png","QTD DEPARTAMENTOS":8,"QTD_LOCAIS":8,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fa8","geometry":{"type":"Point","coordinates":[-40.7403,-18.9821]},"properties":{"CÓDIGO":"001001003007000","DESCRIÇÃO":"CRAS","SECRETARIA":"SECRETARIA DE ASSISTÊNCIA SOCIAL","DEPARTAMENTO":"CRAS","IMAGEM":"https://ab.patriid.com:15001/eadm/001001003007000.png","QTD DEPARTAMENTOS":8,"QTD_LOCAIS":8,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fa7","geometry":{"type":"Point","coordinates":[-40.7373,-18.9905]},"properties":{"CÓDIGO":"001001003008000","DESCRIÇÃO":"INCUBADORA DE EMPRESAS ÁGUIA BRANCA","SECRETARIA":"SECRETARIA DE ASSISTÊNCIA SOCIAL","DEPARTAMENTO":"INCUBADORA DE EMPRESAS ÁGUIA BRANCA","IMAGEM":"https://ab.patriid.com:15001/eadm/001001003008000.png","QTD DEPARTAMENTOS":8,"QTD_LOCAIS":8,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fa6","geometry":{"type":"Point","coordinates":[-40.7382,-18.9846]},"properties":{"CÓDIGO":"001001004000000","DESCRIÇÃO":"SECRETARIA DE DESENVOLVIMENTO RURAL","SECRETARIA":"SECRETARIA DE DESENVOLVIMENTO RURAL","DEPARTAMENTO":"SECRETARIA DE DESENVOLVIMENTO RURAL","IMAGEM":"https://ab.patriid.com:15001/eadm/001001004000000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fa5","geometry":{"type":"Point","coordinates":[-40.7382,-18.9846]},"properties":{"CÓDIGO":"001001004001000","DESCRIÇÃO":"SECRETARIA DE DESENVOLVIMENTO RURAL","SECRETARIA":"SECRETARIA DE DESENVOLVIMENTO RURAL","DEPARTAMENTO":"SECRETARIA DE DESENVOLVIMENTO RURAL","IMAGEM":"https://ab.patriid.com:15001/eadm/001001004001000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fa4","geometry":{"type":"Point","coordinates":[-40.7382,-18.9846]},"properties":{"CÓDIGO":"001001004002000","DESCRIÇÃO":"ASSOCIAÇÕES E SINDICATOS","SECRETARIA":"SECRETARIA DE DESENVOLVIMENTO RURAL","DEPARTAMENTO":"ASSOCIAÇÕES E SINDICATOS","IMAGEM":"https://ab.patriid.com:15001/eadm/001001004002000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fa3","geometry":{"type":"Point","coordinates":[-40.7396,-18.9759]},"properties":{"CÓDIGO":"001001004003000","DESCRIÇÃO":"FÁBRICA DE MANILHAS","SECRETARIA":"SECRETARIA DE DESENVOLVIMENTO RURAL","DEPARTAMENTO":"FÁBRICA DE MANILHAS","IMAGEM":"https://ab.patriid.com:15001/eadm/001001004003000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fa2","geometry":{"type":"Point","coordinates":[-40.7403,-18.9844]},"properties":{"CÓDIGO":"001001005000000","DESCRIÇÃO":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","SECRETARIA":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","DEPARTAMENTO":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","IMAGEM":"https://ab.patriid.com:15001/eadm/001001005000000.png","QTD DEPARTAMENTOS":11,"QTD_LOCAIS":11,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fa1","geometry":{"type":"Point","coordinates":[-40.7403,-18.9844]},"properties":{"CÓDIGO":"001001005001000","DESCRIÇÃO":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","SECRETARIA":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","DEPARTAMENTO":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","IMAGEM":"https://ab.patriid.com:15001/eadm/001001005001000.png","QTD DEPARTAMENTOS":11,"QTD_LOCAIS":11,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7fa0","geometry":{"type":"Point","coordinates":[-40.7376,-18.986]},"properties":{"CÓDIGO":"001001005002000","DESCRIÇÃO":"CENTRO DE CULTURA POLONESA","SECRETARIA":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","DEPARTAMENTO":"CENTRO DE CULTURA POLONESA","IMAGEM":"https://ab.patriid.com:15001/eadm/001001005002000.png","QTD DEPARTAMENTOS":11,"QTD_LOCAIS":11,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f9f","geometry":{"type":"Point","coordinates":[-40.7381,-18.9893]},"properties":{"CÓDIGO":"001001005003000","DESCRIÇÃO":"CMEI HELENISA MOTA DO PRADO","SECRETARIA":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","DEPARTAMENTO":"CMEI HELENISA MOTA DO PRADO","IMAGEM":"https://ab.patriid.com:15001/eadm/001001005003000.png","QTD DEPARTAMENTOS":11,"QTD_LOCAIS":11,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f9e","geometry":{"type":"Point","coordinates":[-40.7407,-18.9813]},"properties":{"CÓDIGO":"001001005004000","DESCRIÇÃO":"DEPARTAMENTO DE ESPORTES","SECRETARIA":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","DEPARTAMENTO":"DEPARTAMENTO DE ESPORTES","IMAGEM":"https://ab.patriid.com:15001/eadm/001001005004000.png","QTD DEPARTAMENTOS":11,"QTD_LOCAIS":11,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f9d","geometry":{"type":"Point","coordinates":[-40.8246,-18.8927]},"properties":{"CÓDIGO":"001001005006000","DESCRIÇÃO":"EMCA FAZENDA LACERDA","SECRETARIA":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","DEPARTAMENTO":"EMCA FAZENDA LACERDA","IMAGEM":"https://ab.patriid.com:15001/eadm/001001005006000.png","QTD DEPARTAMENTOS":11,"QTD_LOCAIS":11,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f9c","geometry":{"type":"Point","coordinates":[-40.7156,-18.9462]},"properties":{"CÓDIGO":"001001005007000","DESCRIÇÃO":"EMCA JOÃO QUIUQUI","SECRETARIA":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","DEPARTAMENTO":"EMCA JOÃO QUIUQUI","IMAGEM":"https://ab.patriid.com:15001/eadm/001001005007000.png","QTD DEPARTAMENTOS":11,"QTD_LOCAIS":11,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f9b","geometry":{"type":"Point","coordinates":[-40.742,-18.9853]},"properties":{"CÓDIGO":"001001005008000","DESCRIÇÃO":"EMEF PADRE SÉRGIO BANZZA","SECRETARIA":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","DEPARTAMENTO":"EMEF PADRE SÉRGIO BANZZA","IMAGEM":"https://ab.patriid.com:15001/eadm/001001005008000.png","QTD DEPARTAMENTOS":11,"QTD_LOCAIS":11,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f9a","geometry":{"type":"Point","coordinates":[-40.6579,-19.0186]},"properties":{"CÓDIGO":"001001005009000","DESCRIÇÃO":"EMEIEF BARRA DA JABUTICABA","SECRETARIA":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","DEPARTAMENTO":"EMEIEF BARRA DA JABUTICABA","IMAGEM":"https://ab.patriid.com:15001/eadm/001001005009000.png","QTD DEPARTAMENTOS":11,"QTD_LOCAIS":11,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f99","geometry":{"type":"Point","coordinates":[-40.7943,-19.0145]},"properties":{"CÓDIGO":"001001005010000","DESCRIÇÃO":"EMEIEF CATARINA ROSSINI BRUNI","SECRETARIA":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","DEPARTAMENTO":"EMEIEF CATARINA ROSSINI BRUNI","IMAGEM":"https://ab.patriid.com:15001/eadm/001001005010000.png","QTD DEPARTAMENTOS":11,"QTD_LOCAIS":11,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f98","geometry":{"type":"Point","coordinates":[-40.7521,-18.919]},"properties":{"CÓDIGO":"001001005011000","DESCRIÇÃO":"EMEIEF CÓRREGO DO CAFÉ","SECRETARIA":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","DEPARTAMENTO":"EMEIEF CÓRREGO DO CAFÉ","IMAGEM":"https://ab.patriid.com:15001/eadm/001001005011000.png","QTD DEPARTAMENTOS":11,"QTD_LOCAIS":11,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f97","geometry":{"type":"Point","coordinates":[-40.6848,-19.0647]},"properties":{"CÓDIGO":"001001005012000","DESCRIÇÃO":"EMEIEF PEDRA TORTA","SECRETARIA":"SECRETARIA DE EDUCAÇÃO, CULTURA, ESPORTES E LAZER","DEPARTAMENTO":"EMEIEF PEDRA TORTA","IMAGEM":"https://ab.patriid.com:15001/eadm/001001005012000.png","QTD DEPARTAMENTOS":11,"QTD_LOCAIS":11,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f96","geometry":{"type":"Point","coordinates":[-40.7403,-18.9844]},"properties":{"CÓDIGO":"001001006000000","DESCRIÇÃO":"SECRETARIA DE FINANÇAS","SECRETARIA":"SECRETARIA DE FINANÇAS","DEPARTAMENTO":"SECRETARIA DE FINANÇAS","IMAGEM":"https://ab.patriid.com:15001/eadm/001001006000000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f95","geometry":{"type":"Point","coordinates":[-40.7403,-18.9844]},"properties":{"CÓDIGO":"001001006001000","DESCRIÇÃO":"SECRETARIA DE FINANÇAS","SECRETARIA":"SECRETARIA DE FINANÇAS","DEPARTAMENTO":"SECRETARIA DE FINANÇAS","IMAGEM":"https://ab.patriid.com:15001/eadm/001001006001000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f94","geometry":{"type":"Point","coordinates":[-40.7381,-18.9868]},"properties":{"CÓDIGO":"001001006002000","DESCRIÇÃO":"SALA DO EMPREENDEDOR","SECRETARIA":"SECRETARIA DE FINANÇAS","DEPARTAMENTO":"SALA DO EMPREENDEDOR","IMAGEM":"https://ab.patriid.com:15001/eadm/001001006002000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f93","geometry":{"type":"Point","coordinates":[-40.7382,-18.9846]},"properties":{"CÓDIGO":"001001006003000","DESCRIÇÃO":"ESPAÇO MUNICIPAL","SECRETARIA":"SECRETARIA DE FINANÇAS","DEPARTAMENTO":"ESPAÇO MUNICIPAL","IMAGEM":"https://ab.patriid.com:15001/eadm/001001006003000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f92","geometry":{"type":"Point","coordinates":[-40.7359,-18.9903]},"properties":{"CÓDIGO":"001001007000000","DESCRIÇÃO":"SECRETARIA DE MEIO AMBIENTE","SECRETARIA":"SECRETARIA DE MEIO AMBIENTE","DEPARTAMENTO":"SECRETARIA DE MEIO AMBIENTE","IMAGEM":"https://ab.patriid.com:15001/eadm/001001007000000.png","QTD DEPARTAMENTOS":1,"QTD_LOCAIS":1,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f91","geometry":{"type":"Point","coordinates":[-40.7359,-18.9903]},"properties":{"CÓDIGO":"001001007001000","DESCRIÇÃO":"SECRETARIA DE MEIO AMBIENTE","SECRETARIA":"SECRETARIA DE MEIO AMBIENTE","DEPARTAMENTO":"SECRETARIA DE MEIO AMBIENTE","IMAGEM":"https://ab.patriid.com:15001/eadm/001001007001000.png","QTD DEPARTAMENTOS":1,"QTD_LOCAIS":1,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f90","geometry":{"type":"Point","coordinates":[-40.7382,-18.9846]},"properties":{"CÓDIGO":"001001008000000","DESCRIÇÃO":"SECRETARIA DE OBRAS E SERVIÇOS URBANOS","SECRETARIA":"SECRETARIA DE OBRAS E SERVIÇOS URBANOS","DEPARTAMENTO":"SECRETARIA DE OBRAS E SERVIÇOS URBANOS","IMAGEM":"https://ab.patriid.com:15001/eadm/001001008000000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f8f","geometry":{"type":"Point","coordinates":[-40.7382,-18.9846]},"properties":{"CÓDIGO":"001001008001000","DESCRIÇÃO":"SECRETARIA DE OBRAS E SERVIÇOS URBANOS","SECRETARIA":"SECRETARIA DE OBRAS E SERVIÇOS URBANOS","DEPARTAMENTO":"SECRETARIA DE OBRAS E SERVIÇOS URBANOS","IMAGEM":"https://ab.patriid.com:15001/eadm/001001008001000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f8e","geometry":{"type":"Point","coordinates":[-40.738,-18.9844]},"properties":{"CÓDIGO":"001001008002000","DESCRIÇÃO":"CENTRO COMERCIALIZAÇÃO FAMILIAR","SECRETARIA":"SECRETARIA DE OBRAS E SERVIÇOS URBANOS","DEPARTAMENTO":"CENTRO COMERCIALIZAÇÃO FAMILIAR","IMAGEM":"https://ab.patriid.com:15001/eadm/001001008002000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f8d","geometry":{"type":"Point","coordinates":[-40.7405,-18.9751]},"properties":{"CÓDIGO":"001001008003000","DESCRIÇÃO":"GARAGEM - OFICINA ","SECRETARIA":"SECRETARIA DE OBRAS E SERVIÇOS URBANOS","DEPARTAMENTO":"GARAGEM - OFICINA ","IMAGEM":"https://ab.patriid.com:15001/eadm/001001008003000.png","QTD DEPARTAMENTOS":3,"QTD_LOCAIS":3,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f8c","geometry":{"type":"Point","coordinates":[-40.7402,-18.987]},"properties":{"CÓDIGO":"001002000000000","DESCRIÇÃO":"UG F.M. SAÚDE - PREFEITURA MUNICIPAL ÁGUIA BRANCA","SECRETARIA":"UG F.M. SAÚDE - PREFEITURA MUNICIPAL ÁGUIA BRANCA","DEPARTAMENTO":"UG F.M. SAÚDE - PREFEITURA MUNICIPAL ÁGUIA BRANCA","IMAGEM":"https://ab.patriid.com:15001/eadm/001002000000000.png","QTD DEPARTAMENTOS":0,"QTD_LOCAIS":0,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f8b","geometry":{"type":"Point","coordinates":[-40.7402,-18.987]},"properties":{"CÓDIGO":"001002001000000","DESCRIÇÃO":"SECRETARIA DE SAÚDE","SECRETARIA":"SECRETARIA DE SAÚDE","DEPARTAMENTO":"SECRETARIA DE SAÚDE","IMAGEM":"https://ab.patriid.com:15001/eadm/001002001000000.png","QTD DEPARTAMENTOS":10,"QTD_LOCAIS":10,"QTD FUNCIONARIOS":0}},
    {"type":"Feature","id":"EADM_FOTO.fid-6259d899_1982f525cc5_-7f8a","geometry":{"type":"Point","coordinates":[-40.7402,-18.987]},"properties":{"CÓDIGO":"001002001001000","DESCRIÇÃO":"SECRETARIA DE SAÚDE","SECRETARIA":"SECRETARIA DE SAÚDE","DEPARTAMENTO":"SECRETARIA DE SAÚDE","IMAGEM":"https://ab.patriid.com:15001/eadm/001002001001000.png","QTD DEPARTAMENTOS":10,"QTD_LOCAIS":10,"QTD FUNCIONARIOS":0}}
  ]
};

// Ícone customizado para os marcadores
const customIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `
    <div style="
      background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      border: 3px solid white;
      box-shadow: 0 3px 10px rgba(0,0,0,0.3);
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <span style="
        color: white;
        font-size: 14px;
        transform: rotate(45deg);
        font-weight: bold;
      ">📍</span>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

// Componente do Header CCPatrimonial
function CCPatrimonialHeader() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Logo Hexagonal */}
        <Box
          sx={{
            width: 60,
            height: 60,
            background: 'rgba(255,255,255,0.2)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '12px',
              textAlign: 'center',
              lineHeight: 1,
            }}
          >
            CC
          </Typography>
        </Box>
        
        {/* Texto do Header */}
        <Box>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
            CCPatrimonial
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Sistema EADM - Estrutura Administrativa Municipal
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// Componente do Popup Material Design
function MaterialPopup({ feature, onClose }) {
  const { properties } = feature;
  
  const getChipColor = (secretaria) => {
    if (!secretaria) return { bgcolor: '#f5f5f5', color: '#666' };
    
    const secretariaUpper = secretaria.toUpperCase();
    
    if (secretariaUpper.includes('SAÚDE')) {
      return { bgcolor: '#e8f5e8', color: '#388e3c' };
    } else if (secretariaUpper.includes('EDUCAÇÃO') || secretariaUpper.includes('CULTURA')) {
      return { bgcolor: '#fff3e0', color: '#f57c00' };
    } else if (secretariaUpper.includes('ASSISTÊNCIA SOCIAL')) {
      return { bgcolor: '#f3e5f5', color: '#7b1fa2' };
    } else if (secretariaUpper.includes('DESENVOLVIMENTO RURAL')) {
      return { bgcolor: '#e0f2f1', color: '#00695c' };
    } else if (secretariaUpper.includes('MEIO AMBIENTE')) {
      return { bgcolor: '#e8f5e8', color: '#2e7d32' };
    } else if (secretariaUpper.includes('OBRAS')) {
      return { bgcolor: '#fff8e1', color: '#f57f17' };
    } else if (secretariaUpper.includes('FINANÇAS')) {
      return { bgcolor: '#e1f5fe', color: '#0277bd' };
    } else if (secretariaUpper.includes('ADMINISTRAÇÃO') || secretariaUpper.includes('PREFEITURA') || secretariaUpper.includes('GABINETE')) {
      return { bgcolor: '#e3f2fd', color: '#1976d2' };
    }
    
    return { bgcolor: '#f5f5f5', color: '#666' };
  };

  const getDepartmentIcon = (departamento) => {
    if (!departamento) return '🏢';
    
    const depUpper = departamento.toUpperCase();
    if (depUpper.includes('ESCOLA') || depUpper.includes('CMEI') || depUpper.includes('EMEF') || depUpper.includes('EMCA') || depUpper.includes('EMEIEF')) {
      return '🏫';
    } else if (depUpper.includes('SAÚDE')) {
      return '🏥';
    } else if (depUpper.includes('DELEGACIA')) {
      return '🚓';
    } else if (depUpper.includes('CAPELA') || depUpper.includes('IGREJA')) {
      return '⛪';
    } else if (depUpper.includes('CULTURA')) {
      return '🎭';
    } else if (depUpper.includes('ESPORTE')) {
      return '⚽';
    } else if (depUpper.includes('EMPREENDEDOR')) {
      return '💼';
    } else if (depUpper.includes('CRAS') || depUpper.includes('ASSISTÊNCIA')) {
      return '🤝';
    } else if (depUpper.includes('GARAGEM') || depUpper.includes('OFICINA')) {
      return '🔧';
    }
    return '🏢';
  };

  return (
    <Card
      sx={{
        minWidth: 320,
        maxWidth: 450,
        m: 1,
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Chip
            label={properties.SECRETARIA || 'Secretaria não informada'}
            size="small"
            sx={{
              ...getChipColor(properties.SECRETARIA),
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
          {onClose && (
            <IconButton
              size="small"
              onClick={onClose}
              sx={{ mt: -1, mr: -1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
          <Typography variant="h4" sx={{ fontSize: '24px' }}>
            {getDepartmentIcon(properties.DEPARTAMENTO)}
          </Typography>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              lineHeight: 1.3,
              flex: 1,
            }}
          >
            {properties.DESCRIÇÃO || properties.DEPARTAMENTO || 'Descrição não disponível'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <LocationIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.2 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
                Código
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                {properties.CÓDIGO || 'Não informado'}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <PlaceIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.2 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
                Departamento
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {properties.DEPARTAMENTO || 'Não informado'}
              </Typography>
            </Box>
          </Box>

          {(properties['QTD DEPARTAMENTOS'] > 0 || properties.QTD_LOCAIS > 0) && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <InfoIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.2 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
                  Estatísticas
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {properties['QTD DEPARTAMENTOS'] > 0 && (
                    <Chip 
                      label={`${properties['QTD DEPARTAMENTOS']} Depto(s)`} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  )}
                  {properties.QTD_LOCAIS > 0 && (
                    <Chip 
                      label={`${properties.QTD_LOCAIS} Local(is)`} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {properties.IMAGEM && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              📸 Imagem disponível no sistema
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

// Componente principal do App
function App() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CCPatrimonialHeader />
        
        <Box sx={{ height: 'calc(100vh - 120px)', position: 'relative' }}>
          <MapContainer
            center={[-18.984, -40.740]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {eadmData.features.map((feature, index) => (
              <Marker
                key={feature.id || feature.properties?.CÓDIGO || index}
                position={[
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0]
                ]}
                icon={customIcon}
                eventHandlers={{
                  click: () => setSelectedFeature(feature),
                }}
              >
                <Popup>
                  <MaterialPopup 
                    feature={feature} 
                    onClose={() => setSelectedFeature(null)}
                  />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
