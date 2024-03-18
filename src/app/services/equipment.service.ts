import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private baseUrl: string = "https://localhost:7030/api/equipment/";
  constructor(private http: HttpClient, private router: Router) { }
  getAll(){
    return this.http.get(`${this.baseUrl}`);
  }
  getEquipment(id: string){
    return this.http.get<any>(`${this.baseUrl}${id}`);
  }
  addEquipment(equipment: any){
    return this.http.post<any>(`${this.baseUrl}`, equipment);
  }
  updateEquipment(id: string, equipment: any){
    return this.http.put<any>(`${this.baseUrl}${id}`, equipment);
  }
  deleteEquipment(id: string){
    return this.http.delete(`${this.baseUrl}${id}`);
  }
  assignEquipment(data: any){
    return this.http.post<any>(`${this.baseUrl}assign`, data);
  }
  returnEquipment(listEquipmentId: any){
    return this.http.post<any>(`${this.baseUrl}return`, listEquipmentId);
  }
  historyEquipment(equipmentId: string){
    return this.http.get<any>(`${this.baseUrl}history/${equipmentId}`);
  }
}
