import React, {useState} from 'react';
import './App.css';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

function App() {
    // Definition of the initial state and how they will be updated
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState('');

    const fetchData = () => {
        // REST API call
        const url = `https://api.github.com/search/repositories?q=${keyword}`;
        fetch(url)
        .then(response => response.json())
        .then(responseData => {
            setData(responseData.items);
        });
    }

    // Definition of what will happen when a change in the input is detected
    const handleChange =(e) => {
        setKeyword(e.target.value);
    }

    // when clicked the button, pops-up an alert with the value determined in the accessor of that column
    const btnClick = (value) => {
        alert (value)
    }

    const columns = [{
        Header: 'Name', //Header of the column
        accessor: 'full_name', // Value accessor (mandatory). It comes from the response from the API
    }, {
        Header: 'URL',
        accessor: 'html_url',
    }, {
        Header: 'Owner', 
        accessor: 'owner.login',
    }, {
        id: 'button',
        sortable: false, 
        filteable: false,
        width: 100, 
        accessor: 'full_name',
        Cell: ({value}) => (<button onClick= {() => {btnClick(value)}}> Click me </button>)
    }]

    return (
        <div className="App">
            <input type="text" onChange={handleChange}/>
            <button onClick={fetchData} value="keyword"> Fetch </button>
            <ReactTable data={data} columns={columns} filterable={true} defaultPageSize = {10}/>    
        </div>
    );
}

export default App;