import {
  Stack,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import CampaignCellRenderer from "../CampaignCellRenderer/CampaignCellRenderer";
import getAllCampaigns from "../../utils/getAllCampaigns";
import { useEffect, useState, useRef } from "react";
import './index.css';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function CampaignList() {
  const [campaignList, setCampaignList] = useState([]);
  const [update, setUpdate] = useState(false);
  const handleUpdate = () => setUpdate(true);
  const handleEndUpdate = () => setUpdate(false);
  const [activeFilter, setActiveFilter] = useState(false);
  const [columnDefs, setColumnDefs] = useState([
    { field: "name", filter: true },
    { field: "title", filter: true },
    { field: "status", filter: true, hide: true },
    { field: "description" },
    {
      field: "custom",
      cellRenderer: CampaignCellRenderer,
      cellRendererParams: { handleUpdate },
    },
  ]);
  const [gridApi, setGridApi] = useState(null);
  const activeFilterRef = useRef();
  const gridWrapperRef = useRef();

  useEffect(() => {
    (async () => {
      const campaignList = await getAllCampaigns();
      setCampaignList(
        campaignList.filter((campaign) => {
          return campaign.status !== "pending";
        })
      );
    })();
    handleEndUpdate();
  }, [update, activeFilter]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onPaginationChange = (e) => {
    if (e.newPage) {
      gridWrapperRef.current.scrollIntoView(true);
    }
  };

  const isExternalFilterPresent = () => {
    return true;
  };

  const doesExternalFilterPass = (node) => {
    const active = activeFilterRef.current.querySelector("input").checked;
    if (active) {
      return node.data.status === "active";
    } else {
      return true;
    }
  };

  return (
    <div className="ag-theme-alpine" ref={gridWrapperRef}>
      <Typography variant="h6" component="h2">
        Кампанії
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Switch ref={activeFilterRef} onChange={handleUpdate} />}
          label="Подивитися тільки активні кампанії"
        />
      </FormGroup>
      {campaignList.length > 0 && (
        <AgGridReact
          className="ag-grid"
          rowData={campaignList}
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
            flex: 1,
          }}
        ></AgGridReact>
      )}
    </div>
  );
}
