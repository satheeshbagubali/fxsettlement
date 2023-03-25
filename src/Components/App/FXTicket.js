import React, { useState, memo } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import "./fxticket.css";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import FormLabel from "@mui/material/FormLabel";
const defaultValues = {
  counterparty: "",
};

const Form = (props) => {
  const { options } = props;
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
  //const handleCurrencyInputChange = async (e) => {
//    const { value } = e.target;
  //};

  const clearFormValue = () => {
    setFormValues({});
  };

  const tradeobject = [
    {
      "tradeId" : "TR125",
      "product" : "product5",
      "executionPrice" : "1000",
      "spotPrice" : "1200",
      "settlement_date" : "2023-03-01",
      "counterParty" : "counterParty5",
      "counterPartyFullName" : "counterPartyFullName5",
      "execution_date" : "2023-03-01",
      "pricing" : "pricing",
      "executionVenue" : "executionVenue",
      "salesDesk" : "salesDesk",
      "liquidityProvider" : "liquidityProvider",
      "book" : "book",
      "legalEntity" : "legalEntity",
      "status" : "status1"
      }
  ]


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(JSON.stringify({ formValues }));
    try {
      
      const responseVal = formValues;
      console.log(responseVal);
      console.log(tradeobject);
      console.log( typeof(tradeobject) );

      let res = await fetch(
        "https://dltfxsettlements.azurewebsites.net/TransactionService/submitTrade",
        {
          method: "POST",
          //body: JSON.stringify({ tradeobject }),
          body:  tradeobject ,
          config: {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }
    }
          //body : responseVal,
        }
      );
      let resJson = await res.json();
      console.log(res);
      if (res.status === 200) {
        //alert(JSON.stringify(resJson));
        console.log("works");
        console.log(JSON.stringify({ resJson }));
        setAlert(true);
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
    setAlert(false);
  };
  React.useEffect(() => {
    if (alert) {
      setTimeout(() => {
        closeAlert();
      }, 10000);
    }
  }, [alert]);

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
      {alert && (
        <Alert onClose={closeAlert} severity="success">
          Trade Details submitted successfully.
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <Grid container alignItems="center" direction="column">
           <Grid item>
              <FormControl>
              <TextField
                id="prodcut-input"
                name="product"
                label="Product"
                variant="outlined"
                value={formValues.product}
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />          
              </FormControl>
            
            </Grid> 
            <Grid item>
              <FormControl>
                <InputLabel id="counterparty-label">Counter Party</InputLabel>
                <Select
                  labelId="counterparty-label"
                  id="counterparty"
                  name="counterparty"
                  variant="outlined"
                  label="Counter Party"
                  value={formValues.counterparty ?? "Select Counter Party"}
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

            <Grid item>
              <TextField
                id="cpfullname_id"
                name="cpfullname"
                labelId="cpfullname-label"
                label="CP Full Name"
                variant="outlined"
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>

            <Grid>
              <FormControl>
                <table>
                  <FormLabel id="buysell-label">Buy/Sell</FormLabel>
                  <tr>
                    <RadioGroup
                      row
                      defaultValue="buy"
                      name="buysell"
                      onChange={handleInputChange}
                      aria-labelledby="buysell-label"
                      style={{ width: "225px", margin: "10px" }}
                    >
                      <td>
                        <FormControlLabel
                          value="buy"
                          control={<Radio />}
                          label="Buy"
                        />
                      </td>
                      <td>
                        <FormControlLabel
                          value="sell"
                          control={<Radio />}
                          label="Sell"
                        />
                      </td>
                    </RadioGroup>
                  </tr>
                </table>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel id="curp-label">Currency Pair</InputLabel>
                <Select
                  id="curp"
                  labelId="curp-label"
                  name="currencypair"
                  variant="outlined"
                  label="Currency Pair"
                  value={formValues.currencypair ?? "Select a Currency Pair"}
                  onChange={handleInputChange}
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
              placeholder="Settlement Date"
              type="date"
              variant="outlined"
              defaultValue={new Date().toLocaleDateString("en-CA")}
              value={formValues.valuedate}
              onChange={handleInputChange}
              style={{ width: "250px", margin: "10px" }}
            />
          </Grid>
          <Grid container alignItems="center" direction="column">
            <FormControl>
              <FormLabel id="spotforward-label">Spot/Forward</FormLabel>
              <RadioGroup
                row
                defaultValue="spot"
                name="spotforward"
                onChange={handleInputChange}
                aria-labelledby="spotforward-label"
                style={{ width: "225px", margin: "10px" }}
              >
                <FormControlLabel
                  onClick={handleShowSpot}
                  value="spot"
                  control={<Radio />}
                  label="Spot"
                />
                <FormControlLabel
                  onClick={handleShowForward}
                  value="forward"
                  control={<Radio />}
                  label="Forward"
                />
              </RadioGroup>
            </FormControl>
            <div id="spotDIV" display="none">
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
                <TextField
                  id="name-executionprice"
                  name="executionprice"
                  label="Execution Price"
                  type="number"
                  variant="outlined"
                  value={formValues.spotrate}
                  onChange={handleInputChange}
                  style={{ width: "250px", margin: "10px" }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="name-pricing"
                  name="pricing"
                  label="Pricing"
                  type="number"
                  variant="outlined"
                  value={formValues.spotrate}
                  onChange={handleInputChange}
                  style={{ width: "250px", margin: "10px" }}
                />
              </Grid>

            <Grid item>
              <TextField
                id="executionVenue_id"
                name="executionVenue"
                labelId="executionVenue-label"
                label="Execution Venue"
                variant="outlined"
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>

            <Grid item>
              <TextField
                id="book_id"
                name="book"
                labelId="book-label"
                label="Book"
                variant="outlined"
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>

            <Grid item>
              <TextField
                id="legalentity_id"
                name="legalentity"
                labelId="legalentity-label"
                label="Legal Entity"
                variant="outlined"
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>

            <Grid item>
              <TextField
                id="salesdesk_id"
                name="salesdesk"
                labelId="salesdesk-label"
                label="Sales Desk"
                variant="outlined"
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
          <Snackbar open={alert} autoHideDuration={10000} onClose={closeAlert}>
            <Alert onClose={closeAlert} severity="success">
              Trade Details submitted successfully.
            </Alert>
          </Snackbar>
        </div>
      </form>
    </div>
  );
};
export default memo(
  Form,
  (prevProps, nextProps) => prevProps.options === nextProps.options
);
