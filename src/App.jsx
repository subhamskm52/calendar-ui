import { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import HolidayCalendar from './components/HolidayCalendar';

export default function App() {
  const [country, setCountry] = useState('AR');
  const [year, setYear] = useState('2025');
  const [toggle, setToggle] = useState(false)

  const { data, loading, error } = useFetch(
    `http://localhost:8080/api/holidays?country=${country}&year=${year}`
  );
  const {data: countryData} = useFetch("http://localhost:8080/api/holidays/available-countries")
  useEffect(() => {
    console.log(data);
  }, [data, countryData]);

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
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '160px'
            }}
          >
            <option value="">Select</option>
            {countryData?.map((countryOption) => (
              <option key={countryOption.countryCode} value={countryOption.countryCode}>
                {countryOption.name}
              </option>
            ))}
          </select>
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
         <button 
            onClick={() => setToggle(!toggle)} 
            class="btn btn-primary mb-5">
          Toggle State
        </button>
      </div>

      {loading && <div style={{ textAlign: 'center', fontSize: '18px' }}>Loading...</div>}
      {data && <HolidayCalendar holidays={data} year={parseInt(year)} onlyHoliday={toggle}/>}
    </div>
  );
}