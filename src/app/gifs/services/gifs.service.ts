import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'kaCaT7kS94xPaG2Y4wqMB9JY3kLVekbx';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
     return [...this._historial];
  }

  constructor ( private http: HttpClient ) {
    //if ( localStorage.getItem('historial')) {
    //  this._historial = JSON.parse( localStorage.getItem('historial')! );
    //}
    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];
  }

  buscarGifs ( query: string ) {

    query = query.trim().toLowerCase();

    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial ));


    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=kaCaT7kS94xPaG2Y4wqMB9JY3kLVekbx&q=${query}&limit=10`)
      .subscribe( ( resp ) =>  {
        console.log( resp.data )
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      })


  }


}
