import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ObjetoServicio } from '../interfaces/servicio';
import { ObjetoServicioARealizar } from '../interfaces/servicioARealizar';
import swal from 'sweetalert2';
import { ObjetoServicioActProd } from '../interfaces/servicioActProd';

@Injectable({
  providedIn: 'root'
})
export class PageServicioService {

  private urlEndPoint: string = 'http://localhost:8080/api-servicio-a-realizar';
  private urlEndPointListaServicio: string = 'http://localhost:8080/api-servicio';
  private urlEndPointListaServActProd: string = 'http://localhost:8080/api-servactprod';



  private HttpHeaders = new HttpHeaders ({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  getListaServicio(): Observable<ObjetoServicio[]>{
    return this.http.get<ObjetoServicio[]>(`${this.urlEndPointListaServicio}/lista-servicios`)
  }

  getServicios(): Observable<ObjetoServicioARealizar[]>{
    return this.http.get<ObjetoServicioARealizar[]>(`${this.urlEndPoint}/lista-servicio-a-realizar`)
  }

  getListaLimpieza(): Observable<ObjetoServicioActProd[]>{
    return this.http.get<ObjetoServicioActProd[]>(`${this.urlEndPointListaServActProd}/lista-limpieza`)
  }

  getListaSanitizacion(): Observable<ObjetoServicioActProd[]>{
    return this.http.get<ObjetoServicioActProd[]>(`${this.urlEndPointListaServActProd}/lista-sanitizacion`)
  }

  getListaDobleServicio(): Observable<ObjetoServicioActProd[]>{
    return this.http.get<ObjetoServicioActProd[]>(`${this.urlEndPointListaServActProd}/lista-servicio-doble`)
  }



  // ! OBTENER POR ID
  // getServicioARealizar(folio): Observable<any>{
  //   return this.http.get<any>(`${this.urlEndPoint}/buscar-servicio-a-realizar-folio/${folio}`).pipe(
  //     catchError(e => {
  //       this.router.navigate(['/page-servicio']);
  //       console.error(e.error.mensaje);
  //       swal('Error al editar', e.error.mensaje, 'error');
  //       return throwError(()=>e)
  //     })
  //   );
  // }

  // getServiciosRealizar(folio):Observable<ObjetoServicioARealizar[]>{
  //   return this.http.get<ObjetoServicioARealizar[]>(`${this.urlEndPoint}/editar-servicio/${folio}`)
  // }

  busquedaServicioCliente(termino: string): Observable<ObjetoServicioARealizar[] | null>{
    return this.http.get<ObjetoServicioARealizar[]>(`${this.urlEndPoint}/servicio-a-realizar-cliente/${termino}`)
          .pipe(
            catchError(e => {
              console.log(e)
              return throwError(() => e)
            })
          );
  }

// ! CREAR
  create(objetoServicioARealizar: ObjetoServicioARealizar): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/crear-servicio`, objetoServicioARealizar, {headers:this.HttpHeaders}).pipe(
      catchError(e => {

        if(e.status == 400){
          return throwError(() => e)
        }

        console.error(e.error.mensaje);
        swal("Error en el formulario, acomplete los datos faltantes ",e.error.mensaje,  'error');
        return throwError(() => e)
      })
    );
  }

  getServicioARealizarFolio(folio): Observable<any>{
     return this.http.get<any>(`${this.urlEndPoint}/buscar-servicio-a-realizar-folio/${folio}`).pipe(
       catchError(e => {
         this.router.navigate(['/page-servicio']);
         console.error(e.error.mensaje);
         swal('Error al registrar', e.error.mensaje, 'error');
         return throwError(()=>e)
       })
     );
   }

  // ! MODIFICAR
  update(objetoServicioARealizar: ObjetoServicioARealizar): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/editar-servicio/${objetoServicioARealizar.folio}`, objetoServicioARealizar, {headers:this.HttpHeaders}).pipe(
        catchError(e => {

          if(e.status == 400){
            return throwError(() => e)
          }
          console.error(e.error.mensaje);
          swal('No se pudo modificar el servicio', 'error');
          return throwError(() => e)
        })
    );
  }


  // ! ELIMINAR
  delete(folio:number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/eliminar-servicio/${folio}`, {headers:this.HttpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('No se pudo borrar el producto', 'termine el servicio existente', 'error');
        return throwError(() => e)
      })
    );
  }

}
