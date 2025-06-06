import { useMemo } from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const HolidayCalendar = ({ holidays, year }) => {
  const holidaysMap = useMemo(() => {
    const map = new Map();
    holidays.forEach(holiday => {
      map.set(holiday.date, holiday.name);
    });
    return map;
  }, [holidays]);

  const calendarData = useMemo(() => {
    return MONTHS.map((monthName, monthIndex) => {
      const firstDay = new Date(year, monthIndex, 1);
      const lastDay = new Date(year, monthIndex + 1, 0);
      const daysInMonth = lastDay.getDate();
      
      const month = {
        name: monthName,
        weeks: []
      };
      
      let currentWeek = Array(firstDay.getDay()).fill(null);
      let holidayCount = 0; // Track holidays in current week

      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isHoliday = holidaysMap.has(dateStr);
        
        if (isHoliday) holidayCount++;
        
        currentWeek.push({
          date: dateStr,
          day,
          isHoliday,
          holidayName: isHoliday ? holidaysMap.get(dateStr) : '',
          weekHolidayCount: 0 // Will be updated later
        });

        if (currentWeek.length === 7) {
          // Update all days in week with the holiday count
          currentWeek = currentWeek.map(day => ({
            ...day,
            weekHolidayCount: holidayCount
          }));
          
          month.weeks.push(currentWeek);
          currentWeek = [];
          holidayCount = 0; // Reset counter for new week
        }
      }

      // Handle remaining days in partial week
      if (currentWeek.length > 0) {
        currentWeek = [...currentWeek, ...Array(7 - currentWeek.length).fill(null)]
          .map(day => day ? { ...day, weekHolidayCount: holidayCount } : null);
        month.weeks.push(currentWeek);
      }

      return month;
    });
  }, [year, holidaysMap]);

  const styles = {
    container: { padding: 16, maxWidth: 1200, margin: '0 auto', fontFamily: 'Arial' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 },
    month: { border: '1px solid #eee', borderRadius: 8, marginBottom: 32, overflow: 'hidden' },
    monthHeader: { backgroundColor: '#f5f5f5', padding: 12, borderBottom: '1px solid #eee' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: 8, border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: '#f9f9f9' },
    td: { 
      height: 80, 
      width: 80, 
      padding: 4, 
      border: '1px solid #ddd', 
      verticalAlign: 'top',
    },
    // Week highlighting styles
    noHolidayWeek: { backgroundColor: '#fff' },
    singleHolidayWeek: { backgroundColor: '#e8f5e9' }, // Light green
    multiHolidayWeek: { backgroundColor: '#c8e6c9' },  // Darker green
    dayNumber: { fontWeight: 'bold', fontSize: 14 },
    holidayName: { color: '#2e7d32', fontSize: 12, marginTop: 4 }
  };

  const getWeekStyle = (week) => {
    // Find first non-null day to get holiday count
    const firstDayWithData = week.find(day => day !== null);
    const holidayCount = firstDayWithData?.weekHolidayCount || 0;
    
    if (holidayCount >= 2) return styles.multiHolidayWeek;
    if (holidayCount === 1) return styles.singleHolidayWeek;
    return styles.noHolidayWeek;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{year} Holiday Calendar</h2>
      
      {calendarData.map((month, i) => (
        <div key={i} style={styles.month}>
          <div style={styles.monthHeader}>
            <h3>{month.name}</h3>
          </div>
          
          <table style={styles.table}>
            <thead>
              <tr>
                {DAYS_OF_WEEK.map(day => (
                  <th key={day} style={styles.th}>{day}</th>
                ))}
              </tr>
            </thead>
            
            <tbody>
              {month.weeks.map((week, weekIndex) => {
                const weekStyle = getWeekStyle(week);
                return (
                  <tr key={weekIndex}>
                    {week.map((day, dayIndex) => (
                      <td 
                        key={dayIndex} 
                        style={{
                          ...styles.td,
                          ...weekStyle,
                          ...(day?.isHoliday && { 
                            fontWeight: 'bold',
                            border: '2px solid #2e7d32' 
                          })
                        }}
                      >
                        {day && (
                          <>
                            <div style={styles.dayNumber}>{day.day}</div>
                            {day.isHoliday && (
                              <div style={styles.holidayName}>{day.holidayName}</div>
                            )}
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default HolidayCalendar;