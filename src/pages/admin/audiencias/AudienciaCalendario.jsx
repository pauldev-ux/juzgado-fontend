// src/pages/admin/audiencias/VistaAudienciaCalendario.jsx
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

moment.locale('es');
const localizer = momentLocalizer(moment);

function VistaAudienciaCalendario() {
  const [eventos, setEventos] = useState([]);
  const [fechaActual, setFechaActual] = useState(new Date());
  const [vista, setVista] = useState(Views.MONTH);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarAudiencias = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/audiencias/');
        const audiencias = res.data;

        const eventosTransformados = audiencias.map((aud) => ({
          id: aud.id_audiencia,
          title: `Audiencia ${aud.id_expediente}`,
          start: new Date(aud.fecha),
          end: moment(aud.fecha).add(aud.duracion || 1, 'hours').toDate(),
          allDay: false,
          estado: aud.estado || 'Pendiente',
        }));

        setEventos(eventosTransformados);
      } catch (error) {
        console.error('Error al cargar audiencias:', error);
      }
    };

    cargarAudiencias();
  }, []);

  const handleNavigate = (action) => {
    let nuevaFecha = moment(fechaActual);

    switch (action) {
      case 'TODAY':
        nuevaFecha = moment();
        break;
      case 'PREV':
        nuevaFecha = nuevaFecha.subtract(1, 'month');
        break;
      case 'NEXT':
        nuevaFecha = nuevaFecha.add(1, 'month');
        break;
      default:
        break;
    }

    setFechaActual(nuevaFecha.toDate());
  };

  const CustomToolbar = () => (
    <div className="rbc-toolbar flex flex-wrap items-center justify-between mb-4">
      <div className="flex space-x-2 mb-2 sm:mb-0">
        <button
          onClick={() => handleNavigate('TODAY')}
          className="bg-gray-300 dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 px-3 py-1 rounded"
        >
          Hoy
        </button>
        <button
          onClick={() => handleNavigate('PREV')}
          className="bg-gray-300 dark:bg-gray-700 p-2 rounded"
        >
          <ChevronLeftIcon className="h-4 w-4 text-gray-800 dark:text-gray-200" />
        </button>
        <button
          onClick={() => handleNavigate('NEXT')}
          className="bg-gray-300 dark:bg-gray-700 p-2 rounded"
        >
          <ChevronRightIcon className="h-4 w-4 text-gray-800 dark:text-gray-200" />
        </button>
      </div>
      <span className="font-semibold text-lg dark:text-white text-center w-full sm:w-auto mb-2 sm:mb-0">
        {moment(fechaActual).format('MMMM YYYY')}
      </span>
      <div className="space-x-2">
        {['month', 'week', 'day', 'agenda'].map((v) => (
          <button
            key={v}
            onClick={() => setVista(v)}
            className={`px-3 py-1 rounded text-sm ${
              vista === v
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            {{
              month: 'Mes',
              week: 'Semana',
              day: 'Día',
              agenda: 'Agenda',
            }[v]}
          </button>
        ))}
      </div>
    </div>
  );

  const eventStyleGetter = (event) => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let backgroundColor = isDarkMode ? '#2563eb' : '#3b82f6';
    if (event.estado === 'Pendiente') {
      backgroundColor = isDarkMode ? '#b45309' : '#facc15';
    } else if (event.estado === 'Cancelada') {
      backgroundColor = isDarkMode ? '#991b1b' : '#f87171';
    } else if (event.estado === 'Realizada') {
      backgroundColor = isDarkMode ? '#065f46' : '#34d399';
    }

    const color = isDarkMode ? 'white' : '#111827';

    return {
      style: {
        backgroundColor,
        color,
        borderRadius: '6px',
        border: 'none',
        padding: '2px 4px',
      },
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl max-w-6xl mx-auto">
        <div className="mb-4 text-left w-full">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Regresar al Dashboard
          </button>
        </div>

        <div className="flex flex-col items-center mb-6 text-center">
          <CalendarDaysIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-2" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Calendario de Audiencias</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Audiencias programadas por Fecha</p>
        </div>

        <div className="overflow-x-auto">
          <div className="custom-calendar-wrapper dark:text-white">
            <Calendar
              localizer={localizer}
              events={eventos}
              date={fechaActual}
              view={vista}
              onView={setVista}
              onNavigate={setFechaActual}
              components={{ toolbar: CustomToolbar }}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              messages={{
                today: 'Hoy',
                previous: 'Anterior',
                next: 'Siguiente',
                month: 'Mes',
                week: 'Semana',
                day: 'Día',
                agenda: 'Agenda',
                date: 'Fecha',
                time: 'Hora',
                event: 'Evento',
                noEventsInRange: 'No hay audiencias en este rango.',
              }}
              eventPropGetter={eventStyleGetter}
            />
          </div>
        </div>
      </div>

      <style>
        {`
          .custom-calendar-wrapper .rbc-toolbar button {
            background-color: #e5e7eb;
            color: #111827;
            padding: 6px 12px;
            border-radius: 0.375rem;
            margin: 0 4px;
            border: none;
          }

          .dark .custom-calendar-wrapper .rbc-toolbar button {
            background-color: #374151;
            color: #f3f4f6;
          }

          .custom-calendar-wrapper .rbc-toolbar button.rbc-active {
            background-color: #2563eb;
            color: white;
          }

          .custom-calendar-wrapper .rbc-month-view,
          .custom-calendar-wrapper .rbc-time-view,
          .custom-calendar-wrapper .rbc-agenda-view {
            background-color: transparent;
            color: inherit;
          }

          .custom-calendar-wrapper .rbc-date-cell,
          .custom-calendar-wrapper .rbc-day-bg {
            background-color: transparent;
          }

          .dark .custom-calendar-wrapper .rbc-month-view,
          .dark .custom-calendar-wrapper .rbc-time-view,
          .dark .custom-calendar-wrapper .rbc-agenda-view,
          .dark .custom-calendar-wrapper .rbc-time-header,
          .dark .custom-calendar-wrapper .rbc-day-bg,
          .dark .custom-calendar-wrapper .rbc-date-cell {
            color: #f3f4f6;
          }

          .custom-calendar-wrapper .rbc-toolbar-label {
            font-weight: bold;
            font-size: 1.125rem;
            color: inherit;
          }

          .custom-calendar-wrapper .rbc-off-range {
            background-color: #f3f4f6;
            color: #9ca3af;
          }

          .dark .custom-calendar-wrapper .rbc-off-range {
            background-color: #1f2937;
            color: #6b7280;
          }
        `}
      </style>
    </div>
  );
}

export default VistaAudienciaCalendario;
