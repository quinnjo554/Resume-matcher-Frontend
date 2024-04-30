
import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

function ResumeViewer({ file }: { file: File }) {
  const [numPages, setNumPages] = useState<any>(null);
  const [pdf, setPdf] = useState<any>();
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
          />
        ))}
      </Document>
    </div>
  );
}

export default ResumeViewer;
