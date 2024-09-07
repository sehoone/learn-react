import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import './excelGenerator.css';

const ExcelGenerator = () => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const [fileInterfaces, setFileInterfaces] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          console.log('json', json);
          const interfaceContent = generateInterfaces(json as unknown[][]);
          setFileInterfaces(prev => [...prev, interfaceContent]);
          setFileNames(prev => [...prev, file.name]);
        };
        reader.readAsArrayBuffer(file);
      });
    }
  };

  const toCamelCase = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/_./g, s => s.charAt(1).toUpperCase());
  };

  const generateComment = (comment: string, id: string, type: string, length: string): string => {
    return `
  /**
   * ${comment}
   * @ID ${id}
   * @타입 ${type}
   * @길이 ${length}
   */`;
  };

  const generateInterfaces = (data: unknown[][]): string => {
    let requestInterface = 'interface RequestInterface {\n';
    let responseInterface = 'interface ResponseInterface {\n';
    let isRequest = true;

    const processGroup = (startIndex: number): { groupInterface: string, endIndex: number } => {
      let groupInterface = '';
      let i;
      for (i = startIndex; i < data.length; i++) {
        const row = data[i];
        if (row[1] !== 2) break;

        const variableName = row[6] ? row[6] : toCamelCase(row[2] as string);
        const variableComment = row[3] as string;
        let variableType = row[4] as string;
        const variableLength = row[5] as string;
        if (variableType === 'Numeric') {
          variableType = 'number';
        }

        const variableDoc = generateComment(variableComment, row[2] as string, variableType, variableLength) + `
  ${variableName}: ${variableType};\n`;

        groupInterface += variableDoc;
      }
      return { groupInterface, endIndex: i };
    };

    for (let index = 0; index < data.length; index++) {
      const row = data[index];
      if (index === 0) continue; // Skip the first row if it's just a section header
      if (row[0] === '응답') {
        isRequest = false;
        continue;
      }
      if (index === 1 || row[0] === '요청') continue; // Skip the section headers

      if (typeof row[0] === 'number') {
        const variableName = row[6] ? row[6] : toCamelCase(row[2] as string);
        const variableComment = row[3] as string;
        let variableType = row[4] as string;
        const variableLength = row[5] as string;
        if (variableType === 'Numeric') {
          variableType = 'number';
        }

        if (variableType === 'Group') {
          const { groupInterface, endIndex } = processGroup(index + 1);
          const variableDoc = generateComment(variableComment, row[2] as string, variableType, variableLength) + `
  ${variableName}: Array<{
${groupInterface}
  }>;\n`;

          if (isRequest) {
            requestInterface += variableDoc;
          } else {
            responseInterface += variableDoc;
          }
          index = endIndex - 1; // Skip processed group items
        } else {
          const variableDoc = generateComment(variableComment, row[2] as string, variableType, variableLength) + `
  ${variableName}: ${variableType};\n`;

          if (isRequest) {
            requestInterface += variableDoc;
          } else {
            responseInterface += variableDoc;
          }
        }
      }
    }

    requestInterface += '}\n';
    responseInterface += '}\n';

    return requestInterface + '\n' + responseInterface;
  };

  const downloadInterfaceFile = (fileName: string, interfaceContent: string) => {
    const baseFileName = fileName.replace('.xlsx', '');
    const blob = new Blob([interfaceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${baseFileName}.type.ts`;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(url); // Clean up the URL object
    }
  };

  const handleDownloadClick = (index: number) => {
    downloadInterfaceFile(fileNames[index], fileInterfaces[index]);
  };

  return (
    <div className="excel-generator">
      <h3>xlsx interface layout Generator</h3>
      <input type="file" multiple onChange={handleFileChange} className="file-input" />
      <div className="file-list">
        {fileInterfaces.map((_fileInterface, index) => (
          <div key={index} className="file-item">
            <span className="file-name">{fileNames[index]}</span>
            <button onClick={() => handleDownloadClick(index)} className="download-button">Download</button>
          </div>
        ))}
      </div>
      <a ref={downloadLinkRef} style={{ display: 'none' }}>Download</a>
    </div>
  );
};

export default ExcelGenerator;