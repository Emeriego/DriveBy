import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios';

function CarDetail() {
  const { carId } = useParams(); // Get carId from URL params
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Fetch car data based on carId
    axios.get(`/api/cars/${carId}`)
      .then(response => {
        setCar(response.data); // Set car data to state
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
      });
  }, [carId]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{car.name}</h2>
      <p>Model: {car.model}</p>
      {/* Display other car details */}
    </div>
  );
}

export default CarDetail;
