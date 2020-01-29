import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, IonSearchbar } from '@ionic/angular';
import { ModifiedcampaignPage } from '../modifiedcampaign/modifiedcampaign.page';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../auth/alert.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var $;

@Component({
  selector: 'app-admincampaign',
  templateUrl: './admincampaign.page.html',
  styleUrls: ['./admincampaign.page.scss'],
})
export class AdmincampaignPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private navController: NavController,
    private alertService: AlertService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

  ) {
    this.initializePage();
  }

  initializePage() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.authService.isAuth() != null || !this.authService.isTokenExpired()) {
        this.navController.navigateRoot(['admincampaign']);
      } else {
        this.navController.navigateRoot(['login']);
      }
    });
  }

  ngOnInit(): void {
    
    this.alertService.present();
    this.getGroup();
    this.getCampaign();
  }

  campaign: any = [];
  itemsCampaign: any = [];
  getCampaign() {

    this.authService.getCampaign(this.alertService)
      .then(data => {
        this.campaign = data;

        for (let i = 0; i < this.campaign.items.length; i++) {
          this.campaign.items[i].start = this.getDateFormat(this.campaign.items[i].start);
          this.campaign.items[i].end = this.getDateFormat(this.campaign.items[i].end);
          this.campaign.items[i].creationDate = this.getDateFormat(this.campaign.items[i].creationDate);
          this.campaign.items[i].updateDate = this.getDateFormat(this.campaign.items[i].updateDate);
        }
        this.itemsCampaign = this.campaign.items;
        this.getDataTable(this.itemsCampaign);
      });
  }


  dataTable: any = [];
  getDataTable(itemsCampaign) {

    this.dataTable = [];
    for (let i = 0; i < itemsCampaign.length; i++) {
      this.dataTable.push({
        id: itemsCampaign[i].id,
        name: itemsCampaign[i].name,
        groupId: this.getNameGroup(itemsCampaign[i].groupId),
        exTemplateId: itemsCampaign[i].exTemplateId,
        start: itemsCampaign[i].start,
        end: itemsCampaign[i].end,
        databaseType: itemsCampaign[i].databaseType,
        scheduleStatus: this.getStatusLenguage(itemsCampaign[i].scheduleStatus),
        creationDate: itemsCampaign[i].creationDate,
        updateDate: itemsCampaign[i].updateDate,
        lastUpdateUser: itemsCampaign[i].lastUpdateUser,
      });
    }
    $(() => {
      setTimeout(function () {
        $(function () {

          $('#tableAdmin thead tr').clone(true).appendTo('#tableAdmin thead');
          $('#tableAdmin thead tr:eq(1) th').each(function (i) {
            var title = $(this).text();
            $(this).html('<input type="text" placeholder="Buscar ' + title + '" />');
            $('input', this).on('keyup change', function () {
              if (table.column(i).search() !== this.value) {
                table
                  .column(i)
                  .search(this.value)
                  .draw();
              }
            });
          });
          var table = $('#tableAdmin').DataTable({
            "paging": true,
            "ordering": true,
            "info": true,
            "scrollX": true,
            orderCellsTop: true,
            fixedHeader: true,
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
              }
            }, "columnDefs": [
              {
                "width": "5%",
                "targets": [0],
                "className": "bolded"
              },
              {
                "width": "5%",
                "targets": [1],
                "className": "fontTable"
              },
              {
                "width": "5%",
                "targets": [2],
                "className": "fontTable"
              },
              {
                "width": "5%",
                "targets": [3],
                "className": "fontTable",
                "visible": false,
                "searchable": false
              },
              {
                "width": "5%",
                "targets": [4],
                "className": "fontTable",
                "visible": false
              },
              {
                "width": "5%",
                "targets": [5],
                "className": "fontTable",
                "visible": false,
                "searchable": false
              },
              {
                "width": "5%",
                "targets": [6],
                "className": "fontTable"
              },
              {
                "width": "5%",
                "targets": [7],
                "className": "fontTable",
                "visible": false
              },
              {
                "width": "5%",
                "targets": [8],
                "className": "fontTable",
                "visible": false,
                "searchable": false
              },
              {
                "width": "5%",
                "targets": [9],
                "className": "fontTable",
                "visible": false
              },
              {
                "width": "5%",
                "targets": [10],
                "className": "bolded"
              }
            ], "autoWidth": true

          });
          $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();

            var column = table.column($(this).attr('data-column'));
            column.visible(!column.visible());
          });
        });
      }, 1000);
    });
    setTimeout(() => this.alertService.dismiss(), 2000);
  }

  groups: any = [];
  itemsGroups: any = [];
  getGroup() {

    this.authService.getGroup()
      .then(data => {
        this.groups = data;
        this.itemsGroups = this.groups.items;
      });
  }

  getNameGroup(id) {

    for (let i = 0; i < this.itemsGroups.length; i++) {
      if (id == this.itemsGroups[i].id) {
        return this.itemsGroups[i].name
      }
    }
  }

  getStatusLenguage(status) {

    if (status == "PAUSED") {
      return "PAUSADO"
    }
    if (status == "STARTED") {
      return "INICIADO"
    }
    if (status == "DISABLED") {
      return "DESHABILITADO"
    }
  }

  getDateFormat(data) {

    if (data != null) {
      let date = new Date(Date.parse(data));
      let month = (+((date.getMonth() < 10 ? '0' : '') + date.getMonth()) + 1)
      return (date.getDate() < 10 ? '0' : '') + date.getDate() + "/" + month + "/" + date.getFullYear()
        + " " + (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '')
        + date.getMinutes() + ":" + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    } else return "";
  }

  modifiedMsgId;
  pause = {};
  start = {};
  startCampaign(campaign) {

    this.modifiedMsgId = +campaign.id;
    if (campaign.scheduleStatus == "PAUSADO" || campaign.scheduleStatus == "DESHABILITADO") {
      this.start = {
        id: +campaign.id,
        status: "start"
      }
      this.authService.MethodPutCampaign(this.start).subscribe((res) => {
      }, error => {
        this.alertService.errorAlert("No se logro iniciar campaña");
      },
        () => {
          this.alertService.presentToast("Se inicio la campaña")
          this.modifiedMessage("INICIADO");
          this.navController.navigateRoot('/admincampaign');
        }
      );
    } else if (campaign.scheduleStatus == "INICIADO") {
      this.pause = {
        id: +campaign.id,
        status: "pause"
      }
      this.authService.MethodPutCampaign(this.pause).subscribe((res) => {
      }, error => {
        this.alertService.errorAlert("No se logro pausar campaña");
      },
        () => {
          this.alertService.presentToast("Se pauso la campaña");
          this.modifiedMessage("PAUSADO");
          this.navController.navigateRoot('/admincampaign');
        }
      );
    }
  }

  modifiedMessage(data) {

    for (let x = 0; x < this.dataTable.length; x++) {
      if (this.dataTable[x].id == this.modifiedMsgId) {
        this.dataTable[x].scheduleStatus = data;
      }
    }
  }

  disable = {};
  disableCampaign(campaign) {

    this.modifiedMsgId = +campaign.id;
    if (campaign.scheduleStatus == "DESHABILITADO") {
      this.alertService.errorAlert("No se logro deshabilitar campaña");
    } else {
      this.disable = {
        id: +campaign.id,
        status: "disable"
      }
      this.authService.MethodPutCampaign(this.disable).subscribe((res) => {
      }, error => {
        this.alertService.errorAlert("No se logro deshabilitar campaña");
      },
        () => {
          this.alertService.presentToast("Se deshabilito la campaña")
          this.modifiedMessage("DESHABILITADO");
          this.navController.navigateRoot('/admincampaign');
        }
      );
    }
  }

  deleteCampaign(campaign) {

    this.authService.MethodDeleteCampaign(+campaign.id).subscribe((res) => {
    }, error => {
      this.alertService.errorAlert("No se logro eliminar campaña");
    },
      () => {

        for (let x = 0; x < this.dataTable.length; x++)
          if (this.dataTable[x].id == campaign.id) {
            this.dataTable.splice(x, 1);
          }
        this.alertService.presentToast("Se elimino la campaña")
        this.navController.navigateRoot('/admincampaign');
      }
    );
  }

  async mofifiedCampaign(campaign) {


      const modal = await this.modalCtrl.create({
        component: ModifiedcampaignPage,
        cssClass: 'custom-modal-css',
        mode:'ios',
        componentProps: {
          "paramID": +campaign.id
        }
      });
      modal.onDidDismiss().then((data) => {
        this.obtainCampaign(campaign)
      });
      return await modal.present();

   

  }

  updateCampaign: any = [];
  updateItemsCampaign: any = [];
  obtainCampaign(campaignModifiedId) {

    this.authService.getCampaign(this.alertService)
      .then(data => {
        this.updateCampaign = data;

        for (let i = 0; i < this.updateCampaign.items.length; i++) {
          if (this.updateCampaign.items[i].id == campaignModifiedId.id) {
            this.updateCampaign.items[i].start = this.getDateFormat(this.updateCampaign.items[i].start);
            this.updateCampaign.items[i].end = this.getDateFormat(this.updateCampaign.items[i].end);
            this.updateCampaign.items[i].creationDate = this.getDateFormat(this.updateCampaign.items[i].creationDate);
            this.updateCampaign.items[i].updateDate = this.getDateFormat(this.updateCampaign.items[i].updateDate);
            this.updateItemsCampaign = this.updateCampaign.items[i];
            this.updateDatatable(this.updateItemsCampaign);
          }
        }
      });
  }

  updateDatatable(data) {

    for (let x = 0; x < this.dataTable.length; x++) {
      if (this.dataTable[x].id == data.id) {

        this.dataTable[x].name = data.name,
          this.dataTable[x].groupId = this.getNameGroup(data.groupId),
          this.dataTable[x].exTemplateId = data.exTemplateId,
          this.dataTable[x].start = data.start,
          this.dataTable[x].end = data.end,
          this.dataTable[x].databaseType = data.databaseType,
          this.dataTable[x].scheduleStatus = this.getStatusLenguage(data.scheduleStatus),
          this.dataTable[x].creationDate = data.creationDate,
          this.dataTable[x].updateDate = data.updateDate,
          this.dataTable[x].lastUpdateUser = data.lastUpdateUser
      }
    }
  }

}
