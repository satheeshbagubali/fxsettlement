import React, { useState, memo } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {DatePicker} from "@material-ui/pickers";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import "./fxticket.css";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
const defaultValues = {
  name: "",
  age: "",
  os: "",
};



const Form = (props) => {
    const {options} = props
    const [formValues, setFormValues] = useState(defaultValues);
    const [alert, setAlert] = useState(false);
  const handleInputChange = (
    e,
    isfieldChange = false,
    fieldName = "",
    fieldValue = ""
  ) => {
    const { name, value } = e.target;
    if (!isfieldChange) {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
        [fieldName]: fieldValue,
      });
    }
  };
  const handleCurrencyInputChange = async (e) => {
     const { value } = e.target;
    const response = await fetch(
      `http://dltsettlement.centralindia.cloudapp.azure.com/currencyQuotes?currency_pair=${value}`
    );
      const responseVal = await response.json();
      if (responseVal && responseVal['content']) {
          const content = JSON.parse(responseVal['content'])
          if (content && content.response) {
              const data = content.response;
              if (data) handleInputChange(e, true, "precision", data[0].c); // need to update based on the proper field name for precision in api response
          }
      }
  };
  const clearFormValue = () => {
      setFormValues({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formValues);
    console.log(JSON.stringify({ formValues }));
    try {
      let res = await fetch("http://dltsettlement.centralindia.cloudapp.azure.com/submitTrade", {
        method: "POST",
        body: JSON.stringify({ formValues }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        //alert(JSON.stringify(resJson));
        console.log('works');
          console.log(JSON.stringify({ resJson }));
          setAlert(true)
          //clearFormValue() // can be called if needed
      } else {
        console.log("no data");
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
      console.log(err);
    }
  };
    const closeAlert = () => {
        setAlert(false)
    }
    React.useEffect(() => {
        if (alert) {
            setTimeout(() => {
                closeAlert()
            }, 10000)
        }
    }, [alert])

function handleShowSpot() {
  var x = document.getElementById("spotDIV");
  var y = document.getElementById("forwardDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  y.style.display = "none";
}

function handleShowForward() {
  var x = document.getElementById("forwardDIV");
  var y = document.getElementById("spotDIV");
    x.style.display = "block";
    y.style.display = "none";
}

    
  return (
    <div class="container">
          <h1>FX Trade Details</h1>
          {alert && <Alert onClose={closeAlert} severity="success">Trade Details submitted successfully.</Alert>}
      <form onSubmit={handleSubmit}  >
        <div class="form-group">
          <Grid container alignItems="center" direction="column">
            <Grid item>
              
                <FormControl>
                      <Select
                        name="counterparty"
                        variant="outlined"
                        value={formValues.counterparty}
                        onChange={handleInputChange}
                        style={{ width: "250px", margin: "10px" }}
                      >
                        <MenuItem key="JPMC" value="JPMC">
                          JPMC
                        </MenuItem>
                        <MenuItem key="Barclays" value="Barclays">
                          Barclays
                        </MenuItem>
                        <MenuItem key="UBS" value="UBS">
                          UBS
                        </MenuItem>
                        <MenuItem key="BOA" value="BOA">
                          BOA
                        </MenuItem>

                      </Select>
                    </FormControl>
            </Grid>
            <Grid>
            <FormControl>
            <table >
                  <tr>
                    
                  <RadioGroup
                    row
                    defaultValue="buy"
                    name="buysell"
                    onChange={handleInputChange}
                  >
                    <td><FormControlLabel value="buy" control={<Radio />} label="Buy" /></td>
                    <td><FormControlLabel value="sell" control={<Radio />} label="Sell" /></td>
                    
                  </RadioGroup>
                  </tr>
                  </table>                  
                </FormControl>
            
            </Grid>
            <Grid item>
                    <FormControl>
                      <Select
                        id="curp"
                        name="currencypair"
                        variant="outlined"
                        value={formValues.currencypair ?? "Select a Currency Pair"}
                        onChange={handleCurrencyInputChange}
                        style={{ width: "250px", margin: "10px" }}
                      >
                          {options?.map((option) => {
                          return (
                            <MenuItem key={option.key} value={option.value}>
                              {option.key ?? option.value}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
            </Grid>
            <Grid item>
              <TextField
                id="name-input"
                name="notional"
                label="Notional"
                type="number"
                variant="outlined"
                value={formValues.notional}
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>
            <TextField
                id="valuedate-input"
                name="settlement_date"
                              label="Settlement Date"
                              placeholder="Settlement Date"
                type="date"
                              variant="outlined"
                              defaultValue='{new Date().toLocaleDateString('en-CA')}'
                value={formValues.valuedate}
                onChange={handleInputChange}
                
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>
            <FormControl>
                  <RadioGroup
                    row
                    defaultValue="spot"
                    name="spotforward"
                    onChange={handleInputChange}
                  >
                    <FormControlLabel onClick = {handleShowSpot} value="spot" control={<Radio />} label="Spot" />
                    <FormControlLabel onClick = {handleShowForward} value="forward" control={<Radio />} label="Forward" />
                    
                  </RadioGroup>
                </FormControl>
                <div id="spotDIV" display ="none">              
            <Grid item>
              <TextField
                id="name-spotrate"
                name="spotprice"
                label="Spot Price"
                type="number"
                variant="outlined"
                value={formValues.spotrate}
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="cpprice-input"
                name="cpprice"
                label="Counterparty Price"
                type="number"
                variant="outlined"
                value={formValues.cpprice}
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>
            </div>
            <div id="forwardDIV" hidden>              
            <Grid item>
              <TextField
                id="fwdprice-input"
                name="fwdprice"
                label="Forward Price"
                type="number"
                variant="outlined"
                value={formValues.fwdprice}
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>
            
            <Grid item>
              <TextField
                id="cpfwdprice-input"
                name="cpfwdprice"
                label="CP Forward Price"
                type="number"
                variant="outlined"
                value={formValues.cpfwdprice}
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>
            </div>
            <Grid item>
            
            <Grid item>
              <TextField
                id="name-precision"
                              name="precision"
                              placeholder ="Rate Precision"
                type="number"
                variant="outlined"
                value={formValues.precision}
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>

            
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
                  </Grid>
                  <Snackbar
                      open={alert}
                      autoHideDuration={10000}
                      onClose={closeAlert}
                  ><Alert onClose={closeAlert} severity="success">Trade Details submitted successfully.</Alert>
              </Snackbar>
                      </div>
             
          </form>
         
    </div>
  );
};
export default memo(Form, (prevProps, nextProps) => prevProps.options === nextProps.options);
