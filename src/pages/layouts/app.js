import React from 'react'
import Sidebar from '../../components/Navbar'
import Footer from './Footer'
import cx from 'classnames'

const AppLayout = (Component) => ({
    children,
    mobileNavVisibility,
    hideMobileMenu,
    history, 
    ...props }) =>
    <div className={cx({
        'nav-open': mobileNavVisibility === true
    })}>
        <div className="wrapper">
            <div className="close-layer" onClick={hideMobileMenu}></div>
            <Sidebar />
            <div className="main-panel">
            <Component {...props}>
                {children}
            </Component>
            <Footer />
            </div>
        </div>
    </div>

export default AppLayout
