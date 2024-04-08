import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private baseUrl: string = "https://localhost:7030/api/work/";
  
  constructor(private http: HttpClient, private router: Router) { 
    
  }

  getWork(id: number){
    return this.http.get(`${this.baseUrl}${id}`);
  }

  getAll(){
    return this.http.get(`${this.baseUrl}`);
  }

  getAllWorkAssignedToMe(){
    return this.http.get(`${this.baseUrl}assigned`);
  }

  getAllWorkIAssign(){
    return this.http.get(`${this.baseUrl}assign`);
  }

  getAllSubWork(parentWorkId: any){
    return this.http.get(`${this.baseUrl}sub-work/${parentWorkId}`);
  }
  
  createWork(data: FormData){
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateProgress(data: any){
    return this.http.put(`${this.baseUrl}update-progress`, data);
  }

  updateStatus(data: any){
    return this.http.put(`${this.baseUrl}update-status`, data);
  }

  chuyenBuocTiepTheo(data: any){
    return this.http.post(`${this.baseUrl}chuyenbuoctieptheo`, data);
  }

  quayLaiBuocTruoc(data: any){
    return this.http.post(`${this.baseUrl}quayvebuoctruoc`, data);
  }

}
