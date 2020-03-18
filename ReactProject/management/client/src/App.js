import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root:{
    width:'100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table:{
    minWidth: 1080
  },
  progress:{
    margin: theme.spacing(2)
  }
});

class App extends Component {

    constructor(props){
      super(props);
      this.state = {
        customers: '',
        completed: 0
      }
    }

    stateRefresh = () => {
      this.setState({
        customers: '',
        completed: 0
      });
      this.callApi() //조회
        .then(res => this.setState({customers:res}))
        .catch(err => console.log(err))
    }

    componentDidMount(){
      this.timer = setInterval(this.progress, 20);  //20만큼 대기시간을 갖는 로딩바
      this.callApi() //조회
        .then(res => this.setState({customers:res}))
        .catch(err => console.log(err))
    }

    callApi = async () => { //비동기로 API호출
      const response = await fetch('api/customers');
      const body = await response.json();
      return body;
    }

    render() {  //실제화면
      const { classes } = this.props;
      return(
        <div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>아이디</TableCell>
                  <TableCell>이미지</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>생년월일</TableCell>
                  <TableCell>성별</TableCell>
                  <TableCell>직업</TableCell>
                  <TableCell>설정</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              { this.state.customers ? this.state.customers.map(c => {
                  return(<Customer stateRefresh={this.stateRefresh} id={c.id} img={c.img} name={c.name} birth={c.birth} gender={c.gender} job={c.job}/>);
                }):
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="indeterminate" />
                  </TableCell>
                </TableRow>
                }
            </TableBody>
            </Table>
          </Paper>
          <CustomerAdd stateRefresh={this.stateRefresh}/>
        </div>
      );
    }
}

export default withStyles(styles)(App);
