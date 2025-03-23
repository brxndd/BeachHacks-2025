"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

/** Represents a medicine (or event) entry in the calendar. */
interface CalendarEvent {
  id: number;
  title: string;
  time: string; // e.g. "08:00", "21:30"
  date: string; // "YYYY-MM-DD"
}

export default function CalendarPage() {

  // STATE
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  
  // Current visible month/year
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth()); // 0=Jan, 11=Dec

  // Add/Edit popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState<"add" | "edit">("add");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [eventIdBeingEdited, setEventIdBeingEdited] = useState<number | null>(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventTime, setNewEventTime] = useState("");

  // Days of the week (Sunday start)
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // For a user-friendly month name
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];


  // Build calendar (7x6)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const firstDayWeekday = firstDayOfMonth.getDay();

  const calendarStart = new Date(firstDayOfMonth);
  calendarStart.setDate(firstDayOfMonth.getDate() - firstDayWeekday);

  const totalCells = 42; 
  const calendarDays: Date[] = [];
  for (let i = 0; i < totalCells; i++) {
    const copy = new Date(calendarStart);
    copy.setDate(calendarStart.getDate() + i);
    calendarDays.push(copy);
  }

  // Helper: Format a Date as "YYYY-MM-DD"
  function formatAsDateKey(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }


  // event helper functs
  function getEventsForDate(dateString: string) {
    return events.filter((ev) => ev.date === dateString);
  }

  function handleAddEvent(dateString: string) {
    setPopupMode("add");
    setSelectedDate(dateString);
    setNewEventTitle("");
    setNewEventTime("");
    setIsPopupOpen(true);
  }

  function handleEditEvent(eventId: number) {
    const ev = events.find((e) => e.id === eventId);
    if (!ev) return;
    setPopupMode("edit");
    setEventIdBeingEdited(eventId);
    setSelectedDate(ev.date);
    setNewEventTitle(ev.title);
    setNewEventTime(ev.time);
    setIsPopupOpen(true);
  }

  function handleDeleteEvent(eventId: number) {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  }

  function handleSaveEvent() {
    if (!selectedDate || !newEventTitle.trim()) {
      setIsPopupOpen(false);
      return;
    }

    if (popupMode === "add") {
      const newEvent: CalendarEvent = {
        id: Date.now(),
        title: newEventTitle.trim(),
        time: newEventTime, // Save the time string
        date: selectedDate,
      };
      setEvents((prev) => [...prev, newEvent]);
    } else if (popupMode === "edit" && eventIdBeingEdited) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === eventIdBeingEdited
            ? { ...ev, title: newEventTitle.trim(), time: newEventTime, date: selectedDate }
            : ev
        )
      );
    }
    setIsPopupOpen(false);
  }


  // MONTH/YEAR NAVIGATION
  function handlePrevMonth() {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  }

  function handleNextMonth() {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  }

  function handlePrevYear() {
    setCurrentYear((prev) => prev - 1);
  }

  function handleNextYear() {
    setCurrentYear((prev) => prev + 1);
  }

  const displayMonthName = monthNames[currentMonth];

  
  // RENDER
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <main className="flex-grow container mx-auto px-4 py-8 text-[#8a2929] flex flex-col">
        {/* MONTH/YEAR NAV */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button className="hover:scale-105 px-2 py-1 border rounded cursor-pointer" onClick={handlePrevYear}>
            « Year
          </button>
          <button className="hover:scale-105 px-2 py-1 border rounded cursor-pointer" onClick={handlePrevMonth}>
            ‹ Month
          </button>
          <div className="text-xl font-bold">
            {displayMonthName} {currentYear}
          </div>
          <button className="hover:scale-105 px-2 py-1 border rounded cursor-pointer" onClick={handleNextMonth}>
            Month ›
          </button>
          <button className="hover:scale-105 px-2 py-1 border rounded cursor-pointer" onClick={handleNextYear}>
            Year »
          </button>
        </div>

        {/* DAYS OF WEEK HEADER */}
        <div className="grid grid-cols-7 gap-2 mb-2 font-semibold text-center">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* CALENDAR GRID */}
        <div className="flex-1 grid grid-cols-7 grid-rows-6 gap-2">
          {calendarDays.map((dateObj) => {
            const dateKey = formatAsDateKey(dateObj);
            const dayNumber = dateObj.getDate();
            const dayMonth = dateObj.getMonth();
            const isCurrentMonth = (dayMonth === currentMonth && dateObj.getFullYear() === currentYear);
            const dayEvents = getEventsForDate(dateKey);

            return (
              <div
                key={dateKey}
                className={
                  "relative border rounded-md p-2 group " +
                  (isCurrentMonth
                    ? "border-gray-300"
                    : "border-gray-200 bg-gray-50 text-gray-400")
                }
              >
                <div className="font-bold">{dayNumber}</div>

                {/* Existing Events */}
                {dayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex flex-col text-sm mt-1 bg-[#8a2929] text-white rounded px-1"
                  >
                    <span>{ev.title}</span>
                    {ev.time && <span className="text-xs">{ev.time}</span>}
                    <div className="flex justify-end space-x-1">
                      <button
                        className="text-white underline text-xs"
                        onClick={() => handleEditEvent(ev.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-white underline text-xs"
                        onClick={() => handleDeleteEvent(ev.id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}

                {/* Plus button for current month */}
                {isCurrentMonth && (
                  <button
                    className="absolute top-2 right-2 hidden group-hover:block 
                               text-[#8a2929] bg-white border border-[#8a2929] 
                               rounded-full w-5 h-5 flex items-center justify-center text-sm"
                    onClick={() => handleAddEvent(dateKey)}
                  >
                    +
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />

      {/* POPUP: ADD/EDIT */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-2 text-[#8a2929]">
              {popupMode === "add" ? "Add Medicine Time" : "Edit Medicine"}
            </h2>
            <p className="text-gray-700 mb-4">Date: {selectedDate}</p>
            {/* Input for medicine description */}
            <input
              className="border w-full p-2 mb-4"
              placeholder="e.g. Advil, take Motrin before bed..."
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            {/* Input for time */}
            <input
              type="time"
              className="border w-full p-2 mb-4"
              value={newEventTime}
              onChange={(e) => setNewEventTime(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#8a2929] text-white rounded"
                onClick={handleSaveEvent}
              >
                {popupMode === "add" ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
