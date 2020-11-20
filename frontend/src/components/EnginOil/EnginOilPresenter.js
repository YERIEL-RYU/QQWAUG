import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import EnginOilInputContainer from './EnginOilInputContainer';
import PaginationContainer from '../Pagination/PaginationContainer';

const useStyles = makeStyles({
  root: {
    background: '#eeeeee',
    width: 1350,
    display: 'center',
  },
  card: {
    width: 250,
    textAlign: 'center',
    height: 300,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 50,
  },
});
function datasSort(a, b) {
  if (Number(a.km) < Number(b.km)) {
    return 1;
  }
  if (Number(a.km) > Number(b.km)) {
    return -1;
  }
  return 0;
}

const EnginOilPresenter = (props) => {
  const {
    rowsPerPage,
    PATH,
    startRow,
    endRow,
    pageNumber,
    enginoils,
    onDelete,
  } = props;
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={2} className={classes.root}>
        <EnginOilInputContainer classes={classes.card} />
        {/* {enginoils.length !== 0 &&
          (rowsPerPage > 0
            ? enginoils.sort(datasSort).slice(startRow, endRow)
            : enginoils
          ).map((enginoil) => (
            <Grid item key={enginoil.km}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={enginoil.date}
                    height="140"
                    image={enginoil.image}
                    title={enginoil.date}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {enginoil.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {enginoil.where}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {enginoil.km} Km
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.button}>
                  <Button size="small" color="primary">
                    수정
                  </Button>
                  <Button size="small" color="primary" onClick={onDelete}>
                    삭제
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))} */}
      </Grid>
      {/* <PaginationContainer
        rowsPerPage={rowsPerPage}
        PATH={PATH}
        enginoils={enginoils}
        pageNumber={pageNumber}
      /> */}
    </Container>
  );
};

export default EnginOilPresenter;
