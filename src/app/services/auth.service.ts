import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7030/api/authenticate/";
  private userPayload: any;
  private userLoginSubject: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public userLogin$ = this.userLoginSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken();
    //console.log(this.userPayload);
  }
  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }
  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}login`, loginObj);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  setUserLogin(accessToken: string): void {
    const jwtHelper = new JwtHelperService();
    //console.log(jwtHelper.decodeToken(accessToken));
    const dataLogin = jwtHelper.decodeToken(accessToken);
    this.userLoginSubject.next(dataLogin);
  }

  // getDecodedToken(token: string): any {
  //   try {
  //     return this.jwtHelper.decodeToken(token);
  //   } catch (Error) {
  //     return null;
  //   }
  // }

  // getIdFromToken(token: string): string {
  //   const decodedToken = this.getDecodedToken(token);
  //   return decodedToken ? decodedToken.Id : null;
  // }

  // getFullNameFromToken(token: string): string {
  //   const decodedToken = this.getDecodedToken(token);
  //   return decodedToken ? decodedToken.FullName : null;
  // }

  getFullName(): string {
    this.decodedToken();
    return this.userPayload?.FullName;
  }
  getId(): string {
    this.decodedToken();
    return this.userPayload?.Id;
  }
  getRole(): any {
    this.decodedToken();
    //console.log(this.userPayload);
    
    return this.userPayload?.Roles;
  }


  storeAccessToken(accessToken: string){
    localStorage.setItem("accessToken", accessToken);
  }
  getAccessToken(){
    return localStorage.getItem("accessToken");
  }
  storeRefreshToken(refreshToken: string){
    localStorage.setItem("refreshToken", refreshToken);
  }
  getRefreshToken(){
    return localStorage.getItem("refreshToken");
  }
  isLoggedIn(){
    return !!localStorage.getItem("accessToken");
  }
  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const accessToken = this.getAccessToken()!;
    //console.log(jwtHelper.decodeToken(accessToken));
    this.setUserLogin(accessToken);
    return jwtHelper.decodeToken(accessToken);
  }
  getuserNameFromToken(){
    if(this.userPayload)
    return this.userPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }
  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }
  renewToken(tokenApi: TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh-token`, tokenApi);
  }
}
