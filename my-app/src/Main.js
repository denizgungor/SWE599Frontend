import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


const drawerWidth = 240;

const styles = theme => ({


  root: {
    display: 'flex',
    backgroundColor: '#f6f6f6',
  },
  toolbar: {
    paddingRight: 24,
    color: '#FFF',
    height:50,
        display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    fontSize:24,
     // keep right padding when drawer closed
  },
  toolbarIcon: {
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  textField: {
    width:300,
     color: 'red',
  },
  appBar: {
    backgroundColor: '#000',
    height:60,
    fontColor: '#000',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 1,
    height: '100vh',
    overflow: 'auto',
  },

  
  Grid: {
    padding: '20',
  },
  
 
 

   button: {
    margin: theme.spacing.unit,
    width:250,
    height:100
  },


   cardLarge: {
    height: '100%',
    flexDirection: 'column',
    marginRight:5,
    marginLeft:5,
    marginBottom:20,
    marginTop:20,
    width:300,
    maxHeight: 100,
    fontSize:30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background:'linear-gradient(to bottom, #263238, #263238)' ,


  },
  cardContentDarkLarge: {
    flexGrow: 1,
    fontSize:30,
    color:'#fff',
    background:'linear-gradient(to bottom, #263238, #263238)' ,
    paddingTop:15,
    paddingBottom:3

    
  },



});



class Main extends Component {
  constructor(props){
   super(props);
   this.serverAdress = "http://localhost/"; 

   this.state = {
    multiline: 'Controlled',
    project: '',
    parameter: '',
    projects: [],
    parameters:[],

   };
  }

 componentWillMount(){
    this._getProjectDataAPI();
    this._getParameterDataAPI();

  }
  
  _getProjectDataAPI() {
    var result = [];
    fetch(this.serverAdress+"projects")
    .then(response => response.json())
    .then(data => {
        data.map(function(item,index) {  
          result.push({value:item.name, label:item.name});
    }); 
    this.setState({ projects: result });
    })
  }

  _getParameterDataAPI() {
    var result = [];
    fetch(this.serverAdress+"parameters")
    .then(response => response.json())
    .then(data => {
        data.map(function(item,index) {  
          result.push({value:item.name, label:item.name});
    }); 
    this.setState({ parameters: result });
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  routeChange(path){
   
    this.props.history.push(path);
    }
  render(){
    const { classes } = this.props;

    return (
      
  <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
       <AppBar
            position="absolute"
            className={classes.appBar}
          >
            <Toolbar  className={classes.toolbar}>
              SMETRIC
            </Toolbar>
          </AppBar>

          <main className={classes.content}>
         <div className={classes.appBarSpacer} />  
            <Grid 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '50vh' }}>
           <Grid item xs={12}>
               <Button variant="contained" color="secondary" className={classes.button} onClick={() => { this.routeChange('/sprint') }}>
                Record Sprint Parameters
              </Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => { this.routeChange('/graph') }}>
                Visualize Sprint Parameters
              </Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => { this.routeChange('/forecast') }}>
                Forecast Sprint Parameters
              </Button>
             
            </Grid>   
         



            </Grid>
  
          </main>
        </div>
      </React.Fragment>

    );
  }
}
Main.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Main);
