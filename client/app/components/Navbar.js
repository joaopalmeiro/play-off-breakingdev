import React, {Component} from 'react';
import { Route, NavLink } from "react-router-dom";

import classNames from 'classnames';

import logo from '../../public/assets/img/logo-horizontal.svg';
import user from '../../public/assets/img/icon-user.svg';
import styles from '../styles/partials/_navbar.scss';
import Main from './Main.js'
import Homepage from './Homepage.js';
import Aboutpage from './Aboutpage.js';

const cx = classNames.bind(styles);

class Navbar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar">
                    <div className="navbar-wrapper">
                        <div className="navbar-logo">
                            <div className="{cx('logo')}" dangerouslySetInnerHTML={{ __html: logo }}></div>
                        </div>

                        <div className="navbar-collapse">
                            <ul className="navbar-nav">
                                <li><NavLink exact to="/" activeClassName="navbar-nav-selected">HOME</NavLink></li>
                                <li><NavLink exact to="/about" activeClassName="navbar-nav-selected">ABOUT</NavLink></li>
                                <li><NavLink exact to="/games" activeClassName="navbar-nav-selected">GAMES</NavLink></li>
                            </ul>
                        </div>

                        <div className="navbar-user">
                            <div className={cx('user')} dangerouslySetInnerHTML={{ __html: user }}></div>
                        </div>
                    </div>
                </nav>

                <Route exact path="/" component={Home} />
                <Route path="/games" component={Events} />
                <Route path="/about" component={About} />

            </div>

        );
    }
}

const Home = () => (
    <div>
      <Homepage/>
    </div>
);

const About = () => (
    <div>
      <Aboutpage/>
    </div>
);

const Events = () => (
    <div>
      <Main/>
    </div>
);

const News = () => (
    <div>

    </div>
);

export default Navbar;
