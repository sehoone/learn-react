import { lazy } from 'react';

// project import

const XmlGenerator = lazy(() => import('@/pages/sample/xml-generator/xmlGenerator'));
const ExcelGenerator = lazy(() => import('@/pages/sample/excel-generator/excelGenerator'));

// ==============================|| AUTH ROUTING ||============================== //

const SampleRoutes = {
  path: '/',
  // element: <MinimalLayout />,
  children: [
    {
      path: '/xml-generator',
      element: <XmlGenerator />
    },
    {
      path: '/excel-generator',
      element: <ExcelGenerator />
    }
  ]
};

export default SampleRoutes;
