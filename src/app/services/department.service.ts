import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl: string = "https://localhost:7030/api/department/";
  
  constructor(private http: HttpClient, private router: Router) { 
    
  }

  getAllDepartment(){
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getDepartment(id: string){
    return this.http.get<any>(`${this.baseUrl}${id}`);
  }

  addDepartment(data: any){
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

  editDepartment(data: any){
    return this.http.put<any>(`${this.baseUrl}${data.id}`, data);
  }

  deleteDepartment(id: string){
    return this.http.delete<any>(`${this.baseUrl}${id}`);
  }

}
