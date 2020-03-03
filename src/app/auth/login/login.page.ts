import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import validator from 'validator';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private navController: NavController
  ) {}

  @ViewChild('form', { static: false }) form: NgForm;

  validations_form: FormGroup;

  ngOnInit() {
    this.validateFieldsForm();
  }

  login(form) {
    if (this.formValidator()) {
      this.alertService.present();
      this.authService.login(form.value).subscribe(
        data => {
          this.alertService.dismiss();
          this.alertService.presentToast("Bienvenido al portal Upselling");
        },
        error => {
          this.alertService.dismiss();
          this.alertService.errorLogin(error);
        },
        () => {
          this.navController.navigateRoot('/home');
        }
      );
    }
  }

  getHome() {
    this.navController.navigateRoot('/home');
  }

  validateFieldsForm() {
    this.validations_form = this.formBuilder.group({
      'claim': [null, [Validators.required]],
      'secret': [null, [Validators.required]]
    });
  }

  validation_messages = {
    'claim': [
      { type: 'required', message: 'Ingrese Usuario' }
    ],
    'secret': [
      { type: 'required', message: 'Ingrese Contraseña' }
    ]
  }


  loginFormValidator = {
    claim: {
      empty: '',
    },
    secret: {
      empty: '',
    }
  };

  formValidator(): boolean {

    if (this.validations_form.value.claim == null || this.validations_form.value.claim == '') {
      this.validations_form.value.claim = '';
    } if (this.validations_form.value.secret == null || this.validations_form.value.secret == '') {
      this.validations_form.value.secret = '';
    }

    if (validator.isEmpty(this.validations_form.value.claim)) {
      this.loginFormValidator.claim.empty = ' ';
    } else {
      this.loginFormValidator.claim.empty = '';
    }

    if (validator.isEmpty(this.validations_form.value.secret)) {
      this.loginFormValidator.secret.empty = ' ';
    } else {
      this.loginFormValidator.secret.empty = '';
    }

    if (this.loginFormValidator.claim.empty == ' ' || this.loginFormValidator.secret.empty == ' ') {
      return false;
    } else return true;
  }

}
