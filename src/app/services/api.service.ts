import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { enviroment } from '../enviroments';
import { catchError, Observable, shareReplay, tap, throwError } from 'rxjs';

interface Itask{
  id: string,
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public name = signal('Luan Luciano')
  #url = signal(enviroment.apiTask)

  constructor(private http: HttpClient) { }

  #setListTask = signal<Itask[] | null>(null)
  get getListTask(){
    return this.#setListTask.asReadonly();
  }
  #setListTaskError = signal<Itask[] | null>(null)
  get getListTaskError(){
    return this.#setListTaskError.asReadonly();
  }
  public httpListTask$(): Observable<Array<Itask>>{
    const params = new HttpParams().set('page', 1);

    this.#setListTaskError.set(null);
    this.#setListTaskError.set(null);
    return this.http.get<Itask[]>(this.#url(), {  params }).pipe(
      tap((res) => {
        this.#setListTask.set(res),
        catchError((e : HttpErrorResponse) => {
          this.#setListTaskError.set(e.error.message)
          return throwError(() => e);
        })
      })
    )
  }

  #setTaskId = signal<Itask | null>(null)
  get getTaskId(){
    return this.#setTaskId.asReadonly();
  }
  #setTaskIdError = signal<Itask | null>(null)
  get getTaskIdError(){
    return this.#setTaskIdError.asReadonly();
  }
  public httpTaskId$(id: string): Observable<Itask>{
    this.#setTaskId.set(null);
    this.#setTaskIdError.set(null);
    return this.http.get<Itask>(`${this.#url()}/${id}`).pipe(
      tap((res) => this.#setTaskId.set(res)),
      catchError((e : HttpErrorResponse) => {
        this.#setTaskIdError.set(e.error.message);
        return throwError(() => e);
      })
    )
  }

  #setTaskCreateError = signal<Itask | null>(null)
  get getTaskCreateError(){
    return this.#setTaskCreateError.asReadonly();
  }
  public httpTaskCreate$(title: string): Observable<Itask>{
    this.#setTaskCreateError.set(null);
    return this.http.post<Itask>(this.#url(), { title }).pipe(
      catchError((e : HttpErrorResponse) => {
        this.#setTaskCreateError.set(e.error.message)
        return throwError(() => e);
      })
    )
  }

  #setTaskUpdateError = signal<Itask | null>(null)
  get getTaskUpdateError(){
    return this.#setTaskUpdateError.asReadonly();
  }
  public httpTaskUpdate$(id: string, title: string): Observable<Itask>{
    this.#setTaskUpdateError.set(null);
    return this.http.patch<Itask>(`${this.#url()}/${id}`, { title }).pipe(
    catchError((e : HttpErrorResponse) => {
      this.#setTaskUpdateError.set(e.error.message)
      return throwError(() => e);
    }))
  }

  #setTaskDeleteError = signal<Itask | null>(null)
  get getTaskDeleteError(){
    return this.#setTaskDeleteError.asReadonly();
  }
  public httpTaskDelete$(id: string): Observable<Itask>{
    this.#setTaskDeleteError.set(null);
    return this.http.delete<Itask>(`${this.#url()}/${id}`).pipe(
    catchError((e : HttpErrorResponse) => {
      this.#setTaskDeleteError.set(e.error.message)
      return throwError(() => e);
    }))
  }
}
