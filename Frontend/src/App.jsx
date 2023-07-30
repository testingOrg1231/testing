import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerComponent.css"; // Import the custom CSS file
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const apiUrl = "http://localhost:3000";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const disabledDates = data.map((dateString) => new Date(dateString));

  return (
    <DatePicker
      selected={null}
      onChange={(date) => console.log(date)}
      excludeDates={disabledDates}
      placeholderText="Select a date"
    />
  );
};

export default App;
