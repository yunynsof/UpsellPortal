import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from 'src/app/auth/alert.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import validator from 'validator';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.page.html',
  styleUrls: ['./addcategory.page.scss'],
})
export class AddcategoryPage implements OnInit {

  customActionSheetOptions: any = {
    header: 'Categoria',
    subHeader: 'Seleccione una categoria'
  };

  constructor(
    public formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  @ViewChild('form', { static: false }) form: NgForm;
  validationsCategory_form: FormGroup;
  validationsSubcategory_form: FormGroup;

  ngOnInit() {
    this.getCategories();
    this.validateFieldsForm();
  }
  categories: any;
  itemsCategories: any = [];

  getCategories() {
    this.authService.getCategories()
      .then(data => {
        this.categories = data;
        this.itemsCategories = this.categories.items;
      });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addCategory() {
    this.router.navigateByUrl('groupcampaign');
  }

  saveCategory(form) {
    if (this.categoryFormValidator()) {
      this.alertService.present();
      let category = {
        name: form.value.category,
        description: form.value.desCategory
      };

      this.authService.addCategoryForm(category).subscribe((res) => {
        this.alertService.dismiss();
        this.alertService.presentToast("Se guardo la categoria");
        this.clearField();
      }, error => {
        this.alertService.dismiss();
        this.alertService.errorAlert("No se pudo guardar la categoria");
      });
    }
  }

  saveSubCategory(form) {

    if (this.subCategoryFormValidator()) {
      this.alertService.present();

      this.authService.addSubCategoryForm(form.value).subscribe((res) => {

        this.alertService.dismiss();
        this.alertService.presentToast("Se guardo la sub categoria");
        this.clearField();
      }, error => {
        this.alertService.dismiss();
        this.alertService.errorAlert("No se pudo guardar la sub categoria");
      });
    }
  }

  addCategories = {
    category: null,
    idCategory: null,
    subCategory: null,
    desCategory: null,
    desSubCategory: null
  }

  clearField() {

    this.addCategories.category = null;
    this.addCategories.idCategory = null;
    this.addCategories.subCategory = null;
    this.addCategories.desCategory = null;
    this.addCategories.desSubCategory = null;
  }

  validateFieldsForm() {

    let nameRegex: RegExp = /(?!^\d+$)^.[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s(),.-/&]{4,30}$/
    this.validationsCategory_form = this.formBuilder.group({
      'category': [null, [Validators.pattern(nameRegex), Validators.required]],
      'desCategory': [null, [Validators.required]]
    });
    this.validationsSubcategory_form = this.formBuilder.group({
      'idCategory': [null, [Validators.required]],
      'subCategory': [null, [Validators.pattern(nameRegex), Validators.required]],
      'desSubCategory': [null, [Validators.required]]
    });
  }

  validation_messages = {
    'category': [
      { type: 'pattern', message: 'No debe tener caracteres especiales, ni una longitud mayor de 30' },
      { type: 'required', message: 'Ingrese el nombre de la Categoria' }
    ],
    'desCategory': [
      { type: 'required', message: 'Ingrese Descripcion' }
    ],
    'idCategory': [
      { type: 'required', message: 'Seleccione una Categoria' }
    ],
    'subCategory': [
      { type: 'pattern', message: 'No debe tener caracteres especiales, ni una longitud mayor de 30' },
      { type: 'required', message: 'Ingrese el nombre de la Subcategoria' }
    ],
    'desSubCategory': [
      { type: 'required', message: 'Ingrese Descripcion' }
    ]
  }

  addCategFormValidator = {
    category: {
      empty: '',
    },
    desCategory: {
      empty: '',
    }
  };

  categoryFormValidator(): boolean {

    if (this.validationsCategory_form.value.category == null || this.validationsCategory_form.value.category == '') {
      this.validationsCategory_form.value.category = '';
    } if (this.validationsCategory_form.value.desCategory == null || this.validationsCategory_form.value.desCategory == '') {
      this.validationsCategory_form.value.desCategory = '';
    }

    if (validator.isEmpty(this.validationsCategory_form.value.category)) {
      this.addCategFormValidator.category.empty = ' ';
    } else {
      this.addCategFormValidator.category.empty = '';
    }

    if (validator.isEmpty(this.validationsCategory_form.value.desCategory)) {
      this.addCategFormValidator.desCategory.empty = ' ';
    } else {
      this.addCategFormValidator.desCategory.empty = '';
    }

    if (this.addCategFormValidator.category.empty == ' ' || this.addCategFormValidator.desCategory.empty == ' ') {
      return false;
    } else return true;
  }

  addSubCategFormValidator = {
    idCategory: {
      empty: '',
    },
    subCategory: {
      empty: '',
    },
    desSubCategory: {
      empty: '',
    }
  };

  subCategoryFormValidator(): boolean {

    if (this.validationsSubcategory_form.value.idCategory == null || this.validationsSubcategory_form.value.idCategory == '') {
      this.validationsSubcategory_form.value.idCategory = '';
    } if (this.validationsSubcategory_form.value.subCategory == null || this.validationsSubcategory_form.value.subCategory == '') {
      this.validationsSubcategory_form.value.subCategory = '';
    }
    if (this.validationsSubcategory_form.value.desSubCategory == null || this.validationsSubcategory_form.value.desSubCategory == '') {
      this.validationsSubcategory_form.value.desSubCategory = '';
    }

    if (validator.isEmpty(this.validationsSubcategory_form.value.idCategory)) {
      this.addSubCategFormValidator.idCategory.empty = ' ';
    } else {
      this.addSubCategFormValidator.idCategory.empty = '';
    }

    if (validator.isEmpty(this.validationsSubcategory_form.value.subCategory)) {
      this.addSubCategFormValidator.subCategory.empty = ' ';
    } else {
      this.addSubCategFormValidator.subCategory.empty = '';
    }

    if (validator.isEmpty(this.validationsSubcategory_form.value.desSubCategory)) {
      this.addSubCategFormValidator.desSubCategory.empty = ' ';
    } else {
      this.addSubCategFormValidator.desSubCategory.empty = '';
    }

    if (this.addSubCategFormValidator.idCategory.empty == ' ' ||
      this.addSubCategFormValidator.subCategory.empty == ' ' ||
      this.addSubCategFormValidator.desSubCategory.empty == ' ') {
      return false;
    } else return true;
  }

  cleanCategForm() {

    this.addCategories.category = null,
    this.addCategories.desCategory = null,
    this.addCategFormValidator.category.empty = '';
    this.addCategFormValidator.desCategory.empty = '';
  }

  cleanSubCategForm() {

    this.addCategories.idCategory = null,
    this.addCategories.subCategory = null,
    this.addCategories.desSubCategory = null,
    this.addSubCategFormValidator.idCategory.empty = '';
    this.addSubCategFormValidator.subCategory.empty = '';
    this.addSubCategFormValidator.desSubCategory.empty = '';
  }


}
