import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface CardUBSProps {
  ubs: UBS;
}

type UBS = {
  id: number;
  nome: string;
  endereco: string;
  horario: string;
};

const CardUBS: React.FC<CardUBSProps> = ({ ubs }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{ubs.nome}</Typography>
        <Typography variant="body2">{ubs.endereco}</Typography>
        <Typography variant="body2">{ubs.horario}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardUBS;