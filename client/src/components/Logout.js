import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { ThemeProvider, withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open:false
        }
    }

    handleClickOpen = () =>{
        this.setState({
            open:true
        })
    }

    handleClose = () => {
        this.setState({
            open:false
        })
    }

    handleLogout =  (e) =>{
       this.callApi()
       .then(res => console.log(res));
        this.props.stateRefresh();
    }

    callApi = async () => {
        const response = await fetch('/api/logout', {method : 'delete'});
        const body = await response.json();
        // console.log(body);
        return body;
    }

    // handleLogout =  (e) =>{
    //     const url = '/api/logout';
    //     fetch(url, {
    //         method : 'delete'
    //     })
    //     .then((response)=>{
    //         console.log(response.json());
    //     })
    // }


    render(){
        return(
            // <Button color="inherit" onClick={this.handleLogout}> 
            //       {/* {
            //            (() => {
            //             if(session.getAttribute("id")){return <div>세션이있네</div>}
            //             else{return <div>세션이없네</div>}
            //           })()
            //         } */}
            //         로그아웃
            // </Button>
              <div>
              <Button  color="inherit" onClick={this.handleClickOpen}>로그아웃</Button>
              <Dialog open={this.state.open} onClose={this.handleClose}>
                  <DialogTitle onClose={this.handleClose}>
                      알림
                  </DialogTitle>
                  <DialogContent>
                      <Typography gutterBottom>
                          로그아웃 하시겠 습니까?
                      </Typography>
                  </DialogContent>
                  <DialogActions>
                      <Button variant="contained" color="primary" onClick={this.handleLogout}>로그아웃</Button>
                      <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                  </DialogActions>
              </Dialog>
          </div>
        )
    }
}

export default Logout;