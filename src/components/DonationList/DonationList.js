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
  const [activeFilter, setActiveFilter] = useState(false);
  const [columnDefs, setColumnDefs] = useState([
    {field: 'name', filter: true},
    {field: 'title', filter: true},
    {field: 'amount', filter: true},
    {field: 'value', filter: true},
    {field: 'status', filter: true, hide: true},
    {field: 'description'},
    {field: 'id', cellRenderer: DonationCellRenderer, cellRendererParams: {setUpdate} }
    ]);
  const [gridApi, setGridApi] = useState(null);
  const activeFilterRef = useRef();
  const gridWrapperRef = useRef();

  useEffect(() => {
    (async () => {
      const donationList = await getAllDontaions();
      setDonationList(donationList);
    })();
    setUpdate(false);
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
      const active = activeFilterRef.current.value;
      if(active) {
          return node.data.status = 'active';
      } else {
          return true;
      }
  //     return
    // const selSpecs = selectedSpecialitiesRef.current;
    // const selSkills = selectedSkillsRef.current;
    // const selPlatforms = selectedPlatformsRef.current;
    // const selCountries = selectedCountryRef.current;
    // const selSeniority = selectedSeniorityRef.current;
    // let testTarget = node.data.specialities;
    // let testTargetSkills = node.data.skills;
    // let testTargetPlatfroms = node.data.platforms;
    // let testTargetCountries = node.data.country;
    // let testTargetSeniorities = node.data.seniorityLevel;
    //
    // let chosenCountry = 1;
    // let chosenSeniority = 1;
    //
    // if(selCountries.length === 0){
    //     chosenCountry = 0;
    // }
    //   if(selSeniority.length === 0){
    //       chosenSeniority = 0;
    //   }
    //
    // if(testTarget === undefined){
    //   testTarget = '';
    // }
    // if(testTargetSkills === undefined){
    //   testTargetSkills = '';
    // }
    // if(testTargetPlatfroms === undefined){
    //   testTargetPlatfroms = '';
    // }
    // if(testTargetCountries === undefined){
    //   testTargetCountries = '';
    // }
    // if(testTargetSeniorities === undefined){
    //   testTargetSeniorities = '';
    // }
    //
    // const matchedFilters = [...selSpecs.filter(s => testTarget.toLowerCase().indexOf(s.toLowerCase()) !== -1),
    //                         ...selSkills.filter(s => testTargetSkills.toLowerCase().indexOf(s.toLowerCase()) !== -1),
    //                         ...selPlatforms.filter(s => testTargetPlatfroms.toLowerCase().indexOf(s.toLowerCase()) !== -1),
    //                         ...selCountries.filter(s => testTargetCountries.toLowerCase().indexOf(s.toLowerCase()) !== -1),
    //                         ...selSeniority.filter(s => testTargetSeniorities.toLowerCase().indexOf(s.toLowerCase()) !== -1)
    //                     ];
    // const res = matchedFilters.length === selSpecs.length + selSkills.length + selPlatforms.length + chosenCountry + chosenSeniority;
    //
    // return res;
    // return node.data.specialities.contains("Gameplay");
  }

  return (
      <div className="ag-theme-alpine" ref={gridWrapperRef}>

        <Typography variant="h6" component="h2">
          DONATIONS
        </Typography>
        <FormGroup>
            <FormControlLabel control={<Switch ref={activeFilterRef}/>} label="Only Active Donations" />
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
