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
import AddIcon from '@material-ui/icons/Add';
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
  if (Number(a.change_km) < Number(b.change_km)) {
    return 1;
  }
  if (Number(a.change_km) > Number(b.change_km)) {
    return -1;
  }
  return 0;
}

const EnginOilPresenter = (props) => {
  const { 
    enginoils,
    rowsPerPage, 
    PATH, 
    startRow, 
    endRow, 
    pageNumber, 
    onDelete,
    title,
    onDialogOpen,
    DialogOpen,
    setOnDialogOpen,
    onModify,
    enginoilId
  } = props;
  const classes = useStyles();
  return (
    <Container>
      <Grid container spacing={2} className={classes.root}>
      <Grid item>
      <Card className={classes.card}>
        <CardActionArea style={{ height: 300 }} onClick={onDialogOpen}>
          <CardContent>
            <AddIcon fontSize="large" />
          </CardContent>
        </CardActionArea>
      </Card>
        
      </Grid>
        {enginoils.length !== 0 &&
          (rowsPerPage > 0
            ? enginoils.sort(datasSort).slice(startRow, endRow)
            : enginoils
          ).map((data) => (
            <Grid item key={data.id}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={data.id}
                    height="140"
                    image={data.enginoil_img===null?'not image': 'http://localhost:8000/'+data.enginoil_img}
                    title={data.change_date}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.change_date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {data.center}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {data.change_km} Km
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.button}>
                  <Button size="small" id={data.id} color="primary" onClick={onModify}>
                    수정
                  </Button>
                  <Button size="small" id={data.id} color="primary" onClick={onDelete}>
                    삭제
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <EnginOilInputContainer title={title} enginoilId={enginoilId} onDialogOpen={onDialogOpen} DialogOpen={DialogOpen} setOnDialogOpen={setOnDialogOpen}/>
      </Grid>
      <PaginationContainer
        rowsPerPage={rowsPerPage}
        PATH={PATH}
        datas={enginoils}
        pageNumber={pageNumber}
      />
    </Container>
  );
};

export default EnginOilPresenter;
