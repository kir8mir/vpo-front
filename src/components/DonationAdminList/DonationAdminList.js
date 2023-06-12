import { Stack } from "@mui/material";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import DonationAdminActivateCellRenderer from "../DonationAdminCellRenderer/DonationAdminCellRenderer";
import getAllDontaions from "../../utils/getAllDontaions";
import { useEffect, useState, useRef } from "react";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function DonationAdminList() {
  const [donationList, setDonationList] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {field: 'name', filter: true},
    {field: 'title', filter: true},
    {field: 'amount', filter: true},
    {field: 'value', filter: true},
    {field: 'status', filter: true, hide: true},
    {field: 'description'},
    {field: 'custom', cellRenderer: DonationAdminActivateCellRenderer }
    ]);
  const [gridApi, setGridApi] = useState(null);
  const gridWrapperRef = useRef();

  useEffect(() => {
    (async () => {
      const donationList = await getAllDontaions();
      setDonationList(donationList);
    })();
  }, []);

  const onGridReady = params => {
      setGridApi(params.api);
  }

  const onPaginationChange = e => {
    if(e.newPage) {
      gridWrapperRef.current.scrollIntoView(true);
    }
  }

  return (
      <div className="ag-theme-alpine" ref={gridWrapperRef}>
          {donationList.length > 0 && (
            <AgGridReact
                rowData={donationList}
                onGridReady={onGridReady}
                enableBrowserTooltips={true}
                enableCellTextSelection={true}
                pagination={true}
                paginationPageSize={10}
                onPaginationChanged={onPaginationChange}
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
