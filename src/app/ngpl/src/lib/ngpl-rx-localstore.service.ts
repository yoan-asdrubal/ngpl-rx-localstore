import {Injectable} from '@angular/core';
import {EMPTY, Observable, Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

export interface NgplValueChangeEvent {
  key: string;
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class NgplRxLocalstoreService {
  private value: Subject<NgplValueChangeEvent> = new Subject();

  private value$: Observable<NgplValueChangeEvent> = this.value.asObservable();

  constructor() {
  }

  valueChanges(key): Observable<any> {
    if (!key) {
      return EMPTY;
    }
    return this.value$
      .pipe(
        filter((event: NgplValueChangeEvent) => !event || event.key === key),
        map((event: NgplValueChangeEvent) => !event ? null : event.value)
      );
  }

  getItem(key: string, defaultValue = null): any {
    const p = localStorage.getItem(key);
    return !!p ? JSON.parse(p) : defaultValue;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    this.value.next({key, value});
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    this.value.next({key, value: null});
  }

  key(index: number): any {
    return localStorage.key(index);
  }

  length(): any {
    return localStorage.length;
  }

  clear(): void {
    const length = this.length();
    for (let i = 0; i < length; i++) {
      const key = this.key(0);
      this.value.next({key, value: null});
      this.removeItem(key);
    }
  }
}
