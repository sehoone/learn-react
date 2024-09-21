import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import store from './store';
import React, { Suspense } from 'react';
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
        {/* Suspense를 사용하여 비동기 로딩 상태 처리. router 에서 lazy를 사용해서 동적로드를 사용했으므로 컴포넌트가 로드 되었을떄 로드하기 위함 */}
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </React.StrictMode>
  );
}
export default App;