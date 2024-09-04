import { createBrowserRouter } from 'react-router-dom';

// project import
import SampleRoutes from './SampleRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([SampleRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
