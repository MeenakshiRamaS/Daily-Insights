import { useState, useEffect } from "react";
import LineChart from "./BarChart";

const Home = () => {
  interface StockData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    
  }

  const [userData, setUserData] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setOptions] = useState({});
  const [stockArray, setStockArray] = useState<StockData[]>([]);
  const API_KEY = "crl6yryb5CKB9MCz3HdVaNiU7yYa8SGr";
  const [text_input, setTextInput] = useState('');
  const [y_axis, setYAxis] = useState("data.open");

  const onClickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchMyData();
  };

  /* setting dates */
  var curr = new Date();
  var startDay = new Date();
  startDay.setDate(curr.getDate() - 15);
  const endDate = curr.toISOString().split("T")[0];
  const startDate = startDay.toISOString().split("T")[0];

  /* change y axis variable */
  const handleYAxisChange = async (value: string) => {
    setYAxis(value);
  };

  const fetchMyData = async () => {
    const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${text_input}/range/1/day/${startDate}/${endDate}?apiKey=${API_KEY}
`     );
    const fetchedData = await response.json();
    const stockArray = fetchedData.results.map((item: any) => {
    const date = new Date(item.t);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  

    return {
      date: formattedDate,
      open: item.o,
      high: item.h,
      low: item.l,
      close: item.c,
      volume: item.v,
    };
    });
    setStockArray(stockArray);
    };
  
  useEffect(() => {
    if (stockArray.length > 0){
      console.log("array lengtH: ", stockArray.length);
      let dataVar: number[];
      let labelVar: string;

      if (y_axis == "data.open") {
        dataVar = stockArray.map((data) => data.open);
        labelVar = "Open Prices";
      } else if (y_axis == "data.high") {
        dataVar = stockArray.map((data) => data.high);
        labelVar = "High Prices";
      } else if (y_axis == "data.low") {
        dataVar = stockArray.map((data) => data.low);
        labelVar = "Low Prices";
      } else if (y_axis == "data.close") {
        dataVar = stockArray.map((data) => data.close);
        labelVar = "Close Prices";
      } else {
        dataVar = stockArray.map((data) => data.volume);
        labelVar = "Stock Volume";
      }
      
      const chart = {
        labels: stockArray.map((data) => data.date),
        datasets: [
          {
            label: labelVar,
            data: dataVar,
            backgroundColor: "#E7F0C1",
            borderColor: "#E7F0C1",
            borderWidth: 1,
          },
        ],
      };
      setUserData(chart);
      const options = {
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: labelVar,
            color: "#315020",
            font: {
              family: "Lucida Console",
              size: 15,
              weight: "bold"
            }
          }
        },
        scales: {
          y: {             
            title: {
              display: true,
              text: labelVar,
              color: "#315020",
              font: {
                family: "Lucida Console",
                size: 15,
                weight: "bold"
              }
            },
            ticks: {
              color: '#315020' 
            },
            grid: {
              color: "#315020"
              }
          },
          x: {
            title: {
              display: true,
              text: "Date",
              color: "#315020",
              font: {
                family: "Lucida Console",
                size: 15,
                weight: "bold"
              }
            },
            ticks: {
              color: '#315020' 
            },
            grid: {
              color: "#315020"
            }
          }
        }
    }
    setOptions(options);
    }
  }, [stockArray, y_axis]);


  return (
    <>
    <head>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
    </head>
    <div className = "full">
       <div className = "inner-box">
       <h1>Daily Insights</h1>
       <div className = "search-bar">
        <input type="text" id="phrase"
        placeholder = "enter stock name"
        required
        value = {text_input}
        onChange={(e) => setTextInput(e.target.value)}
        />
        <form action="" onSubmit = {onClickSubmit}>
          <button type = "submit" className = "search_btn">Search!</button>
        </form>
        </div>
      </div>
      {stockArray.length > 0 && (
        <div className = "bottom">
          <div className = "chart">
            <LineChart chartData = {userData} chartOptions = {chartOptions as any}/>
            <div>
              <button className="graph-type" onClick={() => handleYAxisChange('data.open')}>Open Price</button>
              <button className="graph-type" onClick={() => handleYAxisChange('data.high')}>High Price</button>
              <button className="graph-type" onClick={() => handleYAxisChange('data.low')}>Low Price</button>
              <button className="graph-type" onClick={() => handleYAxisChange('data.close')}>Close Price</button>
              <button className="graph-type" onClick={() => handleYAxisChange('data.volume')}>Stock Volume</button>
            </div>
          </div>
          
          <div>
            <div className = "most_recent_date">
          
          <div className = "stats">
              <div className=  "col-1">
                  <h4>Most Recent Date:</h4>
                  <h4>Open Price:</h4>
                  <h4>High Price:</h4>
                  <h4>Low Price:</h4>
                  <h4>Close Price:</h4>
                  <h4>Volume:</h4>
              </div>
              <div className=  "col-2">
                <h4>{stockArray[stockArray.length - 1]?.date}</h4>
                <h4>${stockArray[stockArray.length - 1]?.open}</h4>
                <h4>${stockArray[stockArray.length - 1]?.high}</h4>
                <h4>${stockArray[stockArray.length - 1]?.low}</h4>
                <h4>${stockArray[stockArray.length - 1]?.close}</h4>
                <h4>{stockArray[stockArray.length - 1]?.volume} shares</h4>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
      </div>

    </>
  );
};

export default Home;