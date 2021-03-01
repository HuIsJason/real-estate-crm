import React from 'react';
import RequestDetailProps from './types'


const RequestDetails: React.FC<RequestDetailProps> = ({ hideDetails, account }: RequestDetailProps) => {

    return (
        <div>
            <button onClick={() => hideDetails()}> Go Back </button>
            <h2> Review Account Details </h2>
            <div>
                Email: {account.email}
            </div>
            <div>
                Name: {account.lastName}, {account.firstName}
            </div>
            <div>
                Phone Number: {account.phone}
            </div>
            <div>
                License Number: {account.licenseId}
            </div>
            Brokerage Information
            <div>
                Brokerage Name: {account.brokerage}
            </div>
            <div>
                Brokerage Address: {account.brokerageAddress}
            </div>
            <div>
                Brokerage Phone: {account.brokeragePhone}
            </div>
            <button> Deny Request </button>
            <button> Activate Account </button>
        </div>
    )


}

export default RequestDetails;