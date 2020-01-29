export interface Campaign {

    typeGroup:number;
    idExa: number;
    nameCamp: string;
    typeBase: number;
    category: string;
    subCategory: string;
    dateStart: Date;
    dateEnd: Date;
    recurrency:number;
    observation:string;
    event: string;
    prize: string;    
    amount: string;
    description: string;
    inductorMessage: string;
    product: string;
    reminderMessage: string;
    provisioningMessage: string;
    campaignEndMessage: string;
    typeMessage: string;
    message: string;
    lun: boolean;
    hrLun: string;
    mar: boolean;
    hrMar: string;
    mier: boolean;
    hrMier: string;
    jue: boolean;
    hrJue: string;
    vie: boolean;
    hrVie: string;
    sab: boolean;
    hrSab: string;
    dom: boolean;
    hrDom: string;
    

}