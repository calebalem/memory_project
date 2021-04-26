import { Container, Grid, Grow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import {getPosts} from '../../actions/posts';
import useStyles from './styles';
const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId,dispatch])
    const classes = useStyles();
    return (
        <Grow in>
        <Container >
            <Grid className={classes.mainContainer} container  justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12}  sm={12} md={6}>
                    <Posts currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
        </Container>
    </Grow>
    )
}

export default Home
