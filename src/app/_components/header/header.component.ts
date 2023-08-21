import { Component } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { TokenStorageService } from '../../_services/token-storage.service';
import { EventBusService } from '../../_shared/event-bus.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username?: string;
  eventBusSub?: Subscription;

  constructor(private storageService: StorageService, private authService: AuthService,
    private router: Router, 
    private tokenStorageService: TokenStorageService,
     private eventBusService: EventBusService,
   ) { }
   

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.user_details.role;
      this.showAdminBoard = this.roles.includes('ADMIN');
      this.showModeratorBoard = this.roles.includes('MODERATOR');
      this.showUserBoard = this.roles.includes('USER');
      this.username = user.user_details.nom;
      
      this.eventBusSub = this.eventBusService.on('logout', () => {
        this.logout();
      });
      
    }

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateNavbarBackground(event.urlAfterRedirects);
      });
  }
  updateNavbarBackground(currentRoute: string): void {
    const isHomePage = currentRoute === '/home'; 
    if (isHomePage) {
      this.setNavbarTransparent();
    } else {
      this.setNavbarOpaque();
    }
  }

  setNavbarTransparent(): void {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.add('transparent-nav');
    }
  }

  setNavbarOpaque(): void {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.remove('transparent-nav');
    }
  }





  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.signOut();

    this.isLoggedIn = false;
    this.roles = [];
    this.showAdminBoard = false;
    this.showModeratorBoard = false;
    this.showUserBoard = false;
  }
}
