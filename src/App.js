import React, {useState} from 'react';
import './App.css';

function App() {
    // Definimos los estados iniciales y como se actualizarán
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState('');

    const fetchData = () => {
        // Llamada a la REST API aquí
        const url = `https://api.github.com/search/repositories?q=${keyword}`;
        fetch(url)
        .then(response => response.json())
        .then(responseData => {
            setData(responseData.items);
        });
    }

    // Definimos qué ocurrirá cuando se detecte un cambio en el input
    const handleChange =(e) => {
        setKeyword(e.target.value);
    }

    // Definimos la tabla que contendrá los datos recuperados a través de la API
    const tableRows = data.map((item, index) => 
        <tr key={index}>
            <td> {item.full_name}</td>
            <td> <a href={item.html_url}>{item.html_url}</a></td>
        </tr>);

    return (
        <div className="App">
            <input type="text" onChange={handleChange}/>
            <button onClick={fetchData} value="keyword"> Fetch </button>
            <table><tbody>{tableRows}</tbody></table>
        </div>
    );
}

export default App;
