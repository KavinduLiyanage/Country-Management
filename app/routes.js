import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Loadable from 'react-loadable';
import Layout from './layout';
import { history } from './store';
import { ScProvider } from './contexts/scContext';
import LoadingComponent from './components/common/loading';
import { BaseAuth } from './components/authRoute';

// ########## USER ##########
const SignIn = Loadable({
    loader: () => import('./containers/login/signin'),
    loading: LoadingComponent,
});
const Dashboard = Loadable({
    loader: () => import('./containers/application/dashboard'),
    loading: LoadingComponent,
});

const CountryDistance = Loadable({
    loader: () => import('./containers/application/countryDistance'),
    loading: LoadingComponent,
});

const ClosestCountry = Loadable({
    loader: () => import('./containers/application/closestCountry'),
    loading: LoadingComponent,
});
const CountriesTimezone = Loadable({
    loader: () => import('./containers/application/countriesTimezone'),
    loading: LoadingComponent,
});
const CountriesSearch = Loadable({
    loader: () => import('./containers/application/countriesSearch'),
    loading: LoadingComponent,
});

const Routes = () => (
    <ConnectedRouter history={history}>
        <ScProvider>
            <Layout>
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/login" component={SignIn} />
                    <BaseAuth>
                        <Route path="/dashboard" render={() => <Dashboard />} />
                        <Route path="/country/distance" component={CountryDistance} />
                        <Route path="/country/closest" component={ClosestCountry} />
                        <Route path="/countries/timezone" component={CountriesTimezone} />
                        <Route path="/countries/search" component={CountriesSearch} />
                    </BaseAuth>
                    <Redirect from="/*" to="/" />
                </Switch>
            </Layout>
        </ScProvider>
    </ConnectedRouter>
);

export default Routes;
