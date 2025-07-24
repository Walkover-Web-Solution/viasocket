import React from 'react';
import IntegrationsRequestComp from '../IntegrationsComp/IntegrationsBetaComp/integrationsRequestComp';

const RequestFormButtonComp = ({ type, searchTerm }) => {
    let buttonText;

    switch (type) {
        case 'app':
            buttonText = 'Request Integration';
            break;
        case 'combination':
            buttonText = 'Request Combination';
            break;
        case 'action':
            buttonText = 'Request Action';
            break;
        case 'trigger':
            buttonText = 'Request Trigger';
            break;
        default:
            buttonText = 'Request';
    }

    return (
        <div>
            <button
                className="btn btn-accent"
                onClick={() => document.getElementById('plugin_request_form').showModal()}
            >
                {buttonText}
            </button>
            <IntegrationsRequestComp type={type} {...(searchTerm ? { searchTerm } : {})} />
        </div>
    );
};

export default RequestFormButtonComp;
