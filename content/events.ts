import type { OneOffEvent, RecurringEvent } from "@/lib/calendar-data";
import data from "./events.json";

export const recurringEvents: RecurringEvent[] = data.events as RecurringEvent[];

// Eventos com data marcada. Para incluir um novo, acrescente em "oneOff" no
// events.json (data AAAA-MM-DD). "image" é a arte exibida na Programação;
// "replacesService": true esconde o culto normal no mesmo dia e horário.
export const oneOffEventsData: OneOffEvent[] =
  ((data as { oneOff?: OneOffEvent[] }).oneOff ?? []);
