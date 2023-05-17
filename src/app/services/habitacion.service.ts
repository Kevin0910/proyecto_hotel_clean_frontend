import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HabitacionCliente } from '../interfaces/habitacion';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private urlEndPoint: string = 'http//localhost:8080/api-cliente';
  private HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http: HttpClient) { }


}