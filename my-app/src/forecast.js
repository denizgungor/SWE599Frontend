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
    width:100,
  },




});



class Forecast extends Component {
  constructor(props){
   super(props);
   this.serverAdress = "http://35.243.202.181/"; 
    this._chart= React.createRef();

   this.state = {
    result:0,
    requirementDefect:'',
    codeUnitTestDefect:'',
    KLOC:'',
    requirementPage:'',
    designPage:'',
    targetTotalTestClasses:'',
    totalTestEffort:'',
    actualFunctionalDefect:'',
    multiline: 'Controlled',
    startsprint:'',
    endsprint:'',
    value:'',
    sprint:[],
    project: '',
    parameter: '',
    projects: [],
    parameters:[],
   
     series: [{
          data: []
      }],
   };
  }

 routeChange(path){
   
    this.props.history.push(path);
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

  getSprint = name => event => {
    this.setState({
      project: event.target.value,
    });
    var result = 0;
    fetch(this.serverAdress+"projectdetail/"+event.target.value)
    .then(response => response.json())
    .then(data => {
    this.setState({ sprint: data.length+1});
    })

  };

  forecast(){

   var result = 0;
   var parameter = this.state.parameter;
   fetch(this.serverAdress+"projectprediction")
    .then(response => response.json())
    .then(data => {
    if(this.state.requirementDefect!==''){
        result+=this.state.requirementDefect/data[0].RequirementDefect;
    }
    if(this.state.codeUnitTestDefect!==''){
        result+=this.state.codeUnitTestDefect/data[0].CodeUnitTestDefect;
    }

     if(this.state.KLOC!==''){
        result+=this.state.KLOC/data[0].KLOC;
    }
     if(this.state.requirementPage!==''){
        result+=this.state.requirementPage/data[0].RequirementPage;
    }
     if(this.state.designPage!==''){
        result+=this.state.designPage/data[0].DesignPage;
    }
    if(this.state.targetTotalTestClasses!==''){
        result+=this.state.targetTotalTestClasses/data[0].TargetTotalTestCases;
    }
    if(this.state.totalTestEffort!==''){
        result+=this.state.totalTestEffort/data[0].TotalTestEffort;
    }
    this.setState({ result: result});

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
            style={{ minHeight: '30vh' }}>
                   <Grid item xs={3}>
               <TextField
                        id="standard-select-currency"
                        select
                        label="Project"
                        className={classes.textField}
                        value={this.state.project}
                        onChange={this.getSprint('project')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        helperText="Please choose a software project"
                        margin="normal"
                      >
                        {this.state.projects.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                  </MenuItem>
                ))}
             </TextField>
            </Grid>   
         
        
               <Grid item xs={3}>
               <TextField
                        id="standard-select-sprint"
                        select
                        label="Sprint"
                        className={classes.textField}
                        value={this.state.sprint}
                        onChange={this.handleChange('sprint')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        helperText="Please choose the Sprint for the project"
                        margin="normal"
                      >
                          <MenuItem key={this.state.sprint} value={this.state.sprint}>
                                  {this.state.sprint}
                  </MenuItem>
                
             </TextField>
            </Grid>  

           <Grid item xs={3}>
              <TextField
                id="standard-number"
                label="Requirement Defect"
                value={this.state.requirementDefect}
                onChange={this.handleChange('requirementDefect')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
          </Grid> 
          <Grid item xs={3}>
              <TextField
                id="standard-number"
                label="Code Unit Test Defect"
                value={this.state.codeUnitTestDefect}
                onChange={this.handleChange('codeUnitTestDefect')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
          </Grid> 
          <Grid item xs={3}>
              <TextField
                id="standard-number"
                label="KLOC"
                value={this.state.KLOC}
                onChange={this.handleChange('KLOC')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
          </Grid> 
           <Grid item xs={3}>
              <TextField
                id="standard-number"
                label="Requirement Page"
                value={this.state.requirementPage}
                onChange={this.handleChange('requirementPage')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
          </Grid> 
            <Grid item xs={3}>
              <TextField
                id="standard-number"
                label="Design Page"
                value={this.state.designPage}
                onChange={this.handleChange('designPage')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
          </Grid> 
             <Grid item xs={3}>
              <TextField
                id="standard-number"
                label="Target Total Test classes"
                value={this.state.targetTotalTestClasses}
                onChange={this.handleChange('targetTotalTestClasses')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
          </Grid> 
            <Grid item xs={3}>
              <TextField
                id="standard-number"
                label="Total Test Effort"
                value={this.state.totalTestEffort}
                onChange={this.handleChange('totalTestEffort')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
          </Grid> 





                     <Grid item xs={3}>
   
<Button variant="contained" color="primary" className={classes.button} onClick={() => { this.routeChange('/') }}>
        Cancel
      </Button> 
      <Button variant="contained" color="secondary" className={classes.button} onClick={() => { this.forecast() }}>
        forecast
      </Button>

            </Grid>

        <Grid item xs={3}>
              <TextField
                id="standard-number"
                label="Forecasted Defects"
                value={this.state.result}
                onChange={this.handleChange('result')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
          </Grid> 
   


            </Grid>
  
          </main>
        </div>
      </React.Fragment>

    );
  }
}
Forecast.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Forecast);
