import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map/Map";
import Modal from "./components/modal/Modal";
import { useLoadScript } from "@react-google-maps/api";

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMap, setCurrentMap] = useState(null);

  const API_KEY = "AIzaSyANUOqZ5aPTdMFk4hTQi4B16RuPHwGFcrg";

  const { isLoaded } = useLoadScript({ googleMapsApiKey: API_KEY });

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        const data = JSON.parse(res.data);
        setJsonData(data.rss.channel[0].item);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openModal = (city) => {
    setOpen(true);
    setCurrentMap(city);
  };

  return (
    <div className="jobs">
      <Modal open={open} setOpen={setOpen}>
        {isLoaded && <Map address={currentMap}></Map>}
        {!isLoaded && <div>Loading....</div>}
      </Modal>
      <h1>List of Jobs</h1>
      {isLoading &&
        jsonData.map((item, ind) => {
          return (
            <div key={ind} className="jobs_title">
              <h1>{item.title[0]}</h1>
              <h2>
                {item.city},{item.country}
              </h2>
              <button
                onClick={() => {
                  openModal(item.city);
                }}
              >
                Google Map location
              </button>
            </div>
          );
        })}

      {!isLoading && <div>Loading...</div>}
    </div>
  );
}

export default App;
