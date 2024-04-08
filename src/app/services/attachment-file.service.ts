import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentFileService {
  private baseUrl: string = "https://localhost:7030/api/attachmentfile/";
  
  constructor(private http: HttpClient, private router: Router) { 
    
  }

  getFile(pathFile: string) : Observable<Blob>{
    return this.http.get(`${this.baseUrl}${pathFile}`, { responseType: 'blob' });
  }

  getAllFiles(workId: number) : Observable<Blob>{
    return this.http.get(`${this.baseUrl}all/${workId}`, { responseType: 'blob' });
  }
}
