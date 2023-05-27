
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const SchoolDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.schoolName}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.env}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.levelEdu}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.type}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.state}</p>
    const tickTemplate6 = (rowData, { rowIndex }) => <i className={`pi ${rowData.isBoarding?"pi-check": "pi-times"}`}  ></i>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="schoolName" header="School Name" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="env" header="Environment" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="levelEdu" header="Level of Education" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="totalStudent" header="Total Students"  style={{ minWidth: "8rem" }} />
            <Column field="type" header="School Type" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="state" header="State" body={pTemplate5} sortable style={{ minWidth: "8rem" }} />
            <Column field="isBoarding" header="Boarding" body={tickTemplate6} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default SchoolDataTable;