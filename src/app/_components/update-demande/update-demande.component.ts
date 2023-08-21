import { Component } from '@angular/core';
import { ScholarshipService } from '../../_services/scholarship.service';
import { StorageService } from '../../_services/storage.service';
import { EventBusService } from '../../_shared/event-bus.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResolveService } from '../../_services/resolve.service';
import { Scholarship } from '../../_models/Scholarship';

@Component({
  selector: 'app-update-demande',
  templateUrl: './update-demande.component.html',
  styleUrls: ['./update-demande.component.css']
})
export class UpdateDemandeComponent {

  Form: any = {};
  demandeIdD: any;

  constructor(private scholarshipService: ScholarshipService,
    private storageService: StorageService,
     private eventBusService: EventBusService,
     private formBuilder: FormBuilder,
     private activatedRoute: ActivatedRoute,
     private resolveService: ResolveService,
     private router: Router) { }


     ngOnInit(): void {
    
    

      
      
      // const resolvedScholarship = this.activatedRoute.snapshot.data['demande'];
      // console.log(resolvedScholarship);
      //const routeSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
      //const id = routeSnapshot.paramMap.get('id');
      //console.log('id:', id); 
      const resolvedScholarship: Scholarship = this.activatedRoute.snapshot.data['demande'];
      
      this.demandeIdD = resolvedScholarship.id;
      
      const parsedDate: Date = new Date(resolvedScholarship.date);
  
    
    this.scholarshipForm.patchValue({
      nom: resolvedScholarship.nom,
      prenom: resolvedScholarship.prenom,
      date: parsedDate,
      gender: resolvedScholarship.gender,
      email: resolvedScholarship.email,
      telephone: resolvedScholarship.telephone,
      address: resolvedScholarship.address,
      city: resolvedScholarship.city,
      region: resolvedScholarship.region,
      postal: resolvedScholarship.postal,
      country: resolvedScholarship.country,
    });
    }
    scholarshipForm = this.formBuilder.group({
      nom: new FormControl("", Validators.required),
      prenom: new FormControl("", Validators.required),
      date: new FormControl(new Date(), Validators.required),
      gender: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      telephone: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      region: new FormControl("", Validators.required),
      postal: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required)
    });
  
    editDemande() {
      var scholarship= {
        "nom":this.scholarshipForm.get('nom')?.value,
        "prenom": this.scholarshipForm.get('prenom')?.value,
        "date":this.scholarshipForm.get('date')?.value,
        "gender":this.scholarshipForm.get('gender')?.value,
        "email": this.scholarshipForm.get('email')?.value,
        "telephone": this.scholarshipForm.get('telephone')?.value,
        "address": this.scholarshipForm.get('address')?.value,
        
        "city":this.scholarshipForm.get('city')?.value,
        "region":this.scholarshipForm.get('region')?.value,
        "postal":this.scholarshipForm.get('postal')?.value,
        "country":this.scholarshipForm.get('country')?.value
        
      };
      
      
      
      this.scholarshipService.updateDemande(this.demandeIdD,scholarship).subscribe(
        updatedDemande => {
          console.log('Demande updated successfully.', updatedDemande);
          this.router.navigate(['/listDemande']);
  
  
    },
    error => {
      console.error('Error deleting demande.', error);
      
    }
  );
      
    }
    
    
    
    onBirthdateChange(event: any): void {
      const selectedDate: string = event.target.value;
      const parsedDate: Date = new Date(selectedDate);
      this.Form.birthdate = parsedDate;
    }
    
    
    
  }
  

