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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
    root : {
        width : '100%',
        minWidth: 1080
    },
    menu: {
        marginTop : 15,
        marginBottom : 15,
        display:'flex',
        justifyContent : 'center'
    },
    paper :{
        marginLeft : 18,
        marginRight : 18
    },
    progress: {
        margin : theme.spacing.unit *2
    },
    menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
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
        const cellList = ["번호", "이름", "프로필 이미지", "생년월일", "성별", "직업", "설정"];
        return(
            <div className={classes.root}>
                  <AppBar position="static">
                        <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            고객 관리 시스템
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                            <SearchIcon />
                            </div>
                            <InputBase
                            placeholder="검색하기"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.menu}>
                        <CustomerAdd stateRefresh={this.stateRefresh}/>
                    </div>
                <Paper className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {cellList.map(c =>{
                                    return <TableCell className={classes.tableHead}>{c}</TableCell>
                                })}
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
            </div>
        );
    };
}

export default withStyles(styles)(App);