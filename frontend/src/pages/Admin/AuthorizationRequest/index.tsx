import React, { useEffect, useState } from 'react';
import SearchBar from '../../../components/SearchBar/index';
import AuthRequestTable from '../../../components/AuthRequestTable/index';
import RequestDetails from "../../../components/RequestDetail/index";
import AppBar from '../../../components/AppBar';
import { makeStyles, Theme, Typography } from '@material-ui/core';

import { Agent } from "../../../utils/types";
import send from "../../../requests/request";

const dummyAgents: Agent[] = [];

const AuthRequestsView: React.FC = () => {
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
    })
    .catch(error => {
      console.log(error);
      alert("Could not get authorization requests from server... Please try again later.");
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
