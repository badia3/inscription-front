import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ScholarshipService } from '../../_services/scholarship.service';
import { StorageService } from '../../_services/storage.service';
import { Scholarship } from '../../_models/Scholarship';
import { Router } from '@angular/router';
import { DemandeStatus } from '../../_models/DemandeStatus';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent implements OnInit {
  isLoggedIn: boolean = false;
  demandes: any;
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'gender', 'date', 'email', 'telephone', 'address', 'city', 'region', 'postal', 'country', 'status', 'Edit', 'Delete'];
  ListDemandes: Scholarship[] = [];
  statusOptions: string[] = ['In_Progress', 'Accepted', 'Rejected'];
  isAdminRole: boolean = false;

  constructor(private scholarshipService: ScholarshipService,
    private storageService: StorageService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog) { }



  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      const userId = user.user_details.id;

      if (user.user_details.role === 'USER') {
        this.loadUserDemandes(userId);
      } else if (user.user_details.role === 'ADMIN') {
        this.isAdminRole = true;
        this.getAllDemandes();
      }
    }

  }
  // changeDemandeStatus(id: any, newStatus: DemandeStatus): void {
  //   this.scholarshipService.updateDemandeStatus(id, newStatus).subscribe(
  //     (updatedDemande) => {
  //       const index = this.ListDemandes.findIndex(demande => demande.id === id);
  //       if (index !== -1) {
  //         this.ListDemandes[index] = updatedDemande;
  //         this.changeDetectorRef.detectChanges();
  //       }
  //     },
  //     (error) => {
  //       console.error('Error updating demande status:', error);
  //     }
  //   );
  // }

  changeDemandeStatus(id: any, newStatus: DemandeStatus): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: 'Are you sure you want to change the status of this demand?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      if (result===true) {
        
        this.scholarshipService.updateDemandeStatus(id, newStatus).subscribe(
          (updatedDemande) => {
            const index = this.ListDemandes.findIndex(demande => demande.id === id);
            if (index !== -1) {
              this.ListDemandes[index] = updatedDemande;
              this.changeDetectorRef.detectChanges();
            }
          },
          (error) => {
            console.error('Error updating demande status:', error);
          }
        );
      }
    });
  }
  





  loadUserDemandes(userId: number): void {
    this.scholarshipService.getAllDemandesByUserId(userId).subscribe(
      (demandes) => {
        this.ListDemandes = demandes;
      },
      (error) => {
        console.error('Error fetching demandes:', error);
      }
    );
  }
  getAllDemandes(): void {
    this.scholarshipService.getAllDemandes().subscribe(
      (demandes) => {
        this.ListDemandes = demandes;
      },
      (error) => {
        console.error('Error fetching all demandes:', error);
      }
    );
  }


  deleteDemande(id: any): void {
    this.scholarshipService.deleteDemandeById(id).subscribe(
      response => {
        if (response) {
          console.log('Demande deleted successfully.');
          const user = this.storageService.getUser();
          const userId = user.user_details.id;

          if (user.user_details.role === 'USER') {
            this.loadUserDemandes(userId);
          } else if (user.user_details.role === 'ADMIN') {
            this.isAdminRole = true;
            this.getAllDemandes();
          }
          
          this.router.navigate(['/listDemande']);

        } else {
          console.error('Error deleting demande.');

        }
      },
      error => {
        console.error('Error deleting demande.', error);

      }
    );
  }

  editDemande(id: any): void {
    this.router.navigate(['/updateDemande'], { queryParams: { DemandeId: id } });

  }


  reloadPage(): void {
    window.location.reload();
  }

}






