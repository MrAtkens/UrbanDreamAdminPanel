import React  from 'react';
import { observer } from "mobx-react-lite";
import { useHistory, withRouter} from 'react-router-dom';
import {
  SidebarWrapper,
  NavLink,
  MenuWrapper,
  Svg,
  LogoutBtn,
} from './Sidebar.style';
import {
    CATEGORY,
    DASHBOARD, MODERATORS,VENDORS, CUSTOMERS
} from 'settings/constants';

import { DashboardIcon } from 'assets/icons/DashboardIcon';
import { UserAvatar } from 'assets/icons/UserAvatar'; // Moderators
import { GroceryIcon } from 'assets/icons/GroceryIcon'; // Brigades
import { SidebarCategoryIcon } from 'assets/icons/SidebarCategoryIcon' // Category
import { CustomerIcon } from "assets/icons/CustomerIcon"; // Users
import { LogoutIcon } from 'assets/icons/LogoutIcon';

import system from 'stores/systemStore'

const sidebarSuperAdminMenus = [
    {
        name: 'Статистика',
        path: DASHBOARD,
        exact: true,
        icon: <DashboardIcon />,
    },
    {
        name: 'Модераторы',
        path: MODERATORS,
        exact: false,
        icon: <UserAvatar />,
    },
    {
        name: 'Категории',
        path: CATEGORY,
        exact: false,
        icon: <SidebarCategoryIcon />,
    },
];


const sidebarModeratorMenus = [
    {
        name: 'Статистика',
        path: DASHBOARD,
        exact: true,
        icon: <DashboardIcon />,
    },
    {
        name: 'Продавцы',
        path: VENDORS,
        exact: false,
        icon: <GroceryIcon />,
    },
    {
        name: 'Покупатели',
        path: CUSTOMERS,
        exact: false,
        icon: <CustomerIcon />
    }
];

const Sidebar = observer(({
                refs,
                style,
                onMenuItemClick,
              }: any) => {
  let history = useHistory();
  return (
      <SidebarWrapper ref={refs} style={style}>
        <MenuWrapper>
            {system.role === 5 ? (
                sidebarSuperAdminMenus.map((menu: any, index: number) => (
                    <NavLink
                        to={menu.path}
                        key={index}
                        exact={menu.exact}
                        activeStyle={{
                            color: '#00C58D',
                            backgroundColor: '#f7f7f7',
                            borderRadius: '50px 0 0 50px',
                        }}
                        onClick={onMenuItemClick}
                    >
                        {menu.icon ? <Svg>{menu.icon}</Svg> : ''}
                        {menu.name}
                    </NavLink>
                ))
            ) : (
                sidebarModeratorMenus.map((menu: any, index: number) => (
                    <NavLink
                        to={menu.path}
                        key={index}
                        exact={menu.exact}
                        activeStyle={{
                            color: '#00C58D',
                            backgroundColor: '#f7f7f7',
                            borderRadius: '50px 0 0 50px',
                        }}
                        onClick={onMenuItemClick}
                    >
                        {menu.icon ? <Svg>{menu.icon}</Svg> : ''}
                        {menu.name}
                    </NavLink>
                ))
            )}
        </MenuWrapper>

        <LogoutBtn
            onClick={() => {
              system.singOut().then(() => {
                  history.push("/")
              });
            }}
        >
          <Svg>
            <LogoutIcon />
          </Svg>
          Выход
        </LogoutBtn>
      </SidebarWrapper>
  );
})

export default withRouter(Sidebar);
