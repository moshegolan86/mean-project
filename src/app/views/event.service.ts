import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Event } from "./event.model";

@Injectable({ providedIn: "root" })
export class EventService {
  private events: Event[] = [];
  private eventsUpdated = new Subject<Event[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getEvents() {
    this.http
      .get<{ message: string; events: any }>("http://localhost:3000/api/events")
      .pipe(
        map(eventData => {
          return eventData.events.map(event => {
            return {
              title: event.title,
              place: event.place,
              id: event._id,
              eventDate: event.eventDate,
              studentPrice: event.studentPrice,
              guestPrice: event.guestPrice,
              description: event.description
            };
          });
        })
      )
      .subscribe(transformedEvents => {
        this.events = transformedEvents;
        this.eventsUpdated.next([...this.events]);
      });
  }

  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

  getEvent(id: string) {
    return this.http.get<{ _id: string; title: string; place: string, eventDate: Date, studentPrice: number, guestPrice: number, description: string }>(
      "http://localhost:3000/api/events/" + id
    );
  }

  addEvent(title: string, place: string, eventDate: Date, studentPrice: number, guestPrice: number, description: string) {
    const event: Event = { id: null, title: title, place: place, eventDate: eventDate, studentPrice: studentPrice, guestPrice: guestPrice, description: description };
    this.http
      .post<{ message: string; eventId: string }>(
        "http://localhost:3000/api/events",
        event
      )
      .subscribe(responseData => {
        const id = responseData.eventId;
        event.id = id;
        this.events.push(event);
        this.eventsUpdated.next([...this.events]);
        this.router.navigate(["/"]);
      });
  }

  updateEvent(id: string, title: string, place: string, eventDate: Date, studentPrice: number, guestPrice: number, description: string) {
    const event: Event = {  id: id, title: title, place: place, eventDate: eventDate, studentPrice: studentPrice, guestPrice: guestPrice, description: description };
    this.http
      .put("http://localhost:3000/api/events/" + id, event)
      .subscribe(response => {
        const updatedEvents = [...this.events];
        const oldEventIndex = updatedEvents.findIndex(p => p.id === event.id);
        updatedEvents[oldEventIndex] = event;
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
        this.router.navigate(["/"]);
      });
  }

  deleteEvent(eventId: string) {
    this.http
      .delete("http://localhost:3000/api/events/" + eventId)
      .subscribe(() => {
        const updatedEvents = this.events.filter(event => event.id !== eventId);
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
      });
  }
}
