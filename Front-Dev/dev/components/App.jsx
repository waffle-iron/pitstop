import React from "react";
import { Router, Route, Link, IndexRoute, IndexLink, browserHistory } from 'react-router'
import HeaderContainer from './../containers/HeaderContainer'
import MainPage from './main/MainPage.jsx'
import CarWashPage from './../components/carwash/CarWashPage.jsx'

export default class App extends React.Component{
    render(){
        return (
            <Router history={browserHistory}>
                <Route path="/owner.html" component={HeaderContainer}>
                    <IndexRoute component={MainPage}/>
                    <Route path="/carwash(/:action)" component={CarWashPage}/>
                    <Route path="/carwash/:action/:id" component={CarWashPage} />
                    
                </Route>
            </Router>
        )
    }
}


// ReactDOM.render(
//     <Provider store={store}>
//         <Main/>
//         <Router history={hashHistory}>
//             <Route path="/" component={MyHeader}>
//                 <IndexRoute component={Main}/>
//                 <Route path="carwash" component={CarWashPage} />
//                 <Route path="carwashAdd" component={AddCarWashPage} />
//                 <Route path="carwashAdd/:carWashId" component={EditCarWashPage} />
//             </Route>
//         </Router>
//     </Provider>
// );
 
