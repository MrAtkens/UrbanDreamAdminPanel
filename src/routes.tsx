import React, { lazy, Suspense, useEffect } from 'react';
import { ToastContainer } from 'react-toastify'
import {observer} from "mobx-react-lite";
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  LOGIN,
  DASHBOARD,
  MODERATORS,
  VENDORS,
  CUSTOMERS, CATEGORY
} from 'settings/constants';
import { InLineLoader } from 'components/InlineLoader';

import system from 'stores/systemStore'

const AdminLayout = lazy(() => import('containers/Layout/Layout'));
const Dashboard = lazy(() => import('containers/Dashboard/Dashboard'));
// const Pins = lazy(() => import('containers/Pins/Pins'));
const Moderators = lazy(() => import('containers/Moderators/Moderators'));
const Brigades = lazy(() => import('containers/Brigades/Brigades'));
const Users = lazy(() => import('containers/Users/Users'))
const Login = lazy(() => import('containers/Login/Login'));
const NotFound = lazy(() => import('containers/NotFound/NotFound'));


function PrivateRoute({ system, children, ...rest }) {

  return (
    <Route
      {...rest}
      render={({ location }) =>
        system.getAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const Routes = observer(() => {
        useEffect(() => {
            if(system.getAuthenticated)
                system.getUserData()
        }, []);
  return (
      <Suspense fallback={<InLineLoader />}>
        <Switch>
          <PrivateRoute system={system} exact={true} path={DASHBOARD}>
            <AdminLayout>
                <Dashboard />
            </AdminLayout>
          </PrivateRoute>
          {system.role === 5 &&
          <Switch>
            <PrivateRoute system={system} path={MODERATORS}>
              <AdminLayout>
                <Suspense fallback={<InLineLoader />}>
                  <Moderators />
                </Suspense>
              </AdminLayout>
            </PrivateRoute>
            {/*<PrivateRoute system={system} path={CATEGORY}>*/}
            {/*  <AdminLayout>*/}
            {/*    <Suspense fallback={<InLineLoader />}>*/}
            {/*      <Pins />*/}
            {/*    </Suspense>*/}
            {/*  </AdminLayout>*/}
            {/*</PrivateRoute>*/}
            <Route component={NotFound} />
          </Switch>}
            <PrivateRoute system={system} path={VENDORS}>
                <AdminLayout>
                    <Suspense fallback={<InLineLoader />}>
                        <Brigades />
                    </Suspense>
                </AdminLayout>
            </PrivateRoute>
            <PrivateRoute system={system} path={CUSTOMERS}>
                <AdminLayout>
                    <Suspense fallback={<InLineLoader />}>
                        <Users />
                    </Suspense>
                </AdminLayout>
            </PrivateRoute>
          <Route path={LOGIN}>
            <Login />
          </Route>
          <Route component={NotFound} />
        </Switch>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>
      </Suspense>
  );
}
);

export default Routes;
