import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import './fxticket.css';
const defaultValues = {
  name: "",
  age: "",
  os: "",
  
};
const Form = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Hello Satheesh');
    console.log(formValues);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div class="center">
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            id = "cp-input"
            name = "counterparty"
            label ="Counter Party"
            type ="text"
            variant="outlined"
            value = {formValues.counterparty}
            onChange = {handleInputChange}
          />
         </Grid>
         <Grid item>
          <TextField
            id="basecurrency-input"
            name="currency"
            label="Base Currency"
            type="name"
            variant="outlined"
            value={formValues.currency}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="cpcurrency-input"
            name="cpcurrency"
            label="Counterparty Currency"
            type="name"
            variant="outlined"
            value={formValues.cpcurrency}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item> 
          <TextField
            id="name-spotrate"
            name="spotrate"
            label="Spot Rate"
            type="number"
            variant="outlined"
            value={formValues.spotrate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id = "tradedate-input"
            name = "tradedate"
            label = "Trade Date"
            type ="name"
            variant="outlined"
            value = {formValues.tradedate}
            onChange = {handleInputChange}
            />
        </Grid>    
        <Grid item>
          <TextField
            id = "valuedate-input"
            name = "valuedate"
            label = "Value Date"
            type ="name"
            variant="outlined"
            value = {formValues.valuedate}
            onChange = {handleInputChange}
            />
        </Grid>    
        <Grid item> 
          <TextField
            id="name-precision"
            name="precision"
            label="Rate Precision"
            type="number"
            variant="outlined"
            value={formValues.precision}
            onChange={handleInputChange}
          />
        </Grid>

         <Grid item> 
          <TextField
            id="name-input"
            name="amount"
            label="Amount"
            type="number"
            variant="outlined"
            value={formValues.amount}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item>
         <table>
          <tr>
            <td> 
              Tenor
            </td>  
          <td>
            <FormControl>
              <Select
                name="tenor"   
                variant="outlined"
                value={formValues.tenor}
                onChange={handleInputChange}
              >
                <MenuItem key="Spot" value="Spot">
                  Spot
                </MenuItem>
                <MenuItem key="Forward" value="Forward">
                Forward
                </MenuItem>
              </Select>
            </FormControl>
          </td>
        </tr>
      </table>      
        </Grid>



        <Grid item>
         <table>
          <tr>
            <td> 
              Currency Pair
            </td>  
          <td>
            <FormControl>
              <Select
                name="currencypair"   
                variant="outlined"
                value={formValues.currencypair}
                onChange={handleInputChange}
              >
                <MenuItem key="GBPUSD" value="GBPUSD">
                  GBPUSD
                </MenuItem>
                <MenuItem key="USDJPY" value="USDJPY">
                USDJPY
                </MenuItem>
                <MenuItem key="AUDCAD " value="AUDCAD">
                AUDCAD
                </MenuItem>
                <MenuItem key="EURUSD " value="EURUSD">
                EURUSD
                </MenuItem>
              </Select>
            </FormControl>
          </td>
        </tr>
      </table>      
        </Grid>
        <Grid><div><br/></div></Grid>
        <Button variant="contained" color="primary" type="submit">
          
          
          Submit
        </Button>
      </Grid>
      </div>
    </form>
  );
};
export default Form;