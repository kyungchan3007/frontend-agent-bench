import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// 측정용(#61): 화면에서는 쓰지 않는다. 파일을 불러오는 순간 실행되는 등록 코드 (부수 효과)
ModuleRegistry.registerModules([AllCommunityModule]);

export function DataGrid<T>({ rows, columns }: { rows: T[]; columns: { field: string }[] }) {
  return <AgGridReact rowData={rows} columnDefs={columns as never} domLayout="autoHeight" />;
}
