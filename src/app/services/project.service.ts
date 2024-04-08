import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl: string = "https://localhost:7030/api/project/";
  
  constructor(private http: HttpClient, private router: Router) { 
    
  }

  getAllProject(){
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getAllProjectJoined(){
    return this.http.get<any>(`${this.baseUrl}joined`);
  }

  getAllInfoByProject(projectId: string){
    return this.http.get<any>(`${this.baseUrl}members/${projectId}`);
  }

  getLichSuThucHienCongViec(projectId: string){
    return this.http.get<any>(`${this.baseUrl}lichsuthuchiencongviec/${projectId}`);
  }

  getProject(id: string){
    return this.http.get<any>(`${this.baseUrl}${id}`);
  }
  getProjectDetail(id: string){
    return this.http.get<any>(`${this.baseUrl}detail/${id}`);
  }

  addProject(data: any){
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

  editProject(data: any){
    return this.http.put<any>(`${this.baseUrl}${data.id}`, data);
  }

  deleteProject(id: string){
    return this.http.delete<any>(`${this.baseUrl}${id}`);
  }

  updateStatus(data: any){
    return this.http.put(`${this.baseUrl}update-status`, data);
  }
  
}
