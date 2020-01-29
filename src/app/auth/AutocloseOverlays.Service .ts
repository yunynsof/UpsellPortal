import { Injectable, ViewChildren, QueryList } from '@angular/core';
import { IonRouterOutlet, ActionSheetController, PopoverController, ModalController, MenuController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AutocloseOverlaysService {
    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;

    constructor(
        private actionSheetCtrl: ActionSheetController,
        private popoverCtrl: PopoverController,
        private modalCtrl: ModalController,
        private menu: MenuController
    ) { }

    async trigger() {
        let a = 2;
        // close action sheet
        for (let i = 0; i < a; i++) {
            try {
                const element = await this.actionSheetCtrl.getTop();
                if (element) {
                    element.dismiss();

                }
            } catch (error) {
            }

            // close popover
            try {
                const element = await this.popoverCtrl.getTop();
                if (element) {
                    element.dismiss();

                }
            } catch (error) {
            }

            // close modal
            try {
                const element = await this.modalCtrl.getTop();
                if (element) {
                    element.dismiss();

                }
            } catch (error) {
                console.log(error);

            }

            // close side menua
            try {
                const element = await this.menu.getOpen();
                if (element !== null) {
                    this.menu.close();

                }
            } catch (error) {
            }
        } return;
    }
}
