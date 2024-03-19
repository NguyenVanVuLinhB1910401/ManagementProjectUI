import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = "https://localhost:7030/api/employee/";
  
  constructor(private http: HttpClient, private router: Router) { 
    
  }

  getAllEmployee(){
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getEmployee(id: string){
    return this.http.get<any>(`${this.baseUrl}${id}`);
  }

  getEmployeeByDepartment(departmentId: string){
    return this.http.get<any>(`${this.baseUrl}department/${departmentId}`);
  }

  addEmployee(data: any){
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

  editEmployee(data: any){
    return this.http.put<any>(`${this.baseUrl}${data.id}`, data);
  }

  deleteEmployee(id: string){
    return this.http.delete<any>(`${this.baseUrl}${id}`);
  }
}
