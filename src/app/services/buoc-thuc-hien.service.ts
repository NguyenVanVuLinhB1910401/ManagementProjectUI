import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BuocThucHienService {
  private baseUrl: string = "https://localhost:7030/api/buocThucHien/";
  
  constructor(private http: HttpClient, private router: Router) { 
    
  }

  getBuocHienTai(id: number){
    return this.http.get(`${this.baseUrl}${id}`);
  }

  getBuocByCode(code: string){
    return this.http.get(`${this.baseUrl}code/${code}`);
  }

  
}
