import { useState } from 'react';
import './App.css';
import humidity from "./assests/humidity.svg"
import precipitous from "./assests/precipitous.svg"
import wind from "./assests/wind.svg"


function App() {
  const [place, setPlace] = useState(" ");
  const [placeData, setPlaceData] = useState({ "text": "  " });
  console.log(placeData)

  const updatePlace = () => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=e0c416034cbf48dc852153122210908&q=${place}`
    )
      .then((res) => res.json())
      .then((data) => {

        setPlaceData(data);
        // console.log(placeData);
      });

  };
  // console.log(placeData);


  return (
    <div className="App">
      <div className="App_Content">
        <div className="App_Content_heading">Wheather Bucket </div>
        <div class="container ">
          <div class="row  ">
            <div class="col form">
              <input className="form_input"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    { { updatePlace(place) } }
                  }
                }}
                value={place} type="text" placeholder="City Name"
                onChange={(e) => {
                  setPlace(e.target.value);
                }} />
              <button className="btn btn-primary " onClick={updatePlace}> Search </button>
            </div>
          </div>
        </div>

      </div>
      <div className="card offset-md-4">
        {placeData.text ? (<h2>Enter the City name to Get the Wheather detail.</h2>) : (placeData.location ? (
          <div className="Wheather">
            <img src={placeData.current.condition.icon} />
            <div className="Whether_text">{placeData.current.condition.text}</div>
            <div className="Wheather_temp">{placeData.current.temp_c}°</div>
            <div className="Wheather_locationanme">{placeData.location.name}</div>
            <div className="container">
              <div className="row">
                <div className="col-3 whet">
                  <div className="col_data">
                    <div className="col_data_header">
                      Wind</div>
                    <div className="col_data_container">
                      <div className="col_data_Container_img">
                        <img src={wind} />
                      </div>
                      <div className="col_data_container_n">
                        {placeData.current.wind_kph}<span>KM</span>
                      </div>



                    </div>
                  </div>
                </div>
                <div className="col-3 whet">
                  <div className="col_data">
                    <div className="col_data_header">
                      Humidity</div>
                    <div className="col_data_container">
                      <div className="col_data_Container_img">
                        <img src={humidity} />
                      </div>
                      <div className="col_data_container_n">
                        {placeData.current.humidity}%
                      </div>


                    </div>
                  </div>
                </div>
                <div className="col-3 whet"> <div className="col_data">
                  <div className="col_data_header">
                    Precipitous</div>
                  <div className="col_data_container">
                    <div className="col_data_Container_img">
                      <img src={precipitous} />
                    </div>
                    <div className="col_data_container_n">
                      {placeData.current.precip_in}
                    </div>


                  </div>
                </div></div>
              </div>
            </div>

          </div>
        ) : (
          <h2> Place Not Found</h2>))}
      </div>
    </div>
  );
}

export default App;
