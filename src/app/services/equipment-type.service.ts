import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipmentTypeService {
  private baseUrl: string = "https://localhost:7030/api/equipmentType";
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get<any>(`${this.baseUrl}`);
  }
  getEquipment(id: string){
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  addEquipmentType(equipmentType: any){
    return this.http.post<any>(`${this.baseUrl}`, equipmentType);
  }
  updateEquipmentType(id: string, data: any){
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }
  deleteEquipmentType(id: string){
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
