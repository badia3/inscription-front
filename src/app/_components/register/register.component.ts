import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ROLES } from '../../_models/Roles';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {






  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  showPassword: { [key: string]: boolean } = {
    password: false,
    confirmPassword: false,
  };
  Roles = ROLES;
  defaultRole = this.Roles.USER;

  constructor(private formBuilder: FormBuilder,
  private router: Router,
  private authService: AuthService) { }

  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;



  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: [''],
      password: [''],
      confirmPassword: ['']
    });

  }

  toggleShow(inputId: string) {
    this.showPassword[inputId] = !this.showPassword[inputId];
  }

  userForm = this.formBuilder.group({
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    confirmPassword: ['', Validators.required]
  }, { validator: this.matchingPasswords('password', 'confirmPassword') });


  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({ passwordsNotMatch: true })
      }
    }
  }

  register() {
    if (this.userForm.valid) {
      var user = {
        "nom": this.userForm.get('firstname')?.value,
        "prenom": this.userForm.get('lastname')?.value,
        "email": this.userForm.get('email')?.value,
        "telephone": this.userForm.get('phone')?.value,
        "motDePasse": this.userForm.get('password')?.value,
        "role": this.defaultRole
      };


      this.authService.register(user).subscribe(response => {
        console.log('User registered successfully!');
        this.userForm.reset();
      }, error => {
        console.error('Error registering user:', error);
      });
    }
    this.router.navigate(['/login']);

  }

  onRoleChange(event: any) {
    if (event.target.checked) {
      this.defaultRole = this.Roles.ADMIN;
    } else {
      this.defaultRole = this.Roles.USER;
    }
  }
  passwordConfirmationMismatch(): boolean {
    const passwordControl = this.userForm.get('password');
    const confirmPasswordControl = this.userForm.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      return confirmPasswordControl.touched &&
        passwordControl.value !== confirmPasswordControl.value;
    }

    return false;
  }

  


}
