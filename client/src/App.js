import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { ThemeProvider, withStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
    root : {
        width : '100%',
        overflowX : "auto"
    },
    table : {
        minWidth : 1080
    },
    progress: {
        margin : theme.spacing.unit *2
    },
});

// const customers = [
//     {
//     'id' : 1,
//     'image' : 'https://placeimg.com/64/64/1',
//     'name' : '박지후',
//     'birthday' : '961005',
//     'gender' : '남자',
//     'job' : '학생'
//     },
//     {
//         'id' : 2,
//         'image' : 'https://placeimg.com/64/64/2',
//         'name' : '홍길동',
//         'birthday' : '960305',
//         'gender' : '남자',
//         'job' : '게이머'
//     },
//     {
//         'id' : 3,
//         'image' : 'https://placeimg.com/64/64/3',
//         'name' : '손흥민',
//         'birthday' : '124045',
//         'gender' : '남자',
//         'job' : '선수'
//     }
// ];

/* 리액트 라이프사이클
1) constructor()

2) componentWillMount()

3) render()

4) componentDidMount()

*컴포넌트의 props or state가 변경될때 =>
shoulddComponentUpdate() 함수 실행 후 render() 함수를 불러와서 화면 랜더링 
*/


class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            customers:"",
            completes:0
        }
    }


    stateRefresh = () =>{
        this.setState({
            customers : "",
            completed:0
        });
        this.callApi()
            .then(res => this.setState({customers : res}))
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => this.setState({customers : res}))
            .catch(err => console.log(err))
    }

   callApi = async () => {
        const response = await fetch('/api/customers');
        const body = await response.json();
        console.log(body);
        return body;
    }

    progress = () =>{
        const { completed } = this.state;
        this.setState({ completed : completed >=100 ? 0 : completed +1});
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
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
                                <TableCell>설정</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                        (this.state.customers ? this.state.customers.map( c => {
                            return (
                            <Customer
                            stateRefresh={this.stateRefresh}
                            key = {c.id}
                            id={c.id}
                            image={c.image}
                            name={c.name}
                            birthday ={c.birthday}
                            gender ={c.gender}
                            job = {c.job}
                            />
                            );
                        }) : 
                            <TableRow>
                                <TableCell colSpan="6" align="center">
                                    <CircularProgress className={classes.progress} value={this.state.completed}/>
                                </TableCell>
                            </TableRow>
                        ) 
                        // 고객 데이터가 있다면, 없으면 빈 문자열 
                    }
                        </TableBody>
                    </Table>
                </Paper>
                <CustomerAdd stateRefresh={this.stateRefresh}/>
            </div>
        );
    };
}

export default withStyles(styles)(App);