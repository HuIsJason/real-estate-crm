import React, { useEffect, useState } from 'react';
import SearchBar from '../../../components/SearchBar/index';
import AuthRequestTable from '../../../components/AuthRequestTable/index';
import RequestDetails from "../../../components/RequestDetail/index";
import AppBar from '../../../components/AppBar';
import { makeStyles, Theme, Typography } from '@material-ui/core';

import { Agent } from "../../../utils/types";
import send from "../../../requests/request";

const mockAccounts = [
  
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

const dummyAgents: Agent[] = [];

const AuthRequestsView: React.FC = () => {

  // Get all active account authorization requests from server

  const [displayRequests, setDisplayRequests] = useState(dummyAgents);
  
  const [accounts, setAccounts] = useState(dummyAgents);
  const [selectedAccount, setSelectedAccount] = useState<Agent|null>(null);

  const [searchValue, setSearchValue] = useState('');
  const [displayPage, setDisplayPage] = useState(1);

  const classes = useStyles();

  useEffect(() => {
    // Get all the accounts that are pending authorization from server
    send("getInactivatedAgents")
    .then(response => response.json())
    .then(data => {
      setAccounts(data.agents);
      setDisplayRequests(data.agents);
    });

  }, [])

  /* Opens the RequestDetails view showing the account associated with requestId */
  const openAccountDetails = (username: string) => {
    const account = accounts.filter(account => account.username === username)[0];

    setSelectedAccount(account);
    setSearchValue('');
    setDisplayPage(1);

  }

  /* Removes the request with requestId from the table */
  const deleteRequest = (username: string) => {
    const updatedAccounts = accounts.filter(account => account.username !== username);
    setAccounts(updatedAccounts);
    setDisplayRequests(updatedAccounts);
    setSelectedAccount(null);
  }

  const filterSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchValue(search);

    const updatedRequests = accounts.filter(account => {
      return account.username.includes(search) || (account.email ? account.email.includes(search) : false);
    });
    setDisplayRequests(updatedRequests);
    setDisplayPage(1);
  }

  return (
    <div>
      <AppBar showDashboardbtn />
      <div className={classes.root}>
        <div> <Typography variant="h6" gutterBottom color='primary'> Authorization Requests </Typography> </div>
        { selectedAccount ? 
          (<div> 
            <RequestDetails deleteRequest={deleteRequest} username={selectedAccount.username} account={selectedAccount} hideDetails={() => setSelectedAccount(null)} />
          </div>)
        : (<div>
            <SearchBar value={searchValue} onChange={filterSearch}/>
            <AuthRequestTable accounts={displayRequests} selectRequest={openAccountDetails}
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
