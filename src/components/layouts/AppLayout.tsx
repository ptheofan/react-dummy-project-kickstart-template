import { Outlet } from 'react-router-dom';
import TopNav from './TopNav.tsx';
import LeftMenu from './LeftMenu.tsx';
import './AppLayout.scss';

export default function AppLayout() {
  return (
    <div id='app-layout-root'>
      <TopNav />
      <LeftMenu />
      <main>
        <Outlet/>
      </main>
    </div>
  );
}
