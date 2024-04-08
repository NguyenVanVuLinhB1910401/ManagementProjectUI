import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuyTrinhService {
  private baseUrl: string = "https://localhost:7030/api/quyTrinh/";
  
  constructor(private http: HttpClient, private router: Router) { 
    
  }

  getQuyTrinh(id: number){
    return this.http.get(`${this.baseUrl}${id}`);
  }

  getAllQuyTrinh(){
    return this.http.get(`${this.baseUrl}`);
  }
  
  taoQuyTrinh(data: any){
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

  xoaQuyTrinh(id: string){
    return this.http.delete<any>(`${this.baseUrl}${id}`);
  }
}
