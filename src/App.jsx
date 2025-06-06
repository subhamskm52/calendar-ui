import { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import HolidayCalendar from './components/HolidayCalendar';

export default function App() {
  const [country, setCountry] = useState('AR');
  const [year, setYear] = useState('2025');

  const { data, loading, error } = useFetch(
    `http://localhost:8080/api/holidays?country=${country}&year=${year}`
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Holiday Calendar</h1>
      
      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Country Code:
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100px'
            }}
            placeholder="e.g. AR"
            maxLength="2"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Year:
          </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100px'
            }}
            placeholder="e.g. 2025"
            min="2000"
            max="2100"
          />
        </div>
      </div>

      {loading && <div style={{ textAlign: 'center', fontSize: '18px' }}>Loading...</div>}
      {data && <HolidayCalendar holidays={data} year={parseInt(year)} />}
    </div>
  );
}