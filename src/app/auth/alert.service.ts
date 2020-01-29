import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      mode: 'ios',
      color: 'medium'
    });
    toast.present();
  }

  async errorLogin(error) {
    if (error.status == 404) {
      const alert = await this.alertController.create({
        header: 'Error de Autenticación',
        subHeader: 'Usuario no registrado',
        message: 'Status: ' + error.status + ', Error: ' + error.statusText,
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();
    } else if (error.status == 0) {
      const alert = await this.alertController.create({
        header: 'Error de Conexión',
        message: 'Status: ' + error.status + ' Error:' + error.statusText,
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();
    } else if (error.status == 401) {
      const alert = await this.alertController.create({
        header: 'Error de Autenticación',
        subHeader: 'Contraseña no valida',
        message: 'Status: ' + error.status + ' Error: ' + error.statusText,
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'No se proceso peticion',
        message: 'Status: ' + error.status + ' Error: ' + error.statusText,
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async errorCreateCamp(error) {

    if (error.status == 0) {
      const alert = await this.alertController.create({
        header: 'Error de Conexión',
        message: 'Status: ' + error.status + ' Error:' + error.statusText,
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();

    } else {
      const alert = await this.alertController.create({
        header: 'Error de Creacion',
        subHeader: error.detail,
        message: 'No se pudo Crear Campaña: ' + error.reason,
        mode: 'ios',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  async errorCreateCampDate(data) {

    const alert = await this.alertController.create({
      header: 'Error de Fechas',
      subHeader: 'Verifique',
      message: data,
      mode: 'ios',
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorCreateGroup(error) {

    if (error.status == 0) {
      const alert = await this.alertController.create({
        header: 'Error de Conexión',
        message: 'Status: ' + error.status + ' Error:' + error.statusText,
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();

    } else if (error.status == 400) {

      const alert = await this.alertController.create({
        header: 'Error de Creacion',
        subHeader: 'Verifique',
        message: 'Verifique los campos nuevamente',
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();

    } else {
      const alert = await this.alertController.create({
        header: 'Error de Creacion',
        subHeader: 'Verifique',
        message: 'No se pudo crear Grupo de Campaña',
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();
    }
  }


  async errorAlert(error) {

    const alert = await this.alertController.create({
      header: 'Error de Guardado',
      subHeader: 'Verifique',
      mode: 'ios',
      message: error
    });

    await alert.present();
  }

  async errorConnection(header, message) {
    
    const alert = await this.alertController.create({
      header: 'Error de ' + header,
      subHeader: 'Intente nuevamente',
      message: message,
      mode: 'ios',
      buttons: ['OK']
    });

    await alert.present();
  }

  isLoading = false;
  async present() {

    this.isLoading = true;
    return await this.loadingController.create({
      spinner: "crescent",
      message: 'Por favor espere...',
      translucent: true,
      mode: 'ios',
      cssClass: 'custom-class custom-loading'

    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }
}
