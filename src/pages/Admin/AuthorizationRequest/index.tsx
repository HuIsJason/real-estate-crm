import React, { useState } from 'react';
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

const requests = [
  { requestId: "R12234", 
      accountEmail: "joe@gmail.com",
      dateOfRequest: "10-02-2021" },
    {
      requestId: "R12235", 
      accountEmail: "maryg@gmail.com",
      dateOfRequest: "11-02-2021" 
    }
]

const AuthRequestsView: React.FC = () => {

  const [activeRequests, setRequests] = useState(requests);
  const [displayRequests, setDisplayRequests] = useState(requests);

  const [selectedRequest, setSelectedRequest] = useState(''); // Request Id of the selected row in the table
  const [account, setAccount] = useState(accounts[0]);
  const [searchValue, setSearchValue] = useState('');

  /* Opens the RequestDetails view showing the account associated with requestId */
  const openRequestDetails = (requestId: string) => {

    const selectedRequest = activeRequests.filter(request => request.requestId === requestId)[0];
    const associatedAccount = accounts.filter(account => account.email === selectedRequest.accountEmail)[0];

    setAccount(associatedAccount);
    setSelectedRequest(requestId);
    setSearchValue('');

  }

  /* Removes the request with requestId from the table */
  const deleteRequest = (requestId: string) => {
    const newRequests = activeRequests.filter(request => request.requestId !== requestId);
    setRequests(newRequests);
    setDisplayRequests(newRequests);
    setSelectedRequest('');
  }

  const filterSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    const newRequests = activeRequests.filter(request => request.accountEmail.includes(event.target.value));
    setDisplayRequests(newRequests);
  }

  return (
    <div>
      <h1 style={{ margin: 10}}>Authorization Requests</h1>
      { selectedRequest ? 
        (<div> 
          <RequestDetails deleteRequest={deleteRequest} requestId={selectedRequest} account={account} hideDetails={() => setSelectedRequest('')} />
        </div>)
      : (<div>
          <SearchBar value={searchValue} onChange={filterSearch}/>
          <SimpleTable requests={displayRequests} selectRequest={openRequestDetails}/>
        </div>)
      } 
    </div>
  );
};

export default AuthRequestsView;
