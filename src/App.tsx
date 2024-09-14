import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import store from './store';
import React from 'react';
import { Provider } from 'react-redux';

// function App() {
//   return (
//     <React.StrictMode>
//       <Provider store={store}>
//         <div style={{ display: 'flex' }}>
//         <RouterProvider router={router} >
//         </RouterProvider>
//           <SideBarComponent />
//           <div style={{ flex: 1 }}>
//             {/* <RouterProvider router={router} /> */}
//           </div>
//         </div>
//       </Provider>
//     </React.StrictMode>
//   );
// }
// const Layout = () => (
//   <div style={{ display: 'flex' }}>
//     <SideBarComponent />
//     <div style={{ flex: 1, padding: '20px' }}>
//       <Outlet />
//     </div>
//   </div>
// );

// const appRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: router,
//   },
// ]);

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
}
export default App;