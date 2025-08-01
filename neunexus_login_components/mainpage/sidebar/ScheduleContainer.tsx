import { StatusCard } from "@/components/mainpage/common/StatusCard";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/Button";
import { ScheduleCalendar, type CalendarEvent } from "../calendar/ScheduleCalendar";
import { MiniCalendar } from "../calendar/MiniCalendar";
import { ScrollTable } from "../common/ScrollTable";
import { AddSchedule } from "../calendar/AddSchedule";

export const ScheduleContainer = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());


  const handleOpenScheduleModal = () => {
    setIsEventModalOpen(false);
    setIsScheduleModalOpen(true);
  };

  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };

  const handleOpenEventModal = (eventOrSlot?: CalendarEvent | { start: Date; end: Date }) => {
    setIsScheduleModalOpen(false);
    
    if (eventOrSlot) {
      if ('id' in eventOrSlot) {
        setSelectedEvent(eventOrSlot);
      } else {
        const newSlot: CalendarEvent = {
          id: '',
          title: '',
          start: eventOrSlot.start,
          end: eventOrSlot.end,
          desc: '',
          color: '#3b82f6'
        };
        setSelectedEvent(newSlot);
      }
    } else {
      const newSlot: CalendarEvent = {
        id: '',
        title: '',
        start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 9, 0),
        end: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 10, 0),
        desc: '',
        color: '#3b82f6'
      };
      setSelectedEvent(newSlot);
    }
    
    setIsEventModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
    setIsScheduleModalOpen(true);
  };

  const handleSaveEvent = (eventData: CalendarEvent) => {
    const existingIndex = events.findIndex(e => e.id === eventData.id);
    
    if (existingIndex >= 0) {
      const updatedEvents = [...events];
      updatedEvents[existingIndex] = eventData;
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        ...eventData,
        id: Date.now().toString()
      };
      setEvents(prev => [...prev, newEvent]);
    }
    
    handleCloseEventModal();
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    handleCloseEventModal();
  };

  const selectedDateEvents = events.filter(event => {
    const eventDate = moment(event.start);
    const selected = moment(selectedDate);
    return eventDate.format('YYYY-MM-DD') === selected.format('YYYY-MM-DD');
  })

  const todayEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.start);
    return eventDate.toDateString() === today.toDateString();
  });

  const displayEvents = moment(selectedDate).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
    ? todayEvents
    : selectedDateEvents;

  return (
    <>
      <StatusCard
        title="일정"
        onViewAll={handleOpenScheduleModal}
        viewAllText="일정관리"
      >
        <div>
          <MiniCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            events={events}
          />
          <div className="space-y-3">
            <ScrollTable height="h-36">
              {displayEvents.map((event) => (
                <div key={`${event.id}`} className="flex items-start space-x-3 pb-1">
                  <div 
                    className="w-1 h-7 rounded-full mt-1 flex-shrink-0"
                    style={{ backgroundColor: event.color || '#3b82f6' }}
                  ></div>
                  <div className="flex-1">
                    <div className="text-body-l text-text-base-500">{event.title}</div>
                    <div className="text-body-s text-text-base-300">
                      {moment(event.start).format('HH:mm')}
                    </div>
                  </div>
                </div>
              ))}
              
              {displayEvents.length === 0 && (
                <div className="flex flex-col items-center justify-center text-sm text-text-base-300 py-4">
                  {moment(selectedDate).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') 
                    ? '오늘 일정이 없습니다'
                    : `${moment(selectedDate).format('M월 D일')} 일정이 없습니다`
                  }
                  <Button
                    variant="light"
                    size="sidebar"
                    onClick={() => handleOpenEventModal()}
                    className="mt-2 bg-primary-500 text-text-contrast-500 hover:bg-primary-600"
                  >
                    + 추가하기
                  </Button>
                </div>
              )}
            </ScrollTable>
          </div>
        </div>
      </StatusCard>

      <Modal isOpen={isScheduleModalOpen} onClose={handleCloseScheduleModal} size="5xl">
        <div className="bg-fill-base-100 rounded-2xl">
          <Modal.Header className="border-b border-stroke-base-100 p-4 px-6">
            <Modal.Title>일정 관리</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          
          <Modal.Body className="p-6 pt-2">
            <ScheduleCalendar
              events={events}
              onEventsChange={setEvents}
              onEventClick={handleOpenEventModal}
              onSlotClick={handleOpenEventModal}
            />
          </Modal.Body>
        </div>
      </Modal>
      <AddSchedule
        isOpen={isEventModalOpen}
        onClose={handleCloseEventModal}
        event={selectedEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </>
  );
};