import { Component, OnInit } from '@angular/core';
import { ScholarshipService } from '../../_services/scholarship.service';
import { EventBusService } from '../../_shared/event-bus.service';
import { EventData } from '../../_shared/event.class';
import { Scholarship } from '../../_models/Scholarship';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../../_services/storage.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ResolveService } from '../../_services/resolve.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent  implements OnInit {
  content?: string;
  Form: any = {};
  

  constructor(private scholarship: ScholarshipService,
    private storageService: StorageService,
     private eventBusService: EventBusService,
     private formBuilder: FormBuilder,
     private activatedRoute: ActivatedRoute,
     private resolveService: ResolveService) { }

     isLoggedIn = false;
     userId?: number;
     formattedDate: string = '';

     formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    
    

  ngOnInit(): void {
    
    

    const user = this.storageService.getUser();
    if (user && user.user_details && user.user_details.id) {
      this.isLoggedIn = true;
      this.userId = user.user_details.id;
    }
    
  
    const resolvedScholarship: Scholarship = this.activatedRoute.snapshot.data['demande'];
    
    
    const parsedDate: Date = new Date(resolvedScholarship.date);
    this.formattedDate = this.formatDate(parsedDate);

  
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

  addDemande() {
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
    
    
    
    this.scholarship.addDemande(scholarship,this.userId).subscribe(response => {
      console.log('scholarship added successfully!');
      this.scholarshipForm.reset(); 
    
    }, error => {
      console.error('Error registering scholarship:', error);
    });
    
  }
  
  
  
  onBirthdateChange(event: any): void {
    const selectedDate: string = event.target.value;
    const parsedDate: Date = new Date(selectedDate);
    this.Form.birthdate = parsedDate;
  }
  
  
  
}
