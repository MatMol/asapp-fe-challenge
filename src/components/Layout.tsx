import React from 'react';

// import Navbar from './Navbar';

function Layout(props: any) {
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            {props.children}
        </React.Fragment>
    )
}

export default Layout;