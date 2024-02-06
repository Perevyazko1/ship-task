import React, {useState} from 'react';
import {MainPage} from "pages/MainPage";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {DataContent} from "features/DataContext";


const client = new ApolloClient({
    uri: 'https://vortex.korabli.su/api/graphql/glossary/',
    cache: new InMemoryCache()
});

// eslint-disable-next-line react-hooks/rules-of-hooks

function App() {

    // const {loading, error, data} = useQuery(GET_VEHICLES);
    const [dataSort, setDataSort] = useState<any>()

    return (
        <DataContent.Provider value={{dataSort, setDataSort}}>
            <ApolloProvider client={client}>
                <div className="App">
                    <MainPage/>
                </div>
            </ApolloProvider>
        </DataContent.Provider>


    );
}

export default App;
