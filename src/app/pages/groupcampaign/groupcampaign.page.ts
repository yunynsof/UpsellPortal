import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from 'src/app/auth/alert.service';
import { Router } from "@angular/router";
import { NavController, ModalController } from '@ionic/angular';
import { AddcategoryPage } from '../addcategory/addcategory.page';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import validator from 'validator';

@Component({
  selector: 'app-groupcampaign',
  templateUrl: './groupcampaign.page.html',
  styleUrls: ['./groupcampaign.page.scss'],
})
export class GroupcampaignPage implements OnInit {

  customActionSheetOptions: any = {
    header: 'Categoria',
    subHeader: 'Seleccione una categoria'
  };
  customPopoverOptions: any = {
    subHeader: 'Seleccione una sub categoria'
  };
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private navController: NavController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializePage();
  }

  initializePage() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  @ViewChild('form', { static: false }) form: NgForm;
  validations_form: FormGroup;

  ngOnInit() {

    this.getCategories();
    this.validateFieldsForm();
  }

  async moveToFirst() {

    const modal = await this.modalCtrl.create({
      component: AddcategoryPage,
      cssClass: 'my-custom-modal-css'
    });

    return await modal.present();
  }

  closeModal() {

    this.modalCtrl.dismiss();
  }

  createCampaign() {

    this.router.navigateByUrl('createcampaign');
  }

  groupCampaignForm(form) {

    if (this.groupFormValidator()) {
      this.alertService.present();
      let group = {
        name: form.value.nameGroup,
        description: form.value.description,
        subCategoryId: form.value.subCategory
      };
      this.authService.groupCampaignForm(group).subscribe((res) => {

        this.alertService.dismiss();
        this.alertService.presentToast("Se creo el grupo correctamente");
      }, error => {

        this.alertService.dismiss();
        this.alertService.errorCreateGroup(error);

      },
        () => {
          this.navController.navigateRoot('/groupcampaign');
          form.reset();
        }
      );
    }
  }

  categories: any = [];
  itemsCategories: any = [];
  subCategories: any = [];

  getCategories() {

    this.authService.getCategories()
      .then(data => {
        this.categories = data;
        this.itemsCategories = this.categories.items;
        this.clearArray();
      });
  }

  getSubCategories() {

    this.groupCreateFormValidator.idCategory.empty = '';
    this.clearArray();
    for (let x = 0; x < this.itemsCategories.length; x++)
      if (this.itemsCategories[x].id == this.categoryArray.idCategory) {
        for (let i = 0; i < this.itemsCategories[x].subCategories.length; i++)
          this.subCategories[i] = this.itemsCategories[x].subCategories[i];
       
        return;
      }
  }

  clearArray() {
    this.categoryArray.subCategory = null;
    this.subCategories = [];
  }

  categoryArray = {
    nameGroup: null,
    area: null,
    idCategory: null,
    subCategory: null,
    description: null,
  }

  validateFieldsForm() {
    let nameRegex: RegExp = /(?!^\d+$)^.[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s(),.-/&]{4,30}$/
    this.validations_form = this.formBuilder.group({
      'nameGroup': [null, [Validators.pattern(nameRegex), Validators.required]],
      'idCategory': [null, [Validators.required]],
      'subCategory': [null, [Validators.required]],
      'description': [null, [Validators.required]]
    });
  }

  validation_messages = {
    'nameGroup': [
      { type: 'pattern', message: 'No debe tener caracteres especiales, ni una longitud mayor de 30' },
      { type: 'required', message: 'Ingrese el nombre del Grupo' }
    ],
    'idCategory': [
      { type: 'required', message: 'Seleccione una Categoria' }
    ],
    'subCategory': [
      { type: 'required', message: 'Seleccione una SubCategoria' }
    ],
    'description': [
      { type: 'required', message: 'Ingrese Descripcion' }
    ]
  }

  groupCreateFormValidator = {
    nameGroup: {
      empty: '',
    },
    idCategory: {
      empty: '',
    },
    subCategory: {
      empty: '',
    },
    description: {
      empty: '',
    }
  };

  groupFormValidator(): boolean {

    if (this.validations_form.value.nameGroup == null || this.validations_form.value.nameGroup == '') {
      this.validations_form.value.nameGroup = '';
    } if (this.validations_form.value.idCategory == null || this.validations_form.value.idCategory == '') {
      this.validations_form.value.idCategory = '';
    }
    if (this.validations_form.value.subCategory == null || this.validations_form.value.subCategory == '') {
      this.validations_form.value.subCategory = '';
    } if (this.validations_form.value.description == null || this.validations_form.value.description == '') {
      this.validations_form.value.description = '';
    }

    if (validator.isEmpty(this.validations_form.value.nameGroup)) {
      this.groupCreateFormValidator.nameGroup.empty = ' ';
    } else {
      this.groupCreateFormValidator.nameGroup.empty = '';
    }

    if (validator.isEmpty(this.validations_form.value.idCategory)) {
      this.groupCreateFormValidator.idCategory.empty = ' ';
    } else {
      this.groupCreateFormValidator.idCategory.empty = '';
    }

    if (validator.isEmpty(this.validations_form.value.subCategory)) {
      this.groupCreateFormValidator.subCategory.empty = ' ';
    } else {
      this.groupCreateFormValidator.subCategory.empty = '';
    }

    if (validator.isEmpty(this.validations_form.value.description)) {
      this.groupCreateFormValidator.description.empty = ' ';
    } else {
      this.groupCreateFormValidator.description.empty = '';
    }

    if (this.groupCreateFormValidator.nameGroup.empty == ' ' ||
      this.groupCreateFormValidator.idCategory.empty == ' ' ||
      this.groupCreateFormValidator.subCategory.empty == ' ' ||
      this.groupCreateFormValidator.description.empty == ' ') {
      return false;
    } else return true;
  }

  cleanForm() {

    this.categoryArray.nameGroup = null;
    this.categoryArray.idCategory = null;
    this.categoryArray.subCategory = null;
    this.categoryArray.description = null;
    this.groupCreateFormValidator.nameGroup.empty = '';
    this.groupCreateFormValidator.idCategory.empty = '';
    this.groupCreateFormValidator.subCategory.empty = '';
    this.groupCreateFormValidator.description.empty = '';
  }

}
