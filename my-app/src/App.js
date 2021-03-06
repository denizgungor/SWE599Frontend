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
import Chart from 'react-apexcharts'


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



class App extends Component {
  constructor(props){
   super(props);
   this.serverAdress = "http://35.243.202.181/"; 
    this._chart= React.createRef();

   this.state = {
    multiline: 'Controlled',
    startsprint:'',
    endsprint:'',
    sprints:[],
    project: '',
    parameter: '',
    projects: [],
    parameters:[],
    options: {
        colors: ['#f27a1a'],
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 1
        },
        
      grid: {
        show: true,
        borderColor: '#90A4AE',
        strokeDashArray: 0,
        position: 'back',
        clipMarkers: true,
        xaxis: {
            lines: {
                show: false,
                offsetX: 0,
                offsetY: 0
            }
        },   
        yaxis: {
            lines: {
                show: true,
                offsetX: 0,
                offsetY: 0
            }
        },  
        row: {
            colors: undefined,
            opacity: 0.5
        },  
        column: {
            colors: undefined,
            opacity: 0.5
        },  
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
     },
    title: {
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 10,
        floating: false,
        style: {
          fontSize:  '16px',
          color:  '#263238',

        }
    },
     chart: {
          stacked:false,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
                }         
        }
      },
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
    var result = [];
    fetch(this.serverAdress+"projectdetail/"+event.target.value)
    .then(response => response.json())
    .then(data => {
        data.map(function(item,index) {  
          result.push({value:item.Name, label:item.Name});
    }); 
    this.setState({ sprints: result });
    })

  };

  visualize(){
  if(this.state.parameter!==''){
   if(this.state.startsprint<this.state.endsprint){
   var result = [];
   var parameter = this.state.parameter;
   fetch(this.serverAdress+"projectdetail/"+this.state.project)
    .then(response => response.json())
    .then(data => {
        data.map(function(item,index) {  
         if(parameter === 'Requirement Defect'){
             result.push(item.RequirementDefect);
         }
         if(parameter === 'Code Unit Test Defect'){
           result.push(item.CodeUnitTestDefect);
         }
         if(parameter === 'KLOC'){
           result.push(item.KLOC);
         }
          if(parameter === 'Requirement Page'){
           result.push(item.RequirementPage);
         }
         if(parameter === 'Design Page'){
           result.push(item.DesignPage);
         }  
         if(parameter === 'Target Total Test Cases'){
           result.push(item.TargetTotalTestCases);

         }    
         if(parameter === 'Total Test Effort'){
           result.push(item.TotalTestEffort);
         }   
         if(parameter === 'Actual Functional Defect'){
           result.push(item.ActualFunctionalDefect);
        } 
         
    }); 
        var x = this.state.series;
         for(var i=0;i<x[0].data.length;i++){
                x[0].data[i] = null;
        }
        for(var i=this.state.startsprint-1;i<this.state.endsprint;i++){
                x[0].data[i] = result[i];
                console.log(result[i]);
        }
          this._chart.current.chart.windowResize();
        

    })

  }
  else{
    alert("Starting sprint should be before the ending sprint!")
  }
}
else{
    alert("You need to choose the parameter!")
  }


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
                        id="standard-select-currency"
                        select
                        label="Parameter"
                        className={classes.textField}
                        value={this.state.parameter}
                        onChange={this.handleChange('parameter')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        helperText="Please choose a parameter "
                        margin="normal"
                      >
                        {this.state.parameters.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                  </MenuItem>
                ))}
             </TextField>
            </Grid>  
             
         <Grid item xs={3}>
               <TextField
                        id="standard-select-currency"
                        select
                        label="Starting Sprint"
                        className={classes.textField}
                        value={this.state.startsprint}
                        onChange={this.handleChange('startsprint')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        helperText="Please choose a sprint"
                        margin="normal"
                      >
                        {this.state.sprints.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                  </MenuItem>
                ))}
             </TextField>
            </Grid> 
             <Grid item xs={3}>
               <TextField
                        id="standard-select-currency"
                        select
                        label="Ending Sprint"
                        className={classes.textField}
                        value={this.state.endsprint}
                        onChange={this.handleChange('endsprint')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        helperText="Please choose a sprint"
                        margin="normal"
                      >
                        {this.state.sprints.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                  </MenuItem>
                ))}
             </TextField>
            </Grid> 
                     <Grid item xs={3}>
   
<Button variant="contained" color="primary" className={classes.button} onClick={() => { this.routeChange('/') }}>
        Cancel
      </Button> 
      <Button variant="contained" color="secondary" className={classes.button} onClick={() => { this.visualize() }}>
        Visualize
      </Button>

            </Grid>


    <Grid >
                  <Chart ref={this._chart} options={this.state.options} type="line" series={this.state.series} height={400} width={600} />



            </Grid>


            </Grid>
  
          </main>
        </div>
      </React.Fragment>

    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
