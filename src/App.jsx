import { useEffect } from 'react';
import useFetch from './hooks/useFetch';
import HolidayCalendar from './components/HolidayCalendar';

export default function App() {
  const { data, loading, error } = useFetch('http://localhost:8080/api/holidays?country=AR&year=2025');
  useEffect(() => { console.log(data) }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app">
      <h1>2025 Holidays (AR)</h1>
      <HolidayCalendar holidays={data} year={2025} />
    </div>
  );
}