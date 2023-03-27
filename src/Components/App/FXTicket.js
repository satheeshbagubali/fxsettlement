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
const defaultValues = {};

const Form = (props) => {
  const { options } = props;
  const defaultDateValue = new Date().toLocaleDateString("en-CA");
  console.log(options);
  const defaultValues = {
    currencyPair:
      options?.find((option) => option.key === "USD/EUR")?.value ?? "USD/EUR",
    product:
    options?.find((option) => option.key === "FX Spot")?.value ?? "FX Spot",
    settlement_date: defaultDateValue,
    execution_date: defaultDateValue,
    counterParty: "JP Morgan Chase",
    executionVenue: "Bloomberg",
    pricing: "Algo",
    status: "Initiated",
    liquidityProvider: "Bloomberg",
    legalEntity: "Silicon Vault Bank NA",
    salesDesk: "SVBNA",
  };
  const [formValues, setFormValues] = useState(defaultValues);
  console.log(formValues);
  console.log(formValues["dealerSide"]);
  const [alert, setAlert] = useState(false);
  const handleInputChange = (
    e,
    isfieldChange = false,
    fieldName = "",
    fieldValue = ""
  ) => {
    const { name, value, type } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const clearFormValue = () => {
    setFormValues({});
  };

  const tradeobject = {
    tradeId: "TR125",
    product: "product5",
    executionPrice: 1000,
    spotPrice: 1200,
    settlement_date: "2023-03-01",
    counterParty: "counterParty5",
    counterPartyFullName: "counterPartyFullName5",
    execution_date: "2023-03-01",
    pricing: "Algo",
    executionVenue: "Bloomberg",
    salesDesk: "salesDesk",
    liquidityProvider: "liquidityProvider",
    book: "book",
    legalEntity: "legalEntity",
    status: "Initiated",
  };

  const handleCurrencyInputChange = async (e) => {
    const { value } = e.target;
    const response = await fetch(
      `https://dltfxsettlements.azurewebsites.net/TransactionService/listCurrencyPairs?currency_pair=${value}`
    );
    const responseVal = await response.json();
    if (responseVal && responseVal["content"]) {
      const content = JSON.parse(responseVal["content"]);
      if (content && content.response) {
        const data = content.response;
        if (data) handleInputChange(e, true, "spotPrice", data[0].c); // need to update based on the proper field name for precision in api response
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dealerSide = formValues["dealerSide"];
      const responseVal = {
        ...formValues,
        clientSide: dealerSide === "buy" ? "sell" : "buy",
      };
      console.log(JSON.stringify({ formValues }));
      console.log(JSON.stringify({ responseVal }));

      console.log(tradeobject);
      console.log(JSON.stringify({ tradeobject }));

      let res = await fetch(
        "https://dltfxsettlements.azurewebsites.net/TransactionService/submitTrade",
        {
          method: "POST",
          body: JSON.stringify(responseVal),
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );

      let resJson = await res.json();

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
    <div id="formClass" class="containerSVB">
      <b>FX Trade Details</b>
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
                <InputLabel id="product-label">Product</InputLabel>
                <Select
                  labelId="Product-label"
                  id="Product_id"
                  name="product"
                  variant="outlined"
                  label="Product"
                  defaultValue={"FX Spot"}
                  onChange={handleInputChange}
                  style={{ width: "250px", margin: "10px" }}
                >
                  <MenuItem key="FX Spot" value="FX Spot">
                  FX Spot
                  </MenuItem>
                  <MenuItem key="FX Forward" value="FX Forward">
                  FX Forward
                  </MenuItem>
                    </Select>
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
                  defaultValue={"JP Morgan Chase"}
                  //value={formValues.counterParty ?? "Select Counter Party"}
                  onChange={handleInputChange}
                  style={{ width: "250px", margin: "10px" }}
                >
                  <MenuItem key="JPMC" value="JP Morgan Chase">
                    JP Morgan Chase
                  </MenuItem>
                  <MenuItem key="Barclays" value="Barclays">
                    Barclays
                  </MenuItem>
                  <MenuItem key="UBS" value="UBS">
                    Union Bank of Switzerland
                  </MenuItem>
                  <MenuItem key="BOA" value="BOA">
                    Bank of America
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid>
              <FormControl>
                <table>
                  <tr>
                    <RadioGroup
                      row
                      name="dealerSide"
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
                  name="currencyPair"
                  variant="outlined"
                  label="Currency Pair"
                  value={formValues.currencyPair ?? "Select a Currency Pair"}
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
            <FormControl>
              <TextField
                id="valuedate-input"
                name="settlement_date"
                label="Settlement Date"
                type="date"
                variant="outlined"
                value={formValues.valuedate}
                defaultValue={new Date().toLocaleDateString("en-CA")}
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </FormControl>
          </Grid>
          <div id="spotDIV" display="none">
            <Grid item container alignItems="center" direction="column">
              <TextField
                id="name-spotrate"
                name="spotPrice"
                label="Spot Price"
                type="number"
                variant="outlined"
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>
          </div>
          <Grid item container alignItems="center" direction="column">
            <TextField
              id="name-executionprice"
              name="executionPrice"
              label="Execution Price"
              type="number"
              variant="outlined"
              onChange={handleInputChange}
              style={{ width: "250px", margin: "10px" }}
            />
          </Grid>

          <Grid item container alignItems="center" direction="column">
              <TextField
                id="name-amount"
                name="amount"
                label="Amount"
                type="number"
                variant="outlined"
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </Grid>


          <Grid item container alignItems="center" direction="column">
            <FormControl>
              <TextField
                id="executiondate-input"
                name="execution_date"
                label="Execution Date"
                type="date"
                variant="outlined"
                value={formValues.execution_date}
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </FormControl>
          </Grid>
          <Grid item container alignItems="center" direction="column">
            <FormControl>
              <InputLabel id="pricing-label">Pricing</InputLabel>
              <Select
                labelId="pricing-label"
                id="pricing_id"
                name="pricing"
                variant="outlined"
                label="Pricing"
                value={formValues.pricing ?? "Select Pricing"}
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              >
                <MenuItem key="Algo" value="Algo">
                  Algo
                </MenuItem>
                <MenuItem key="Manual" value="Manual">
                  Manual
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item container alignItems="center" direction="column">
            <FormControl>
              <InputLabel id="executionid-label">Execution Venue</InputLabel>
              <Select
                labelId="execution-label"
                id="executionVenue_id"
                name="executionVenue"
                variant="outlined"
                label="Execution Venue"
                value={formValues.executionVenue ?? "Select Execution Venue"}
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              >
                <MenuItem key="Bloomberg" value="Bloomberg">
                  Bloomberg
                </MenuItem>
                <MenuItem key="Off" value="Off">
                  Off
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item container alignItems="center" direction="column">
            <TextField
              id="liquidityProvider_id"
              name="liquidityProvider"
              labelId="liquidityProvider-label"
              label="Liquidity Provider"
              variant="outlined"
              defaultValue="Bloomberg"
              onChange={handleInputChange}
              style={{ width: "250px", margin: "10px" }}
            />
          </Grid>
          <Grid item container alignItems="center" direction="column">
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

          <Grid item container alignItems="center" direction="column">
            <FormControl>
              <TextField
                id="legalEntity_id"
                name="legalEntity"
                labelId="legalEntity-label"
                label="Legal Entity"
                variant="outlined"
                defaultValue="Silicon Vault Bank NA"
                onChange={handleInputChange}
                style={{ width: "250px", margin: "10px" }}
              />
            </FormControl>
          </Grid>
          <Grid item container alignItems="center" direction="column">
            <TextField
              id="salesdesk_id"
              name="salesDesk"
              labelId="salesdesk-label"
              label="Sales Desk"
              variant="outlined"
              defaultValue="SVBNA"
              onChange={handleInputChange}
              style={{ width: "250px", margin: "10px" }}
            />
          </Grid>
          <Grid alignItems="center" direction="column">
            <FormControl>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </FormControl>
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
