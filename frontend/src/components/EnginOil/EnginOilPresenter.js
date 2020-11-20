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
  const { rowsPerPage, PATH, startRow, endRow, pageNumber } = props;
  const classes = useStyles();

  const [datas, setDatas] = useState([
    {
      image: '/static/images/cards/contemplative-reptile.jpg',
      date: '2020.09.07',
      where: '태광카센터',
      km: 5500,
    },
    {
      image: '/static/images/cards/contemplative-reptile.jpg',
      date: '2020.10.03',
      where: '쉐보레 서비스 센터',
      km: 6001,
    },
    {
      image: '/static/images/cards/contemplative-reptile.jpg',
      date: '2020.10.03',
      where: '쉐보레 서비스 센터',
      km: 6002,
    },
    {
      image: '/static/images/cards/contemplative-reptile.jpg',
      date: '2020.10.03',
      where: '쉐보레 서비스 센터',
      km: 6003,
    },
    {
      image: '/static/images/cards/contemplative-reptile.jpg',
      date: '2020.10.03',
      where: '쉐보레 서비스 센터',
      km: 6004,
    },
    {
      image: '/static/images/cards/contemplative-reptile.jpg',
      date: '2020.10.03',
      where: '쉐보레 서비스 센터',
      km: 6005,
    },
    {
      image: '/static/images/cards/contemplative-reptile.jpg',
      date: '2020.10.03',
      where: '쉐보레 서비스 센터',
      km: 6006,
    },
    {
      image: '/static/images/cards/contemplative-reptile.jpg',
      date: '2020.10.03',
      where: '쉐보레 서비스 센터',
      km: 6007,
    },
    {
      image: '/static/images/cards/contemplative-reptile.jpg',
      date: '2020.10.03',
      where: '쉐보레 서비스 센터',
      km: 6008,
    },
    {
      image: '/static/images/cards/contemplative-reptile.jpg',
      date: '2020.10.03',
      where: '쉐보레 서비스 센터',
      km: 6009,
    },
  ]);

  return (
    <Container>
      <Grid container spacing={2} className={classes.root}>
        <EnginOilInputContainer classes={classes.card} />
        {datas.length !== 0 &&
          (rowsPerPage > 0
            ? datas.sort(datasSort).slice(startRow, endRow)
            : datas
          ).map((data) => (
            <Grid item key={data.km}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={data.date}
                    height="140"
                    image={data.image}
                    title={data.date}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {data.where}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {data.km} Km
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.button}>
                  <Button size="small" color="primary">
                    수정
                  </Button>
                  <Button size="small" color="primary">
                    삭제
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      <PaginationContainer
        rowsPerPage={rowsPerPage}
        PATH={PATH}
        datas={datas}
        pageNumber={pageNumber}
      />
    </Container>
  );
};

export default EnginOilPresenter;
