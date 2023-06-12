import { Stack, FormGroup, FormControlLabel, Switch, Typography } from "@mui/material";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import DonationCellRenderer from "../DonationCellRenderer/DonationCellRenderer";
import getAllDontaions from "../../utils/getAllDontaions";
import { useEffect, useState, useRef } from "react";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function DonationList() {
  const [donationList, setDonationList] = useState([]);
  const [update, setUpdate] = useState(false);
  const handleUpdate = () => setUpdate(true);
  const handleEndUpdate = () => setUpdate(false);
  const [activeFilter, setActiveFilter] = useState(false);
  const [columnDefs, setColumnDefs] = useState([
    {field: 'name', filter: true},
    {field: 'title', filter: true},
    {field: 'amount', filter: true},
    {field: 'value', filter: true},
    {field: 'status', filter: true, hide: true},
    {field: 'description'},
    {field: 'custom', cellRenderer: DonationCellRenderer, cellRendererParams: {handleUpdate} }
    ]);
  const [gridApi, setGridApi] = useState(null);
  const activeFilterRef = useRef();
  const gridWrapperRef = useRef();

  useEffect(() => {
    (async () => {
      const donationList = await getAllDontaions();
      setDonationList(donationList.filter((donation) => {return donation.status !== 'pending'}));
    })();
    handleEndUpdate();
}, [update, activeFilter]);

  const onGridReady = params => {
      setGridApi(params.api);
  }

  const onPaginationChange = e => {
    if(e.newPage) {
      gridWrapperRef.current.scrollIntoView(true);
    }
  }

  const isExternalFilterPresent = () => {
    return true;
  }

  const doesExternalFilterPass = node => {
      const active = activeFilterRef.current.querySelector("input").checked;
      if(active) {
          return node.data.status === 'active';
      } else {
          return true;
      }
  }

  return (
      <div className="ag-theme-alpine" ref={gridWrapperRef}>

        <Typography variant="h6" component="h2">
          Збори
        </Typography>
        <FormGroup>
            <FormControlLabel control={<Switch ref={activeFilterRef} onChange={handleUpdate}/>} label="Подивитися тільки активні запити на пожертвування" />
        </FormGroup>
        {donationList.length > 0 && (
            <AgGridReact
                rowData={donationList}
                onGridReady={onGridReady}
                enableBrowserTooltips={true}
                enableCellTextSelection={true}
                pagination={true}
                paginationPageSize={10}
                onPaginationChanged={onPaginationChange}
                isExternalFilterPresent={isExternalFilterPresent}
                doesExternalFilterPass={doesExternalFilterPass}
                domLayout="autoHeight"
                rowClass="grid-row"
                columnDefs={columnDefs}
                defaultColDef={{
                  resizable: true,
                  sortable: true,
                  wrapText: true,
                  flex: 1
                }}
                >
            </AgGridReact>
        )}
      </div>
  );
}
