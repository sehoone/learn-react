import { lazy } from 'react';

// project import

const XmlGenerator = lazy(() => import('@/pages/sample/xmlGenerator'));

// ==============================|| AUTH ROUTING ||============================== //

const SampleRoutes = {
  path: '/',
  // element: <MinimalLayout />,
  children: [
    {
      path: '/xml-generator',
      element: <XmlGenerator />
    }
  ]
};

export default SampleRoutes;
