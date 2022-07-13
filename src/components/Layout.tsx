import './Layout.scss';
import AsappLogo from '../assets/asapp-logo.svg';

function Layout(props: any) {
    return (
        <section className="container">
            <nav className="container-navbar">
                <div className="container-navbar_image">
                    <img src={AsappLogo} alt="ASAPP Logo" />
                </div>
            </nav>
            <div className="container-content">
                {props.children}
            </div>
        </section>
    )
}

export default Layout;