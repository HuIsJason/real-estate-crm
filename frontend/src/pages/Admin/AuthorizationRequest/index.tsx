import React, { useState } from 'react';
import SearchBar from '../../../components/SearchBar/index';
import AuthRequestTable from '../../../components/AuthRequestTable/index';
import RequestDetails from "../../../components/RequestDetail/index";
import { Account } from '../../../components/AuthRequestTable/types';
import AppBar from '../../../components/AppBar';
import { makeStyles, Theme, Typography } from '@material-ui/core';

const mockAccounts : Account[] = [
  
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
  },
  { email: "harrym@gmail.com",
      firstName: "Harry",
      lastName: "Mills",
      licenseId: "H987654",
      phone: "647-999-8888",
      brokerage: "Homelife Miracle",
      brokerageAddress: "88 Pacific Ave",
      brokeragePhone: "905-798-2222",
    },
    { email: "georgeli@gmail.com",
      firstName: "George",
      lastName: "Li",
      licenseId: "H5613576",
      phone: "647-777-1234",
      brokerage: "Homelife Miracle",
      brokerageAddress: "88 Pacific Ave",
      brokeragePhone: "905-798-2222",
    },
    { email: "james@gmail.com",
      firstName: "James",
      lastName: "Li",
      licenseId: "H823910",
      phone: "416-000-0001",
      brokerage: "Homelife Miracle",
      brokerageAddress: "88 Pacific Ave",
      brokeragePhone: "905-798-2222",
    },
    { email: "miranda@gmail.com",
      firstName: "Miranda",
      lastName: "Redwood",
      licenseId: "H162751",
      phone: "416-882-9829",
      brokerage: "Homelife Miracle",
      brokerageAddress: "88 Pacific Ave",
      brokeragePhone: "905-798-2222"
    },
    { email: "taylor.white@gmail.com",
      firstName: "Taylor",
      lastName: "White",
      licenseId: "H128926",
      phone: "647-345-678",
      brokerage: "Remax",
      brokerageAddress: "456 Sesame St",
      brokeragePhone: "905-111-2021",
    },

]

const requests = [
  { requestId: "R12234", 
      accountEmail: "joe@gmail.com",
      dateOfRequest: "10-02-2021" 
  },
  {
    requestId: "R12235", 
    accountEmail: "maryg@gmail.com",
    dateOfRequest: "11-02-2021" 
  },
  {
    requestId: "R12236", 
    accountEmail: "harrym@gmail.com",
    dateOfRequest: "09-02-2021" 
  },
  {
    requestId: "R12237", 
    accountEmail: "georgeli@gmail.com",
    dateOfRequest: "09-02-2021" 
  },
  {
    requestId: "R12238", 
    accountEmail: "james@gmail.com",
    dateOfRequest: "09-02-2021" 
  },

]

const AuthRequestsView: React.FC = () => {

  // Get all active account authorization requests from server
  const [activeRequests, setRequests] = useState(requests);
  const [displayRequests, setDisplayRequests] = useState(requests);
  const [selectedRequest, setSelectedRequest] = useState(''); // Request Id of the selected row in the table

  // Get all the accounts that are pending authorization from server
  const accounts = mockAccounts;
  const [account, setAccount] = useState<Account|null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [displayPage, setDisplayPage] = useState(1);

  const classes = useStyles();

  /* Opens the RequestDetails view showing the account associated with requestId */
  const openRequestDetails = (requestId: string) => {

    const selectedRequest = activeRequests.filter(request => request.requestId === requestId)[0];
    const associatedAccount = accounts.filter(account => account.email === selectedRequest.accountEmail)[0];

    setAccount(associatedAccount);
    setSelectedRequest(requestId);
    setSearchValue('');
    setDisplayPage(1);

  }

  /* Removes the request with requestId from the table */
  const deleteRequest = (requestId: string) => {
    // TODO: Send request to server to delete the request with id requestId
    const newRequests = activeRequests.filter(request => request.requestId !== requestId);
    setRequests(newRequests);
    setDisplayRequests(newRequests);
    setSelectedRequest('');
  }

  const filterSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    const newRequests = activeRequests.filter(request => request.accountEmail.includes(event.target.value));
    setDisplayRequests(newRequests);
    setDisplayPage(1);
  }

  return (
    <div>
      <AppBar showDashboardbtn />
      <div className={classes.root}>
        <div> <Typography variant="h6" gutterBottom color='primary'> Authorization Requests </Typography> </div>
        { selectedRequest ? 
          (<div> 
            <RequestDetails deleteRequest={deleteRequest} requestId={selectedRequest} account={account} hideDetails={() => setSelectedRequest('')} />
          </div>)
        : (<div>
            <SearchBar value={searchValue} onChange={filterSearch}/>
            <AuthRequestTable requests={displayRequests} selectRequest={openRequestDetails}
            displayPage={displayPage} onClickNext={() => setDisplayPage(displayPage + 1)} onClickPrev={() => setDisplayPage(displayPage - 1)}/>
          </div>)
        } 
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(5),
  },
}));

export default AuthRequestsView;
