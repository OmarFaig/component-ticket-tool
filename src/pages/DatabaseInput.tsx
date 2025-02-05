import React, { useRef, useEffect } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";

import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

export default function DataBaseInput() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();

    // Render component
    return (
        <div className="spreadsheet-container">
        <Spreadsheet ref={spreadsheet} tabs={false} toolbar={false}>
            <Worksheet minDimensions={[10, 10]} />
        </Spreadsheet>
        </div>
    );
}
