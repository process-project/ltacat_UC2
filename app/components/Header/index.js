import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="slds-page-header" role="banner">
                <div className="slds-grid  slds-grid--vertical-align-center">
                    <div className="slds-col">
                        <h1 className="slds-page-header__title slds-truncate">
                            <a href="http://www.process-project.eu">
                                <img src="pics/logo-white-just.png" height="70"/>
                            </a>
                            {this.props.text}
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
};

export default Header;
