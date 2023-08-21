import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Scholarship } from '../_models/Scholarship';
import { Observable, of } from 'rxjs';
import { ScholarshipService } from './scholarship.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<Scholarship> {

  constructor(private scholarshipService: ScholarshipService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Scholarship> {
    const id = route.queryParamMap.get("DemandeId");
    
    if (id) {
      const demandeId = parseInt(id)
      
      return this.scholarshipService.getDemandeById(demandeId);
      
      

    } else {
      return of(this.getDemandeDetails());

    }
  }
  getDemandeDetails() {
    return {
      nom: '',
      prenom: '',
      date: new Date(),
      gender: '',
      email: '',
      telephone: '',
      address: '',
      city: '',
      region: '',
      postal: '',
      country: ''
    }
  }

}
