import { Injectable } from '@angular/core';
import { HumanBody } from './human-body';

@Injectable({
  providedIn: 'root'
})
export class HumanBodyService {
  humanBody: HumanBody[] = [];

  constructor() {
    this.humanBody.push(
      new HumanBody(
        'muškarac',
        1,
        0.7,
        0.0064,
        0.4,
        0.048,
        0.5,
        0.063,
        1,
        0.0154,
        'https://itis.swiss/assets/images/Virtual-Population/V3.x/Dukev2.gif'
      ),
      new HumanBody(
        'žena',
        2,
        0.67,
        0.0058,
        0.37,
        0.044,
        0.5,
        0.061,
        1.01,
        0.084,
        'https://itis.swiss/assets/images/Virtual-Population/V3.x/Ellav2.gif'
      ),
      new HumanBody(
        'adolescent',
        3,
        0.7,
        0.0054,
        0.38,
        0.046,
        0.5,
        0.063,
        1.05,
        0.0179,
        'https://itis.swiss/assets/images/Virtual-Population/V3.x/Louisv2.gif'
      ),
      new HumanBody(
        'dijete',
        4,
        0.32,
        0.0016,
        0.27,
        0.022,
        0.33,
        0.027,
        0.6,
        0.0025,
        'https://itis.swiss/assets/images/Virtual-Population/V3.x/Theloniousv2.gif'
      )
    );
  }
}
/*  id: number;
    duljinaRuke: number;
    presjekRuke: number;
    duljinaGornjegDijelaTrupa:number;
    presjekGornjegDijelatrupa: number;
    duljinaTrupa:number;
    presjekTrupa:number;
    duljinaNoge:number;
    presjekNoge:number;
    slika:string;
 */
