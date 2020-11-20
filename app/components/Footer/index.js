import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div>

        <div className="footer slds-m-horizontal--large slds-m-top--xx-large">
          <div>
            <p>Version 1.0: This catalogue provides access to the LOFAR database and allows for processing the LOFAR data directly from the catalog.</p>
          </div>
        </div>

        <div className="page-footer" role="banner">
          <div className="slds-grid  slds-grid--vertical-align-center">
            <div className="slds-col">
              <a href="http://www.process-project.eu">
                <img src="pics/comision-europea.png" height="90"/>
              </a>
              <p>This project has received funding from the European Union’s Horizon 2020 research and innovation programme under Grant Agreement 777533.</p>
            </div>
          </div>
        </div>

      </div>
        );
    }
};

export default Footer;

