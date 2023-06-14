import { FormControl, TextField, Button, Stack, Typography } from "@mui/material";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useEffect, useState, useRef } from "react";
import getAllDontaions from "../../utils/getAllDontaions";
import getAllCampaigns from "../../utils/getAllCampaigns";

export default function SearchForm(  ) {
    const [donationList, setDonationList] = useState([]);
    const [campaingList, setCampaingList] = useState([]);
    const [searchList, setSearchList] = useState([...donationList, ...campaingList]);

    const [chosenSearch, setChosenSearch] = useState("");
    const [searchUpdate, setSearchUpdate] = useState(false);
    const handleUpdate = () => setSearchUpdate(true);
    const handleEndUpdate = () => setSearchUpdate(false);

    const [gridApi, setGridApi] = useState(null);
    const searchRef = useRef(null);
    const searchButton = useRef(null);
    const gridWrapperRef = useRef(null);
    const [columnDefs, setColumnDefs] = useState([
      {field: 'name', filter: true},
      {field: 'title', filter: true},
      {field: 'amount', filter: true},
      {field: 'status', filter: true},
      {field: 'value', filter: true},
      {field: 'description', filter: true }
      ]);

    useEffect(() => {
        (async () => {
          const donationList = await getAllDontaions();
          const campaingList = await getAllCampaigns();
          setSearchList([...donationList, ...campaingList]);
          if(gridApi) {
              gridApi.setQuickFilter(chosenSearch);
            gridApi.paginationGoToPage(0);
          }
        })();
    }, [searchUpdate, chosenSearch]);


    function onGridReady(params) {
        setGridApi(params.api);
    }


    function onPaginationChange(e) {
      if(e.newPage) {
        gridWrapperRef.current.scrollIntoView(true);
      }
    }

    function onFilterTextBoxChanged(e) {
      setChosenSearch(e.target.value);
    }

    function onSearchChange(e) {
      handleUpdate();
      setTimeout(() => {
          searchButton.current.click();
      }, 1000)

      if(gridApi) {
          gridApi.setQuickFilter(chosenSearch);
      }
    }

      return (
          <Stack
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: '20px'
            }}>
              <Stack
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: '20px'
              }}>
                <TextField
                  id="keywordsInput"
                  className="filter-select-box"
                  variant="outlined"
                  value={chosenSearch}
                  label="Пошук"
                  type="search"
                  ref={searchRef}
                  onChange={onFilterTextBoxChanged}
                />
                <Button variant="outlined" onClick={onSearchChange} ref={searchButton}>Пошук</Button>
              </Stack>

              {searchList && searchList.length > 0 && searchUpdate && (
                  <div ref={gridWrapperRef} className="ag-theme-alpine">
                      <AgGridReact
                          rowData={searchList}
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
                  </div>
              )}
              {searchList.length === 0 && (
                  <Typography>Вибачте, нічого не знайдено</Typography>
              )}
          </Stack>
    );
}
