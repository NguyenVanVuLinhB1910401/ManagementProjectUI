import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = "https://localhost:7030/api/user/";
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get<any>(`${this.baseUrl}`);
  }
  getAllEquipmentAssigned(employeeId: string){
    return this.http.get<any>(`${this.baseUrl}equipmentasssigned/${employeeId}`);
  }
}
