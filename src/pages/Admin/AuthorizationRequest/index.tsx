import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Header } from '../../../components';
import SearchBar from '../../../components/SearchBar/index';
import SimpleTable from '../../../components/SimpleTable/index';
import RequestDetails from "../../../components/RequestDetail/index";
import { Account } from '../../../components/SimpleTable/types'

const accounts : Account[] = [
  { email: "joe@gmail.com",
    firstName: "joe",
    lastName: "brown",
    licenseId: "H123456",
    phone: "647-123-4567",
    brokerage: "Royal LePage",
    brokerageAddress: "123 Sesame St",
    brokeragePhone: "905-798-1000"
  },
  { email: "maryg@gmail.com",
    firstName: "Mary",
    lastName: "Green",
    licenseId: "H898009",
    phone: "905-888-9999",
    brokerage: "Homelife Miracle",
    brokerageAddress: "88 Pacific Ave",
    brokeragePhone: "905-798-2222"
  }
]

const AuthRequestsView: React.FC = () => {

  const newRequests = [
    { requestId: "R12234", 
      accountEmail: "joe@gmail.com",
      dateOfRequest: "10-02-2021" },
    {
      requestId: "R12235", 
      accountEmail: "maryg@gmail.com",
      dateOfRequest: "11-02-2021" 
    }
  ]

  const [requestDetails, setRequestDetails] = useState('');
  const [account, setAccount] = useState(accounts[0]);

  const openRequestDetails = (requestId: string) => {

    const selectedRequest = newRequests.filter(request => request.requestId === requestId)[0];
    const associatedAccount = accounts.filter(account => account.email === selectedRequest.accountEmail)[0];

    setAccount(associatedAccount);
    setRequestDetails(requestId);

  }
  
  // if (requestDetails) {
  //   return (<Redirect to={"/"} />)
  // }
  return (
    <div className='App'>
      <h1 style={{ margin: 10}}>Authorization Requests</h1>
      { requestDetails ? <div> <RequestDetails account={account} hideDetails={() => setRequestDetails('')} > Details: {requestDetails} </RequestDetails></div> : (<div>
          <SearchBar />
          <SimpleTable requests={newRequests} selectRequest={openRequestDetails}/>
          </div>)
      } 
    </div>
  );
};

export default AuthRequestsView;
