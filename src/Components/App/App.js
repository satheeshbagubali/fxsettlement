import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import DataTable from "./DataTable";
import "./App.css";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid, Paper } from "@material-ui/core";
import Form from "./FXTicket";

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
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "80%",
    backgroundColor: theme.palette.background.paper,
  },
  svb: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  Wells: {
    background: 'grey',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },

}));

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
    const [options, setOptions] = useState([]);
  function handleChange(event, newValue) {
    setValue(newValue);
  }
    
  async function fetchData() {
        //Fetch data
        console.log("fetchim");
        
      const response = await fetch(
          "https://dltfxsettlements.azurewebsites.net/TransactionService/listCurrencyPairs",
      );
        console.log("fetchid");
        
        const responseVal = await response.json()
        console.log(responseVal);
        console.log("fetchidsss");
        
        let dropOptions = [{ key: "Select a Currency", value: "Select a Currency" }]
        //if (responseVal && responseVal['content']) {
          if (responseVal ) {
            //const content = JSON.parse(responseVal['content'])
            
            //if (content && content.response) {

              //  const data = content.response;
                const data = responseVal;
                const results = [];
                // Store results in the results array
                data.forEach((value) => {
                    results.push({
                        key: value.symbol,
                        value: value.symbol,
                    });
                });
                dropOptions = [...dropOptions, ...results]

            //}
        }
        setOptions(dropOptions);
    }
    
    function setSiteLabel()
    {
      const siteFor ="SVB";
      if(siteFor=="SVB")
      {
        var x = document.getElementById("sitelabel");
        x.textContent ="Silicon Valley Bank";
        var x = document.getElementById("bgDiv");
        console.log(classes.SVB);
        x.className =classes.SVB;

      }
      else if(siteFor=="Wells")
      {
        var x = document.getElementById("sitelabel");
        x.textContent =siteFor;
        var x = document.getElementById("bgDiv");
        x.className =classes.Wells;

      }
      else
      {
        var x = document.getElementById("sitelabel");
        x.textContent =siteFor;
        var x = document.getElementById("bgDiv");
        x.className =classes.root;

      }
      

    }

    useEffect(() => {
        // Trigger the fetch
        setSiteLabel();
        fetchData();
    }, []);
    console.log(options)
  return (
    <div id="bgDiv" className={classes.svb} >
      <table width="100%"><tr><td colspan="12">
      <h1 id="sitelabel">Wells Cargo Bank</h1></td>
      <td align="center"><b>Welcome Ramesh!</b></td></tr></table>
      
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
          <Tab label="Front Office" {...a11yProps(0)} />
          <Tab label="Back Office" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <br></br>
      <p align="center"><b>      Sales Trader Workstation </b></p>
      
              {options && options.length > 0 && (<Form options ={options} />)}
              
      </TabPanel>
      <br></br>
      <TabPanel value={value} index={1}>
        <p align="center"><b>Backoffice --> Settlement Details</b></p>
        <br></br>
        <div className="App">
          <DataTable />
          
        </div>
          </TabPanel>
    </div>
  );
}
