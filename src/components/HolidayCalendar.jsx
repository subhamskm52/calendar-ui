import { useMemo } from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const HolidayCalendar = ({ holidays, year }) => {
  const holidaysMap = useMemo(() => {
    const map = new Map();
    holidays.forEach(holiday => {
      map.set(holiday.date, holiday.name);
    });
    return map;
  }, [holidays]);

  const calendarData = useMemo(() => {
    const result = [];
    
    for (let month = 0; month < 12; month++) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      
      const monthData = {
        name: months[month],
        weeks: []
      };
      
      let currentWeek = [];
      for (let i = 0; i < firstDay.getDay(); i++) {
        currentWeek.push(null);
      }
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        // Format date as YYYY-MM-DD without timezone issues
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isHoliday = holidaysMap.has(dateString);
        const holidayName = isHoliday ? holidaysMap.get(dateString) : '';
        
        currentWeek.push({
          date: dateString,
          day,
          isHoliday,
          holidayName
        });
        
        if (currentWeek.length === 7) {
          monthData.weeks.push(currentWeek);
          currentWeek = [];
        }
      }
      
      if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
          currentWeek.push(null);
        }
        monthData.weeks.push(currentWeek);
      }
      
      result.push(monthData);
    }
    
    return result;
  }, [year, holidaysMap]);

  // Style objects
  const styles = {
    container: {
      padding: '16px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '32px',
      color: '#333'
    },
    monthContainer: {
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '32px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    monthHeader: {
      backgroundColor: '#f8fafc',
      padding: '12px',
      borderBottom: '1px solid #e2e8f0'
    },
    monthTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#334155',
      margin: '0'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      padding: '8px',
      borderRight: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '14px',
      fontWeight: '500',
      color: '#64748b',
      textAlign: 'center'
    },
    td: {
      height: '80px',
      width: '80px',
      padding: '4px',
      borderRight: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0',
      verticalAlign: 'top'
    },
    holidayTd: {
      backgroundColor: '#f0fdf4'
    },
    dayNumber: {
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '4px'
    },
    holidayName: {
      fontSize: '12px',
      color: '#166534',
      wordBreak: 'break-word',
      lineHeight: '1.2'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{year} Holiday Calendar</h2>
      
      <div>
        {calendarData.map((month, monthIndex) => (
          <div key={monthIndex} style={styles.monthContainer}>
            <div style={styles.monthHeader}>
              <h3 style={styles.monthTitle}>{month.name}</h3>
            </div>
            
            <table style={styles.table}>
              <thead>
                <tr>
                  {daysOfWeek.map(day => (
                    <th 
                      key={day} 
                      style={{
                        ...styles.th,
                        ...(day === 'Sat' ? { borderRight: 'none' } : {})
                      }}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {month.weeks.map((week, weekIndex) => (
                  <tr key={weekIndex}>
                    {week.map((dayData, dayIndex) => (
                      <td 
                        key={dayIndex}
                        style={{
                          ...styles.td,
                          ...(dayData?.isHoliday ? styles.holidayTd : {}),
                          ...(dayIndex === 6 ? { borderRight: 'none' } : {})
                        }}
                      >
                        {dayData ? (
                          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <span style={styles.dayNumber}>{dayData.day}</span>
                            {dayData.isHoliday && (
                              <span style={styles.holidayName}>{dayData.holidayName}</span>
                            )}
                          </div>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayCalendar;