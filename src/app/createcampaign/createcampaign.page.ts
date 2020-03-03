import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IonSlides } from '@ionic/angular';
import { AlertService } from '../auth/alert.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import validator from 'validator';
import * as moment from 'moment';


@Component({
  selector: 'app-createcampaign',
  templateUrl: './createcampaign.page.html',
  styleUrls: ['./createcampaign.page.scss'],
})

export class CreatecampaignPage implements OnInit {

  @ViewChild('slides', { static: false }) slides: IonSlides;
  @ViewChild('form', { static: false }) form: NgForm;
  @ViewChild(DataTableDirective, { static: false })
  dtOptions: DataTables.Settings = {
    "paging": false,
    "ordering": false,
    "info": false,
    "searching": false,
    "language": {
      "lengthMenu": "Mostrar _MENU_ registros por página",
      "zeroRecords": "",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
      "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
      "infoFiltered": "(Filtrado de _MAX_  registros totales)",
      "emptyTable": "",
      "search": "Buscar:",
      "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "Siguiente",
        "previous": "Atras"
      },
    }
  };

  validationsCreateCampaign_form: FormGroup;

  mydate1;
  mydate2;
  currentDate;
  currentDate2;
  timerAgile;
  timeNotifStartEnd;

  datePickerObj: any = {};
  disablePrevBtn = true;
  disableNextBtn = false;
  disableSaveBtn = true;
  disabledNotifi: boolean = true;
  disableUpdateBtn = true;
  disabledSaveBtn: boolean = true;

  instanceAct;
  instanceName;
  instanceDesc;
  instanceIn;
  instanceEnd;
  instanceCon;
  instanceObj;

  summaryName;
  summaryGroup;
  summaryDateSt;
  summaryDateEn;
  summaryTypeBd;
  summaryExclu;
  summaryExa;

  summaryEven;
  summaryAmou;
  summaryPriz;
  amountList;

  monthShortNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  hourValues = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  minuteValues = ['00', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '59'];
  customActionSheetOptions: any = {
    header: 'Grupo',
    subHeader: 'Seleccione un grupo'
  };

  exacasterActionSheetOptions: any = {
    header: 'Exacaster',
    subHeader: 'Seleccione base de exacaster'
  }

  slideOpts = {
    initialSlide: 0,
    speed: 1000
  };

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public element: ElementRef

  ) {
    this.initializePage();
  }

  initializePage() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  doCheck() {

    let prom1 = this.slides.isBeginning();
    let prom2 = this.slides.isEnd();
    let prom3 = this.slides.isEnd();

    Promise.all([prom1, prom2, prom3]).then((data) => {
      data[0] ? this.disablePrevBtn = true : this.disablePrevBtn = false;
      data[1] ? this.disableNextBtn = true : this.disableNextBtn = false;
      data[2] ? this.disableSaveBtn = false : this.disableSaveBtn = true;
    });
  }

  next() {

    if (this.slideFirstValidator()) {
      if (this.validateDateEnd()) {
        this.getSummary();
        this.slides.slideNext();
      }
    }
  }

  prev() {
    this.slides.slidePrev();
  }

  ngOnInit() {

    this.datePickerObj = {
      setLabel: 'Aceptar',
      todayLabel: 'Fecha Actual',
      closeLabel: 'Cerrar',
      titleLabel: "Seleccione fecha",
      monthsList: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'],
      weeksList: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      dateFormat: 'D/M/YYYY',

      btnProperties: {
        expand: "full",
        color: "dark"
      }
    };

    $(() => {

      $(document).ready(function () {

        $("#name").keyup(function () {
          var value = $(this).val();
          $("#texto2").val(value);
        });
      });
    });
    this.getExacaster();
    this.getGroups();
    this.getEventProduct();
    this.getEventPrize();
    this.validateFieldsForm();
  }

  instance = {};
  createCampaignForm(form) {

    this.alertService.present();
    this.saveEvent();
    this.dayManager();
    this.instance = {
      name: form.value.name,
      groupId: +form.value.group,
      exTemplateId: +form.value.idExa,
      start: moment(form.value.dateStart).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      end: moment(form.value.dateEnd).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      excludeNotifUpsellFramework: this.art.excludeNotifUpsellFramework,
      exRecurrency: form.value.recurrency,
      databaseType: form.value.typeBase,
      scheduleStatus: form.value.observation,
      events: this.eventsManager,
      notifications: this.notifications
    }

    this.authService.createCampaignForm(this.instance).subscribe((res) => {
      this.alertService.dismiss();
      this.alertService.presentToast("Se creo exitosamente la campaña");
    }, error => {

      this.eventsManager = [];
      if (error.status == 400 && error.error.length == 2) {
        this.alertService.dismiss();
        this.alertService.errorCreateCampDate("Verifique que fecha inicio no sea igual a fecha final");
      } else {
        this.alertService.dismiss();
        this.alertService.errorCreateCamp(error.error);
      }
    },
      () => {
        this.eventsManager = [];
        this.clearCreateCampaign();
        this.slides.slideTo(0, 2000);
        form.reset();
      }
    );
  }

  art = {
    group: null,
    name: null,
    idExa: null,
    typeBase: null,
    dateStart: null,
    dateEnd: null,
    excludeNotifUpsellFramework: null,
    recurrency: null,
    observation: null,
    event: null,
    amount: null,
    prize: null,
    quantity: null,
    description: null,
    typeMessage: null,
    message: null,
    agileDay: null,
    hrStartCamp: null,
    hrAgile: null,
    lun: null,
    hrLun: null,
    mar: null,
    hrMar: null,
    mie: null,
    hrMie: null,
    jue: null,
    hrJue: null,
    vie: null,
    hrVie: null,
    sab: null,
    hrSab: null,
    dom: null,
    hrDom: null
  }

  dayMessage = [];
  deleteMessage(art) {

    for (let x = 0; x < this.dayMessage.length; x++)
      if (this.dayMessage[x].id == art.id) {
        this.dayMessage.splice(x, 1);
        return;
      }
  }

  countMessage() {

    let suma = 0;
    for (let x = 0; x < this.dayMessage.length; x++) {
      suma = x + 1;
    }
    return suma;
  }

  messageAlert = "Agregue dia y seleccione una hora";
  saveMessage() {

    if (this.art.message == '     ' || this.art.message == '      ' || this.art.message == null) {
      this.disabledSaveBtn = false;
      return this.alertService.errorAlert("Mensaje no ha sido redactado");
    }
    if (this.art.typeMessage == "REMINDER") {
      if (this.art.lun && this.art.hrLun == null) {
        return this.alertService.errorAlert(this.messageAlert);
      } if (this.art.mar && this.art.hrMar == null) {
        return this.alertService.errorAlert(this.messageAlert);
      } if (this.art.mie && this.art.hrMie == null) {
        return this.alertService.errorAlert(this.messageAlert);
      } if (this.art.jue && this.art.hrJue == null) {
        return this.alertService.errorAlert(this.messageAlert);
      } if (this.art.vie && this.art.hrVie == null) {
        return this.alertService.errorAlert(this.messageAlert);
      } if (this.art.sab && this.art.hrSab == null) {
        return this.alertService.errorAlert(this.messageAlert);
      } if (this.art.dom && this.art.hrDom == null) {
        return this.alertService.errorAlert(this.messageAlert);
      }
      if (
        this.art.lun == null && this.art.hrLun == null && this.art.mar == null && this.art.hrMar == null &&
        this.art.mie == null && this.art.hrMie == null && this.art.jue == null && this.art.hrJue == null &&
        this.art.vie == null && this.art.hrVie == null && this.art.sab == null && this.art.hrSab == null &&
        this.art.dom == null && this.art.hrDom == null) {
        return this.alertService.errorAlert(this.messageAlert);
      }
      if (!this.art.lun) {
        this.art.hrLun = null;
      } if (!this.art.mar) {
        this.art.hrMar = null;
      } if (!this.art.mie) {
        this.art.hrMie = null;
      } if (!this.art.jue) {
        this.art.hrJue = null;
      } if (!this.art.vie) {
        this.art.hrVie = null;
      } if (!this.art.sab) {
        this.art.hrSab = null;
      } if (!this.art.dom) {
        this.art.hrDom = null;
      }
      this.blockSaveNotif("Recordatorio");

    } else if (this.art.typeMessage == "START") {
      if (this.art.hrStartCamp != null) {
        this.blockSaveNotif("Inicio");
      } else { this.alertService.errorAlert("Seleccione una hora"); }

    } else if (this.art.typeMessage == "END") {
      if (this.art.hrStartCamp != null) {
        this.blockSaveNotif("Fin");
      } else { this.alertService.errorAlert("Seleccione una hora"); }
    }
  }

  blockSaveNotif(label) {

    this.dayMessage.push({
      id: this.countMessage(),
      exacaster: this.art.idExa,
      typeMessage: this.art.typeMessage,
      message: this.art.message,
      description: this.descriptionNotification(),
      hrStartCamp: this.art.hrStartCamp,
      lun: this.art.lun,
      mar: this.art.mar,
      mie: this.art.mie,
      jue: this.art.jue,
      vie: this.art.vie,
      sab: this.art.sab,
      dom: this.art.dom,
      hrLun: this.art.hrLun,
      hrMar: this.art.hrMar,
      hrMie: this.art.hrMie,
      hrJue: this.art.hrJue,
      hrVie: this.art.hrVie,
      hrSab: this.art.hrSab,
      hrDom: this.art.hrDom,
      labelTypeSms: label,
    });
    this.cleanMessage();
  }

  descriptionNotification() {

    let description = "";
    if (this.art.lun) {
      description = "Lun=" + this.getLocaleTimeFormat(this.art.hrLun);
    }
    if (this.art.mar) {
      description += " Mar=" + this.getLocaleTimeFormat(this.art.hrMar);
    }
    if (this.art.mie) {
      description += " Mie=" + this.getLocaleTimeFormat(this.art.hrMie);
    }
    if (this.art.jue) {
      description += " Jue=" + this.getLocaleTimeFormat(this.art.hrJue);
    }
    if (this.art.vie) {
      description += " Vie=" + this.getLocaleTimeFormat(this.art.hrVie);
    }
    if (this.art.sab) {
      description += " Sab=" + this.getLocaleTimeFormat(this.art.hrSab);
    }
    if (this.art.dom) {
      description += " Dom=" + this.getLocaleTimeFormat(this.art.hrDom);
    }
    if (this.art.hrStartCamp) {
      description += " Hora = " + this.getLocaleTimeFormat(this.art.hrStartCamp);
    }
    return description;
  }

  modifiedMsgId;
  selectMessage(art) {

    this.cleanMessage();
    this.disableUpdateBtn = false;
    if (art.typeMessage == "REMINDER") {

      this.modifiedMsgId = art.id;
      this.art.typeMessage = art.typeMessage;
      this.art.message = art.message;
      this.art.lun = art.lun;
      this.art.mar = art.mar;
      this.art.mie = art.mie;
      this.art.jue = art.jue;
      this.art.vie = art.vie;
      this.art.sab = art.sab;
      this.art.dom = art.dom;
      this.art.hrLun = art.hrLun;
      this.art.hrMar = art.hrMar;
      this.art.hrMie = art.hrMie;
      this.art.hrJue = art.hrJue;
      this.art.hrVie = art.hrVie;
      this.art.hrSab = art.hrSab;
      this.art.hrDom = art.hrDom;
      this.art.hrStartCamp = art.hrStartCamp;
    } else {

      this.disabledNotifi = true;
      this.modifiedMsgId = art.id;
      this.art.typeMessage = art.typeMessage;
      this.art.message = art.message;
      this.art.hrStartCamp = art.hrStartCamp;
    }
  }

  modifiedMessage() {

    for (let x = 0; x < this.dayMessage.length; x++) {
      if (this.dayMessage[x].id == this.modifiedMsgId) {
        this.dayMessage[x].typeMessage = this.art.typeMessage;
        this.dayMessage[x].message = this.art.message;
        this.dayMessage[x].description = this.descriptionNotification();
        this.dayMessage[x].lun = this.art.lun;
        this.dayMessage[x].mar = this.art.mar;
        this.dayMessage[x].mie = this.art.mie;
        this.dayMessage[x].jue = this.art.jue;
        this.dayMessage[x].vie = this.art.vie;
        this.dayMessage[x].sab = this.art.sab;
        this.dayMessage[x].dom = this.art.dom;
        this.dayMessage[x].hrStartCamp = this.art.hrStartCamp;
        if (!this.art.lun) {
          this.dayMessage[x].hrLun = null;
        } else {
          this.dayMessage[x].hrLun = this.art.hrLun;
        }
        if (!this.art.mar) {
          this.dayMessage[x].hrMar = null
        } else {
          this.dayMessage[x].hrMar = this.art.hrMar;
        }
        if (!this.art.mie) {
          this.dayMessage[x].hrMie = null
        } else {
          this.dayMessage[x].hrMie = this.art.hrMie;
        }
        if (!this.art.jue) {
          this.dayMessage[x].hrJue = null
        } else {
          this.dayMessage[x].hrJue = this.art.hrJue;
        }
        if (!this.art.vie) {
          this.dayMessage[x].hrVie = null
        } else {
          this.dayMessage[x].hrVie = this.art.hrVie;
        }
        if (!this.art.sab) {
          this.dayMessage[x].hrSab = null
        } else {
          this.dayMessage[x].hrSab = this.art.hrSab;
        }
        if (!this.art.dom) {
          this.dayMessage[x].hrDom = null
        } else {
          this.dayMessage[x].hrDom = this.art.hrDom;
        }

      }
    }
    this.cleanMessage();
  }

  cleanMessage() {

    this.disableUpdateBtn = true;
    this.art.typeMessage = null;
    this.art.message = null;
    this.art.agileDay = null;
    this.art.hrStartCamp = null;
    this.art.hrAgile = null;
    this.art.hrLun = null;
    this.art.hrMar = null;
    this.art.hrMie = null;
    this.art.hrJue = null;
    this.art.hrVie = null;
    this.art.hrSab = null;
    this.art.hrDom = null;
    this.art.lun = null;
    this.art.mar = null;
    this.art.mie = null;
    this.art.jue = null;
    this.art.vie = null;
    this.art.sab = null;
    this.art.dom = null;

  }

  groups: any = [];
  itemsGroups: any = [];
  getGroups() {

    this.authService.getGroup()
      .then(data => {
        this.groups = data;
        this.itemsGroups = this.groups.items;
      });
  }

  eventsManager = [];
  saveEvent() {

    this.eventsManager.push({
      idEventTyT: +this.art.event,
      startEventAmount: +this.art.amount,
      endEventAmount: +this.art.amount,
      prizeCpeProductId: +this.art.prize,
      multiplier: 1
    });

  }

  notifications = [];
  schedules = [];

  dayManager() {

    let dayMessageCopy = this.dayMessage;
    for (let i = 0; i < dayMessageCopy.length; i++) {
      if (dayMessageCopy[i].typeMessage != null && dayMessageCopy[i].message != null) {
        for (let a = 0; a < 7; a++) {
          if (dayMessageCopy[i].lun) {

            let hrStart = (this.getLocaleTimeFormat(dayMessageCopy[i].hrLun)).substring(0, 2);
            let hrEnd = (this.getLocaleTimeFormat(dayMessageCopy[i].hrLun)).substring(3, 5);
            this.schedules[a] = {
              "weekday": "MON",
              "startHour": +hrStart,
              "startMinutes": +hrEnd
            };
            dayMessageCopy[i].lun = false;

          } else if (dayMessageCopy[i].mar) {
            let hrStart = (this.getLocaleTimeFormat(dayMessageCopy[i].hrMar)).substring(0, 2);
            let hrEnd = (this.getLocaleTimeFormat(dayMessageCopy[i].hrMar)).substring(3, 5);
            this.schedules[a] = {
              "weekday": "TUE",
              "startHour": +hrStart,
              "startMinutes": +hrEnd
            };
            dayMessageCopy[i].mar = false;

          } else if (dayMessageCopy[i].mie) {
            let hrStart = (this.getLocaleTimeFormat(dayMessageCopy[i].hrMie)).substring(0, 2);
            let hrEnd = (this.getLocaleTimeFormat(dayMessageCopy[i].hrMie)).substring(3, 5);
            this.schedules[a] = {
              "weekday": "WED",
              "startHour": +hrStart,
              "startMinutes": +hrEnd
            };
            dayMessageCopy[i].mie = false;

          } else if (dayMessageCopy[i].jue) {
            let hrStart = (this.getLocaleTimeFormat(dayMessageCopy[i].hrJue)).substring(0, 2);
            let hrEnd = (this.getLocaleTimeFormat(dayMessageCopy[i].hrJue)).substring(3, 5);
            this.schedules[a] = {
              "weekday": "THU",
              "startHour": +hrStart,
              "startMinutes": +hrEnd
            };
            dayMessageCopy[i].jue = false;

          } else if (dayMessageCopy[i].vie) {
            let hrStart = (this.getLocaleTimeFormat(dayMessageCopy[i].hrVie)).substring(0, 2);
            let hrEnd = (this.getLocaleTimeFormat(dayMessageCopy[i].hrVie)).substring(3, 5);
            this.schedules[a] = {
              "weekday": "FRI",
              "startHour": +hrStart,
              "startMinutes": +hrEnd
            };
            dayMessageCopy[i].vie = false;

          } else if (dayMessageCopy[i].sab) {
            let hrStart = (this.getLocaleTimeFormat(dayMessageCopy[i].hrSab)).substring(0, 2);
            let hrEnd = (this.getLocaleTimeFormat(dayMessageCopy[i].hrSab)).substring(3, 5);
            this.schedules[a] = {
              "weekday": "SAT",
              "startHour": +hrStart,
              "startMinutes": +hrEnd
            };
            dayMessageCopy[i].sab = false;

          } else if (dayMessageCopy[i].dom) {
            let hrStart = (this.getLocaleTimeFormat(dayMessageCopy[i].hrDom)).substring(0, 2);
            let hrEnd = (this.getLocaleTimeFormat(dayMessageCopy[i].hrDom)).substring(3, 5);
            this.schedules[a] = {
              "weekday": "SUN",
              "startHour": +hrStart,
              "startMinutes": +hrEnd
            };
            dayMessageCopy[i].dom = false;

          }
        }
        if (dayMessageCopy[i].hrStartCamp != null) {
          let hrStart = (this.getLocaleTimeFormat(dayMessageCopy[i].hrStartCamp)).substring(0, 2);
          let hrEnd = (this.getLocaleTimeFormat(dayMessageCopy[i].hrStartCamp)).substring(3, 5);
          this.schedules[0] = {
            "weekday": "ANY",
            "startHour": +hrStart,
            "startMinutes": +hrEnd
          };
        }
        this.notifications[i] = {
          "notificationType": dayMessageCopy[i].typeMessage,
          "body": dayMessageCopy[i].message,
          "schedules": this.schedules
        }

        if (dayMessageCopy[i].hrLun != null) {
          dayMessageCopy[i].lun = true;
        } if (dayMessageCopy[i].hrMar != null) {
          dayMessageCopy[i].mar = true;
        } if (dayMessageCopy[i].hrMie != null) {
          dayMessageCopy[i].mie = true;
        } if (dayMessageCopy[i].hrJue != null) {
          dayMessageCopy[i].jue = true;
        } if (dayMessageCopy[i].hrVie != null) {
          dayMessageCopy[i].vie = true;
        } if (dayMessageCopy[i].hrSab != null) {
          dayMessageCopy[i].sab = true;
        } if (dayMessageCopy[i].hrDom != null) {
          dayMessageCopy[i].dom = true;
        }

        this.schedules = [];
      }
    }
  }

  event: any = [];
  eventProduct: any = [];
  getEventProduct() {

    this.authService.getEventProduct()
      .then(data => {
        this.event = data;
        this.eventProduct = this.event.items;
      });
  }

  getAmount() {

    this.createCampaignFormValidator.event.empty = '';
    this.clearArrayAmount()
    for (let x = 0; x < this.eventProduct.length; x++)
      if (this.eventProduct[x].id == this.art.event) {
        this.amountList = this.eventProduct[x].params.amount.value;
        this.art.amount = this.amountList;
        return;
      }
  }

  prize: any = [];
  itemsPrize: any = [];

  getEventPrize() {

    this.authService.getEventPrize()
      .then(data => {
        this.prize = data;
        this.itemsPrize = this.prize.items;
      });
  }

  exacaster: any = [];
  itemsExacaster: any = [];
  getExacaster() {

    this.authService.getExacaster()
      .then(data => {
        this.exacaster = data;
        this.itemsExacaster = this.exacaster.items;
      });
  }


  getPropertiesExa() {

    this.createCampaignFormValidator.idExa.empty = '';
    for (let x = 0; x < this.itemsExacaster.length; x++)
      if (this.itemsExacaster[x].id == this.art.idExa) {
        this.instanceAct = this.itemsExacaster[x].currentInstanceId;
        this.instanceName = this.itemsExacaster[x].currentInstanceName;
        this.instanceDesc = this.itemsExacaster[x].currentInstanceDsc;
        this.instanceIn = this.getDateFormat(this.itemsExacaster[x].currentInstanceStart);
        this.instanceEnd = this.getDateFormat(this.itemsExacaster[x].currentInstanceEnd);
        this.instanceCon = this.itemsExacaster[x].currentControlSize;
        this.instanceObj = this.itemsExacaster[x].currentTargetSize;
        return;
      }
  }

  getSummary() {

    this.art.excludeNotifUpsellFramework = this.getExcludeUFW(this.art.excludeNotifUpsellFramework);
    this.summaryName = this.art.name;
    for (let i = 0; i < this.itemsGroups.length; i++) {
      if (this.itemsGroups[i].id == this.art.group) {
        this.summaryGroup = this.itemsGroups[i].name;
      }
    }
    this.summaryDateSt = this.getDateFormat(this.mydate1);
    this.summaryDateEn = this.getDateFormat(this.mydate2);
    this.summaryTypeBd = this.art.typeBase;
    if (this.art.excludeNotifUpsellFramework) {
      this.summaryExclu = "SI";
    } else { this.summaryExclu = "NO"; }

    for (let i = 0; i < this.itemsExacaster.length; i++) {
      if (this.itemsExacaster[i].id == this.art.idExa) {
        this.summaryExa = this.itemsExacaster[i].name;
      }
    }
    for (let i = 0; i < this.eventProduct.length; i++) {
      if (this.eventProduct[i].id == this.art.event) {
        this.summaryEven = this.eventProduct[i].label;
      }
    }
    this.summaryAmou = this.art.amount;
    for (let i = 0; i < this.itemsPrize.length; i++) {
      if (this.itemsPrize[i].id == this.art.prize) {
        this.summaryPriz = this.itemsPrize[i].label;
      }
    }
  }

  getDateFormat(data) {

    if (data != '' && data != null) {
      let date = new Date(Date.parse(data));
      let month = (date.getMonth() + 1)
      return date.getDate() + "/" + month + "/" + date.getFullYear() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ":" + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    } else return '';
  }

  getLocaleTimeFormat(data) {

    if (data.length > 8 || data.length == undefined) {
      let date = new Date(Date.parse(data));
      return (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ":" + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    } else { return data; }
  }

  getTimerFormat(data) {

    if (data != '' && data != null) {
      let date = new Date(Date.parse(data));
      if (date.getHours() < 8 || date.getHours() > 20) {
        this.alertService.errorCreateCampDate("Hora debe estar entre 8 am y 8 pm")
        return '';
      } else {
        return (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ":" + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
      }
    } else return '';
  }

  disabledHrStartCamp: boolean = true;
  disabledHrAgile: boolean = true;
  typeNotification() {

    this.saveNotification();

    if (this.art.typeMessage == "REMINDER") {
      this.disabledNotifi = false;
      this.disabledHrStartCamp = true;
      this.art.hrStartCamp = null;

    } else if (this.art.typeMessage == "START" || this.art.typeMessage == "END") {
      this.cleanNotifReminder();
      this.disabledHrStartCamp = false;
      this.disabledNotifi = true;
      this.disabledHrAgile = true;

    } else {
      this.disabledNotifi = true;
      this.disabledHrStartCamp = true;
      this.disabledHrAgile = true;
    }
  }

  agileDay() {

    if (this.art.agileDay == "7") {
      this.art.lun = true;
      this.art.mar = true;
      this.art.mie = true;
      this.art.jue = true;
      this.art.vie = true;
      this.art.sab = true;
      this.art.dom = true;
      this.disabledHrAgile = false;
    } else if (this.art.agileDay == "5") {
      this.art.lun = true;
      this.art.mar = true;
      this.art.mie = true;
      this.art.jue = true;
      this.art.vie = true;
      this.art.hrSab = null;
      this.art.sab = false;
      this.art.hrDom = null;
      this.art.dom = false;
      this.disabledHrAgile = false;
    } else if (this.art.agileDay == "3") {
      this.art.lun = true;
      this.art.hrMar = null;
      this.art.mar = false;
      this.art.mie = true;
      this.art.hrJue = null;
      this.art.jue = false;
      this.art.vie = true;
      this.art.hrSab = null;
      this.art.sab = false;
      this.art.hrDom = null;
      this.art.dom = false;
      this.disabledHrAgile = false;
    }
  }

  agileHour() {

    let timeDefault = this.getTimerFormat(this.art.hrAgile);
    this.timerAgile = timeDefault;

    if (this.art.lun) {
      this.art.hrLun = timeDefault;
    }
    if (this.art.mar) {
      this.art.hrMar = timeDefault;
    }
    if (this.art.mie) {
      this.art.hrMie = timeDefault;
    }
    if (this.art.jue) {
      this.art.hrJue = timeDefault;
    }
    if (this.art.vie) {
      this.art.hrVie = timeDefault;
    }
    if (this.art.sab) {
      this.art.hrSab = timeDefault;
    }
    if (this.art.dom) {
      this.art.hrDom = timeDefault;
    }
  }

  notificationHour() {

    this.timeNotifStartEnd = this.getTimerFormat(this.art.hrStartCamp);
  }

  saveNotification() {

    if (this.art.typeMessage != null && this.art.message != null && this.art.message != ''
      && this.art.message.length >= 5) {
      this.disabledSaveBtn = false;
    } else { this.disabledSaveBtn = true; }
  }

  cleanNotifReminder() {

    this.art.agileDay = null;
    this.art.hrAgile = null;
    this.art.hrLun = null;
    this.art.hrMar = null;
    this.art.hrMie = null;
    this.art.hrJue = null;
    this.art.hrVie = null;
    this.art.hrSab = null;
    this.art.hrDom = null;
    this.art.lun = null;
    this.art.mar = null;
    this.art.mie = null;
    this.art.jue = null;
    this.art.vie = null;
    this.art.sab = null;
    this.art.dom = null;

  }

  validateDateStart() {

    let dateLocal = new Date();
    let dateForm = new Date(Date.parse(this.mydate1));
    if (dateLocal > dateForm || dateLocal.getTime() == dateForm.getTime() || this.mydate1 == null) {
      this.mydate1 = null;
      return false;
    } else return true;
  }

  validateDateEnd() {

    let dateStart = new Date(Date.parse(this.mydate1));
    let dateEnd = new Date(Date.parse(this.mydate2));
    if (!this.validateDateStart()) {
      this.alertService.errorCreateCampDate("Verifique que hora inicio sea mayor a hora actual")
      return false;
    }
    else if (dateStart > dateEnd || dateStart.getTime() == dateEnd.getTime()) {
      this.mydate2 = null;
      this.alertService.errorCreateCampDate("Verifique que fecha/hora final sea mayor a fecha/hora inicial")
      return false;
    } else if (dateStart.getHours() < 8 || dateStart.getHours() > 20) {
      this.alertService.errorCreateCampDate("Hora inicio debe estar entre 8 am y 8 pm")
      return false;
    } else if (dateEnd.getHours() < 8 || dateEnd.getHours() > 20) {
      this.alertService.errorCreateCampDate("Hora final debe estar entre 8 am y 8 pm")
      return false;
    }
    else return true;
  }

  clearArrayAmount() {

    this.art.amount = null;
    this.amountList = null;
  }

  clearCreateCampaign() {

    this.clearArrayAmount();
    this.art.idExa = null;
    this.instanceAct = null;
    this.instanceName = null;
    this.instanceDesc = null;
    this.instanceIn = null;
    this.instanceEnd = null;
    this.instanceCon = null;
    this.instanceObj = null;
    this.summaryName = null;
    this.summaryGroup = null;
    this.summaryDateSt = null;
    this.summaryDateEn = null;
    this.summaryTypeBd = null;
    this.summaryExclu = null;
    this.summaryExa = null;
    this.summaryEven = null;
    this.summaryPriz = null;
    this.summaryAmou = null;
    this.dayMessage = [];

  }

  getExcludeUFW(data) {

    if (data) {
      return data;
    } return false;
  }

  validateFieldsForm() {

    let nameRegex: RegExp = /(?!^\d+$)^.[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s(),.-/&]{4,30}$/
    let messageRegex: RegExp = /(?!^\d+$)^.[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s(),-:;!¡?¿"'./&]{4,200}$/
    this.validationsCreateCampaign_form = this.formBuilder.group({
      'name': [null, [Validators.pattern(nameRegex), Validators.required]],
      'group': [null, [Validators.required]],
      'dateStart': [null, [Validators.required]],
      'dateEnd': [null, [Validators.required]],
      'excludeNotifUpsellFramework': [null],
      'typeBase': [null, [Validators.required]],
      'idExa': [null],
      'event': [null, [Validators.required]],
      'amount': [null, []],
      'prize': [null, [Validators.required]],
      'typeMessage': [null],
      'message': [null, [Validators.pattern(messageRegex)]],
      'agileDay': [null],
      'hrAgile': [null],
      'hrStartCamp': [null],
      'lun': [null],
      'hrLun': [null],
      'mar': [null],
      'hrMar': [null],
      'mie': [null],
      'hrMie': [null],
      'jue': [null],
      'hrJue': [null],
      'vie': [null],
      'hrVie': [null],
      'sab': [null],
      'hrSab': [null],
      'dom': [null],
      'hrDom': [null]
    });
  }

  validation_messages = {
    'name': [
      { type: 'pattern', message: 'No debe tener caracteres especiales, ni una longitud mayor de 30' },
      { type: 'required', message: 'Ingrese el nombre de la Campaña' }
    ],
    'group': [
      { type: 'required', message: 'Seleccione un Grupo' }
    ],
    'subCategory': [
      { type: 'required', message: 'Seleccione una SubCategoria' }
    ],
    'dateStart': [
      { type: 'required', message: 'Ingrese Fecha de Inicio' }
    ],
    'dateEnd': [
      { type: 'required', message: 'Ingrese Fecha de Finalizacion' }
    ],
    'excludeNotifUpsellFramework': [
      { type: 'required', message: 'Selecione' }
    ],
    'typeBase': [
      { type: 'required', message: 'Seleccione Tipo de Base' }
    ],
    'idExa': [
      { type: 'required', message: 'Seleccione Exacaster' }
    ],
    'event': [
      { type: 'required', message: 'Seleccione un Evento' }
    ],
    'amount': [
      { type: 'required', message: 'Seleccione un Monto' }
    ],
    'prize': [
      { type: 'required', message: 'Seleccione un Premio' }
    ],
    'typeMessage': [
      { type: 'required', message: 'Seleccione un tipo de Notificacion' }
    ],
    'message': [
      { type: 'pattern', message: 'Estructura SMS no valida o Verifique longitud' },
      { type: 'required', message: 'Ingrese mensaje de Notificacion' }
    ],
    'agileDay': [],
    'hrStartCamp': [],
    'hrAgile': [],
    'lun': [],
    'hrLun': [],
    'mar': [],
    'hrMar': [],
    'mie': [],
    'hrMie': [],
    'jue': [],
    'hrJue': [],
    'vie': [],
    'hrVie': [],
    'sab': [],
    'hrSab': [],
    'dom': [],
    'hrDom': []
  }

  createCampaignFormValidator = {
    name: {
      empty: '',
    },
    group: {
      empty: '',
    },
    dateStart: {
      empty: '',
    },
    dateEnd: {
      empty: '',
    },
    excludeNotifUpsellFramework: {
      empty: '',
    },
    typeBase: {
      empty: '',
    },
    idExa: {
      empty: '',
    },
    event: {
      empty: '',
    },
    prize: {
      empty: '',
    }
  };

  slideFirstValidator(): boolean {

    if (this.disablePrevBtn) {
      if (this.validationsCreateCampaign_form.value.name == null || this.validationsCreateCampaign_form.value.name == '') {
        this.validationsCreateCampaign_form.value.name = '';
      } if (this.validationsCreateCampaign_form.value.group == null || this.validationsCreateCampaign_form.value.group == '') {
        this.validationsCreateCampaign_form.value.group = '';
      }
      if (this.validationsCreateCampaign_form.value.dateStart == null || this.validationsCreateCampaign_form.value.dateStart == '') {
        this.validationsCreateCampaign_form.value.dateStart = '';
      } if (this.validationsCreateCampaign_form.value.dateEnd == null || this.validationsCreateCampaign_form.value.dateEnd == '') {
        this.validationsCreateCampaign_form.value.dateEnd = '';
      }
      if (this.validationsCreateCampaign_form.value.idExa == null || this.validationsCreateCampaign_form.value.idExa == '') {
        this.validationsCreateCampaign_form.value.idExa = '';
      }

      if (validator.isEmpty(this.validationsCreateCampaign_form.value.name)) {
        this.createCampaignFormValidator.name.empty = ' ';
      } else {
        this.createCampaignFormValidator.name.empty = '';
      }

      if (validator.isEmpty(this.validationsCreateCampaign_form.value.group)) {
        this.createCampaignFormValidator.group.empty = ' ';
      } else {
        this.createCampaignFormValidator.group.empty = '';
      }

      if (validator.isEmpty(this.getDateFormat(this.validationsCreateCampaign_form.value.dateStart))) {
        this.createCampaignFormValidator.dateStart.empty = ' ';
      } else {
        this.createCampaignFormValidator.dateStart.empty = '';
      }

      if (validator.isEmpty(this.getDateFormat(this.validationsCreateCampaign_form.value.dateEnd))) {
        this.createCampaignFormValidator.dateEnd.empty = ' ';
      } else {
        this.createCampaignFormValidator.dateEnd.empty = '';
      }

      if (this.validationsCreateCampaign_form.value.excludeNotifUpsellFramework) {
        this.createCampaignFormValidator.excludeNotifUpsellFramework.empty = ' ';
      } else {
        this.createCampaignFormValidator.excludeNotifUpsellFramework.empty = '';
      }

      if (validator.isEmpty(this.validationsCreateCampaign_form.value.idExa)) {
        this.createCampaignFormValidator.idExa.empty = ' ';
      } else {
        this.createCampaignFormValidator.idExa.empty = '';
      }
      if (this.createCampaignFormValidator.name.empty == ' ' ||
        this.createCampaignFormValidator.group.empty == ' ' ||
        this.createCampaignFormValidator.dateStart.empty == ' ' ||
        this.createCampaignFormValidator.dateEnd.empty == ' ' ||
        this.createCampaignFormValidator.excludeNotifUpsellFramework.empty == ' ' ||
        this.createCampaignFormValidator.idExa.empty == ' ') {
        return false
      } else return true;

    } else {

      if (this.validationsCreateCampaign_form.value.typeBase == null || this.validationsCreateCampaign_form.value.typeBase == '') {
        this.validationsCreateCampaign_form.value.typeBase = '';
      }
      if (this.validationsCreateCampaign_form.value.event == null || this.validationsCreateCampaign_form.value.event == '') {
        this.validationsCreateCampaign_form.value.event = '';
      }

      if (this.validationsCreateCampaign_form.value.prize == null || this.validationsCreateCampaign_form.value.prize == '') {
        this.validationsCreateCampaign_form.value.prize = '';
      }

      if (validator.isEmpty(this.validationsCreateCampaign_form.value.typeBase)) {
        this.createCampaignFormValidator.typeBase.empty = ' ';
      } else {
        this.createCampaignFormValidator.typeBase.empty = '';
      }

      if (validator.isEmpty(this.validationsCreateCampaign_form.value.event)) {
        this.createCampaignFormValidator.event.empty = ' ';
      } else {
        this.createCampaignFormValidator.event.empty = '';
      }

      if (validator.isEmpty(this.validationsCreateCampaign_form.value.prize)) {
        this.createCampaignFormValidator.prize.empty = ' ';
      } else {
        this.createCampaignFormValidator.prize.empty = '';
      }

      if (this.createCampaignFormValidator.typeBase.empty == ' ' ||
        this.createCampaignFormValidator.event.empty == ' ' ||
        this.createCampaignFormValidator.prize.empty == ' ') {
        return false
      } else return true;
    }
  }

  obtainDateStart() {

    if (this.mydate1 != null) {
      this.currentDate = this.getDateFormat(this.mydate1);
      this.createCampaignFormValidator.dateStart.empty = '';
    } else this.currentDate = null;
  }

  obtainDateEnd() {

    if (this.mydate2 != null) {
      this.currentDate2 = this.getDateFormat(this.mydate2);
      this.createCampaignFormValidator.dateEnd.empty = '';
    } else this.currentDate2 = null;
  }

  moveCursorToEnd() {

    const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (isIEOrEdge) {
      const textarea = (<HTMLInputElement>document.getElementById('message'));
      const existingText = textarea.value;
      if (textarea.value.length === 0) {
        textarea.value = 'a';
        textarea.value = '';
      } else {
        textarea.value = '';
        textarea.value = existingText;
      }
    }
  }

}