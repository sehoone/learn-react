import { Outlet } from "react-router-dom";
import SideBarComponent from "./SideBarComponent";

const SideBarLayout = () => (
    <div style={{ display: 'flex' }}>
        <SideBarComponent />
        <div style={{ flex: 1, padding: '20px' }}>
            <Outlet />
        </div>
    </div>
);

export default SideBarLayout;