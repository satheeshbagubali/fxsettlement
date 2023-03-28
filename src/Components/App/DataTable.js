import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { darken, lighten, styled } from '@mui/material/styles';
import { clsx } from 'clsx'



const columns: GridColDef[] = [
  {
    field: 'tradeId',
    headerClassName: 'table-header-background-color',
    headerAlign: 'center',
    headerName: 'Trade ID' ,
    type: 'string',
    width: 200 ,
    cellClassName: (params: GridCellParams<string>) =>
    clsx('gridHeader2', {
      gridHeader: params.value == 'qui est esse',
      gridaltHeader: params.value == 'nesciunt quas odio',
    }),

  },
  {
    field: 'product',
    headerClassName: 'table-header-background-color',
    headerAlign: 'center',
    headerName: 'Product' ,
    width: 200 
  },
  {
    field: 'counterParty',
    headerClassName: 'table-header-background-color',
    headerAlign: 'center',
    headerName: 'Counter Party' ,
    width: 200 
  },
  {
    field: 'dealerSide',
    headerClassName: 'table-header-background-color',
    headerAlign: 'center',
    headerName: 'Trade Side' ,
    width: 200 
  },
  {
    field: 'amount',
    headerClassName: 'table-header-background-color',
    headerAlign: 'center',
    headerName: 'Amount' ,
    width: 200 
  },  
  {
    field: 'executionPrice',
    headerClassName: 'table-header-background-color',
    headerAlign: 'center',
    headerName: 'Execution Price' ,
    width: 200 
  },
  {
    field: 'spotPrice',
    headerClassName: 'table-header-background-color',
    headerAlign: 'center',
    headerName: 'Spot Price' ,
    width: 200 
  },
  {
    field: 'status',
    headerClassName: 'table-header-background-color',
    headerAlign: 'center',
    headerName: 'Trade Status' ,
    width: 200 
  },
  
  {
    field: 'salesDesk',
    headerClassName: 'table-header-background-color',
    headerAlign: 'center',
    headerName: 'Sales Desk' ,
    width: 200 
  },
  {
    field: 'settlement_date',
    headerClassName: 'table-header-background-color',
    headerAlign: 'center',
    headerName: 'Settlement Date' ,
    width: 300 
  },
  

  
  
];


const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .super-app-theme--1': {
    backgroundColor: getBackgroundColor(theme.palette.info.main, theme.palette.mode),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.info.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--2': {
    backgroundColor: getBackgroundColor(
      theme.palette.success.main,
      theme.palette.mode,
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.success.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.success.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.success.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--3': {
    backgroundColor: getBackgroundColor(
      theme.palette.warning.main,
      theme.palette.mode,
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.warning.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--Rejected': {
    backgroundColor: getBackgroundColor(
      theme.palette.error.main,
      theme.palette.mode,
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode,
        ),
      },
    },
  },
}));


const DataTable = () => {

  const [tableData, setTableData] = useState([])

  const [rows, setRows] = useState(tableData);
  const [deletedRows, setDeletedRows] = useState([]);

  useEffect(() => {
    fetch("https://dltfxsettlements.azurewebsites.net/TransactionService/getTradeByStatus")
      .then((data) => data.json())
      
      .then((data) => setTableData(data))

  }, [])

  console.log(tableData);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <StyledDataGrid
        rows={tableData}
        columns={columns}
        //getRowClassName={(params) => `super-app-theme--${params.row.id}`}
        pageSize={10}
        checkboxSelection
        onSelectionModelChange={({ selectionModel }) => {
          const rowIds = selectionModel.map(rowId => parseInt(String(rowId), 10));
          const rowsToDelete = tableData.filter(row => rowIds.includes(row.id));
          setDeletedRows(rowsToDelete);
          console.log(deletedRows);
        }}
        
      />
    </div>
  )
}

export default DataTable