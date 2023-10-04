import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
  private _tagsHistory: string[] = [];
  private apiKey: string = 'd549OR0u3PHP05DTNeobcSBz8zSAkixP';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  public gifList: Gif[] = [];

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs service ready');

  }


  //La validación la podemos hacer desde este servicio que es el que recoge los datos:

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase(); //unifico todo para poder comparar si el reusltado no está repetido

    if(this._tagsHistory.includes(tag)) {
      // Solo dejamos pasar los tags que son diferentes:
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }


  get tagsHistory() {
    return [...this._tagsHistory];
  }
  searchTag(tag: string):void {
    if(tag.length === 0) return;
    this.organizeHistory(tag);
    // console.log(this.tagsHistory);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q',tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{ params })
    .subscribe( resp => {
      this.gifList = resp.data;
      console.log(this.gifList);
    });
  }

  private saveLocalStorage():void {
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }
  private loadLocalStorage():void {
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length > 0) {
      this.searchTag(this._tagsHistory[0]);
    }
  }



}
