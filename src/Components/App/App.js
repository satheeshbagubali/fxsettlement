import React from "react";
import ReactDOM from "react-dom";
import DataTable from './DataTable';
import './App.css';



import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid, Paper } from "@material-ui/core";
import Form from './FXTicket';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={2}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Trade ticket" {...a11yProps(0)} />
          <Tab label="Counterparty Transactions" {...a11yProps(1)} />
          <Tab label="Settlements" {...a11yProps(2)} />
          
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <b></b>
        <Form/>     
      </TabPanel>
      <TabPanel value={value} index={1}>
        Counterparty Transactions

        
              <div className="App">
                <DataTable />
              </div>

        

      </TabPanel>
      <TabPanel value={value} index={2}>
        Settlement Details

        <div className="App">
          <DataTable />
        </div>
      </TabPanel>
 
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
