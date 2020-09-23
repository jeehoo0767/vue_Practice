import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles =  {
    root : {
        width : '100%',
        overflowX : "auto"
    },
    table : {
        minWidth : 1080
    }
};


const customers =[
    {
    'id' : 1,
    'image' : 'https://placeimg.com/64/64/1',
    'name' : '박지후',
    'birthday' : '961005',
    'gender' : '남자',
    'job' : '학생'
    },
    {
        'id' : 2,
        'image' : 'https://placeimg.com/64/64/2',
        'name' : '홍길동',
        'birthday' : '960305',
        'gender' : '남자',
        'job' : '게이머'
    },
    {
        'id' : 3,
        'image' : 'https://placeimg.com/64/64/3',
        'name' : '손흥민',
        'birthday' : '124045',
        'gender' : '남자',
        'job' : '선수'
    }
];

class App extends React.Component{
    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>이미지</TableCell>
                            <TableCell>생년월일</TableCell>
                            <TableCell>성별</TableCell>
                            <TableCell>직업</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                    customers.map( c => {
                        return (
                        <Customer
                        key = {c.id}
                        id={c.id}
                        image={c.image}
                        name={c.name}
                        birthday ={c.birthday}
                        gender ={c.gender}
                        job = {c.job}
                        />
                        );
                    })
                }
                    </TableBody>
                </Table>
            </Paper>
        );
    };
}

export default withStyles(styles)(App);
