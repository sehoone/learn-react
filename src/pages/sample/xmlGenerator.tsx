import React, { useState, useRef } from 'react';
import './xmlGenerator.css';

interface FileInterface {
  fileName: string;
  interfaceContent: string;
}

export default function XmlGenerator() {
  const [fileInterfaces, setFileInterfaces] = useState<FileInterface[]>([]);
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFileInterfaces: FileInterface[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            const xmlContent = e.target.result as string;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlContent, 'application/xml');
            const dataCollection = xmlDoc.getElementsByTagName('w2:dataCollection')[0];
            let allInterfaces = '';

            // Process w2:dataMap
            const dataMaps = dataCollection.getElementsByTagName('w2:dataMap');
            for (let j = 0; j < dataMaps.length; j++) {
              const dataMap = dataMaps[j];
              const keys = dataMap.getElementsByTagName('w2:key');
              const interfaceName = dataMap.getAttribute('id') || `DataMap${j}`;
              allInterfaces += generateObjectInterface(interfaceName, keys);
            }

            // Process w2:dataList
            const dataLists = dataCollection.getElementsByTagName('w2:dataList');
            for (let j = 0; j < dataLists.length; j++) {
              const dataList = dataLists[j];
              const columns = dataList.getElementsByTagName('w2:column');
              const interfaceName = dataList.getAttribute('id') || `DataList${j}`;
              allInterfaces += generateArrayInterface(interfaceName, columns);
            }

            newFileInterfaces.push({ fileName: file.name, interfaceContent: allInterfaces });
            setFileInterfaces([...newFileInterfaces]);
          }
        };

        reader.readAsText(file);
      }
    }
  };

  const generateObjectInterface = (interfaceName: string, keys: HTMLCollectionOf<Element>): string => {
    let interfaceContent = `interface ${interfaceName} {\n`;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const id = key.getAttribute('id');
      const name = key.getAttribute('name');
      const dataType = mapDataType(key.getAttribute('dataType') || 'any');
      interfaceContent += `  ${id}: ${dataType}; // ${name}\n`;
    }
    interfaceContent += `}\n`;
    return interfaceContent;
  };

  const generateArrayInterface = (interfaceName: string, columns: HTMLCollectionOf<Element>): string => {
    let interfaceContent = `interface ${interfaceName}Item {\n`;
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const id = column.getAttribute('id');
      const name = column.getAttribute('name');
      const dataType = mapDataType(column.getAttribute('dataType') || 'any');
      interfaceContent += `  ${id}: ${dataType}; // ${name}\n`;
    }
    interfaceContent += `}\n`;
    interfaceContent += `type ${interfaceName} = ${interfaceName}Item[];\n`;
    return interfaceContent;
  };

  const mapDataType = (dataType: string): string => {
    switch (dataType) {
      case 'number':
        return 'number';
      case 'text':
        return 'string';
      case 'date':
        return 'Date';
      default:
        return 'any';
    }
  };

  const downloadInterfaceFile = (fileName: string, interfaceContent: string) => {
    const baseFileName = fileName.replace('.xml', '');
    const blob = new Blob([interfaceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${baseFileName}.type.ts`;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(url); // Clean up the URL object
    }
  };

  return (
    <div className="xml-generator">
      <h3>websquare xml data Generator</h3>
      <input type="file" multiple onChange={handleFileChange} />
      <div className="file-list">
        {fileInterfaces.map((fileInterface, index) => (
          <div key={index} className="file-item">
            <span className="file-name">{fileInterface.fileName}</span>
            <button className="download-button" onClick={() => downloadInterfaceFile(fileInterface.fileName, fileInterface.interfaceContent)}>
              Download
            </button>
          </div>
        ))}
      </div>
      <a ref={downloadLinkRef} style={{ display: 'none' }}>Download</a>
    </div>
  );
}