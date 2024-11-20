import React, { useState, useEffect } from 'react';
import { GlobalApi } from '../../../_services/GlobalApi'; 
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from '@/components/ui/button';
import { FaTrash } from 'react-icons/fa'; 

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogTitle,
    AlertDialogDescription
} from '@radix-ui/react-alert-dialog';

import { toast } from 'sonner'; // Assuming you're using sonner for toast notifications

const paginationPageSize = 10;
const paginationPageSizeSelector = [10,25, 50, 100];

function StudentListTable({ studentsList, refreshData }) {
    // Custom button component for delete functionality
    const CustomButtons = ({ data }) => {
        const [loading, setLoading] = useState(false);

        const handleDelete = async () => {
            setLoading(true); // Set loading state when action is initiated
            try {
                await deleteRecord(data?.id); // Perform the deletion
                setLoading(false); // Reset loading state after deletion
            } catch (error) {
                setLoading(false); // Ensure loading state is reset even on error
                toast.error('Error deleting record');
            }
        };

        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive" disabled={loading}>
                        <FaTrash />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your record
                        and remove your data from our servers.
                    </AlertDialogDescription>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogContent>
            </AlertDialog>
        );
    };

    // Renderer for AgGridReact cell
    const CustomButtonsRenderer = (params) => <CustomButtons data={params.data} />;

    const [colDefs, setColDefs] = useState([
        { field: "id", filter: true },
        { field: "name", filter: true },
        { field: "email", filter: true },
        { field: 'action', cellRenderer: CustomButtonsRenderer }
    ]);
    const [rowData, setRowData] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if (studentsList) setRowData(studentsList);
    }, [studentsList]);

    // Function to handle record deletion
    const deleteRecord = async (id) => {
        try {
            const resp = await GlobalApi.deleteStudentRecord(id); // Make the API call to delete the record
            if (resp) {
                toast.success('Record deleted successfully');
                refreshData(); // Refresh data after successful deletion
            } else {
                toast.error('Failed to delete record');
            }
        } catch (error) {
            toast.error('Error deleting record');
        }
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    return (
        <div className='my-7'>
            <div className="ag-theme-quartz" style={{ height: 500 }}>
                <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm'>
                    <input
                        type='text'
                        placeholder='Search on anything...'
                        style={{
                            border: '1px solid #6a0dad',
                            borderRadius: '8px',
                            padding: '8px',
                            color: '#333'
                        }}
                        className='outline-none w-full'
                        value={searchInput}
                        onChange={handleSearchChange}
                    />
                </div>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    quickFilterText={searchInput}
                    pagination={true}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    );
}

export default StudentListTable;
