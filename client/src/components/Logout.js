import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { ThemeProvider, withStyles, makeStyles } from '@material-ui/core/styles';


class Logout extends React.Component{

    handleLogout =  (e) =>{
        const url = '/api/logout';
       this.callApi()
       .then(res => console.log(res));
        this.props.stateRefresh();
    }

    callApi = async () => {
        const response = await fetch('/api/logout', {method : 'delete'});
        const body = await response.json();
        console.log(body);
        return body;
    }

    // handleLogout =  (e) =>{
    //     const url = '/api/logout';
    //     fetch(url, {
    //         method : 'delete'
    //     })
    //     .then((response)=>{
    //         console.log(response);
    //     })
    // }

    // callApi = async () => {
    //     const response = await fetch('/api/logout', {method : 'delete'});
    //     const body = await response.json();
    //     // console.log(body);
    //     return body;
    // }

    render(){
        return(
            <Button color="inherit" onClick={this.handleLogout}> 
                  {
                       (() => {
                        if(session.email){return <div>세션이있네</div>}
                        else{return <div>세션이없네</div>}
                      })()
                    }
            </Button>
        )
    }
}

export default Logout;