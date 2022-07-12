import React from 'react';

function Layout(props: any) {
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default Layout;