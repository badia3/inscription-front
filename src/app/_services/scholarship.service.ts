import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Scholarship } from '../_models/Scholarship';
import { Observable } from 'rxjs';
import { DemandeStatus } from '../_models/DemandeStatus';

const URL = 'http://localhost:9090/api/demandes/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService {

  constructor(private http: HttpClient) { }
  addDemande(scholarship: any,userId : any): Observable<Scholarship> {
    return this.http.post<Scholarship>(
      URL + 'addDemande/'+userId,
      scholarship,
      httpOptions
    );
  }

  getAllDemandesByUserId(userId: number): Observable<Scholarship[]> {
    return this.http.get<Scholarship[]>(
      URL + 'getUserDemandes/' + userId,
      httpOptions
    );
  }

  deleteDemandeById(demandeId: number): Observable<any> {
    return this.http.delete<any>(URL + 'deleteDemande/' + demandeId, httpOptions);
  }

  updateDemande(demandeId: any, updatedDemande: any): Observable<Scholarship> {
    return this.http.put<Scholarship>(
      URL + 'updateDemande/' + demandeId,
      updatedDemande,
      httpOptions
    );
  }
  getDemandeById(demandeId: number): Observable<Scholarship> {
    return this.http.get<Scholarship>(URL + 'getDemandeById/' + demandeId, httpOptions);
  }

  getAllDemandes(): Observable<Scholarship[]> {
    return this.http.get<Scholarship[]>(
      URL + 'getAllDemandes',
      httpOptions
    );
  }

  updateDemandeStatus(demandeId: number,  newStatus: DemandeStatus): Observable<Scholarship> {
    return this.http.put<Scholarship>(
      URL + 'updateStatus/' + demandeId,
      
      { newStatus: newStatus },
      httpOptions
    );
  }

}
