import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { DnDCalendar } from 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

const localizer = momentLocalizer(moment)
const DraggableCalendar = withDragAndDrop(Calendar)

export default function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Meeting',
      start: moment("2025-03-15T10:00:00").toDate(),
      end: moment("2025-03-15T11:00:00").toDate(),
    },
    {
      id: 2,
      title: 'Lunch Break',
      start: moment("2025-03-16T13:00:00").toDate(),
      end: moment("2025-03-16T14:00:00").toDate(),
    },
  ])

  const [currentDate, setCurrentDate] = useState(new Date())

  // Handle event dragging
  const onEventDrop = ({ event, start, end }) => {
    console.log(event,start,end,"information");
    
    const updatedEvents = events.map((e) =>
      e.id === event.id ? { ...e, start, end } : e
    )
    setEvents(updatedEvents)
  }

  // Handle adding an event when clicking a date
  const handleSelectSlot = (slotInfo) => {
    const title = prompt('Enter event title:')
    if (title) {
      const newEvent = {
        id: events.length + 1, // Unique ID for each event
        title,
        start: slotInfo.start,
        end: moment(slotInfo.start).add(1, 'hour').toDate(), // Default 1-hour duration
      }
      setEvents([...events, newEvent])
    }
  }
  useEffect(()=>{
    console.log(events,"events");
  },[events])
  
  return (
    <div style={{ padding: 20 }}>
      <h2>My Event Calendar</h2>
      <DraggableCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        selectable
        resizable
        onEventDrop={onEventDrop} // Enables drag-and-drop
        onSelectSlot={handleSelectSlot} // Enables event creation
        onSelectEvent={(event) => alert(`Event: ${event.title}\nStart: ${moment(event.start).format('LLLL')}`)}
        style={{ height: 500, marginTop: 20 }}
      />
    </div>
  )
}