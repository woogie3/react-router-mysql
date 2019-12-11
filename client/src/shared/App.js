import React, { Component } from 'react';
import Customer from './components/Customer';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Posts } from 'pages';
import Menu from 'components/Menu';
import Menu2 from 'components/Menu2';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          customers:'',
          completed:0,
          searchKeyword:''
        }
        this.stateRefresh = this.stateRefresh.bind(this);
        // this.handleValueChange = this.handleValueChange.bind(this);
      }
    
      stateRefresh = () => {
        this.setState({
          customers:'',
          completed:0,
          searchKeyword:''
      });
        this.callApi()
        .then(res => this.setState({customers: res}))
        .catch(err => console.log(err));
      }
    
      componentDidMount(){
        this.timer = setInterval(this.progress, 20);
        this.callApi()
        .then(res => this.setState({customers: res}))
        .catch(err => console.log(err));
      }
    
      callApi = async() => {
        const response = await fetch('/api/customers');
        const body = await response.json();
        return body;
      }
    
      progress = () => {
        const {completed} = this.state;
        this.setState({completed: completed >= 100 ? 0 : completed +1});
      };
    
      handleValueChange =(e) =>{
        let nextState = {}
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
      }
    
      render(){
        const filteredComponents = (data) =>{
          data = data.filter((c) => {
            return c.name.indexOf(this.state.searchKeyword) > -1;
          });
          return data.map((c) => {
            return <Customer stateRefresh={this.stateRefresh} key={c.id} id ={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
          })
        }
        const { classes } = this.props;
        const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"]

        return (
            <div>
                <Menu/>
                <Menu2/>
                <Route exact path="/" component={Home}/>
                <Switch>
                    <Route path="/about/:name" component={About}/>
                    <Route path="/about" component={About}/>
                </Switch>
                <Route path="/posts" component={Posts}/>

                <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? filteredComponents(this.state.customers) :
              <TableRow>
                <TableCell colSpan="6" align ="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>

            </div>
        );
    }
}

export default App;