import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { dataType } from "../../types/Interfaces";
import { useNavigate  } from "react-router-dom";

interface BasicTableProps {
  dataJSON: dataType[];
  columnDef: any;
}

const BasicTable: React.FC<BasicTableProps> = ({ dataJSON, columnDef }) => {

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const navigate = useNavigate();


  const tableInstance = useReactTable({
    columns: columnDef,
    data: dataJSON,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <>
      <div className='max-h-96 overflow-y-auto bg-gray-800 text-white'>
        <table className='min-w-full border bg-gray-900'>
          <thead>
            {tableInstance.getHeaderGroups().map((headerEl) => {
              return (
                <tr key={headerEl.id}>
                  {headerEl.headers.map((columnEl) => {
                    return (
                      <th
                        className='py-2 px-4 border-b border-r'
                        key={columnEl.id}
                        colSpan={columnEl.colSpan}
                        onClick={columnEl.column.getToggleSortingHandler()}>
                        {columnEl.isPlaceholder
                          ? null
                          : flexRender(
                              columnEl.column.columnDef.header,
                              columnEl.getContext()
                            )}

                        {{ asc: " 🔼", desc: " 🔽" }[
                          columnEl.column.getIsSorted() as string
                        ] ?? null}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {tableInstance.getRowModel().rows.map((rowEl) => {
              return (
                
                  <tr className='hover:bg-gray-700' key={rowEl.id}
                  onClick={() => {
                    console.log("Row clicked:", rowEl);
                    navigate(`/country/${rowEl?.original?.country}`, {
                        state: rowEl?.original,
                      })
                  }}
                  style={{ cursor: "pointer" }}
                  >
                    {rowEl.getVisibleCells().map((cellEl) => {
                      return (
                        <td
                          className='py-2 px-4 border-b border-r'
                          key={cellEl.id}>
                          {flexRender(
                            cellEl.column.columnDef.cell,
                            cellEl.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BasicTable;
