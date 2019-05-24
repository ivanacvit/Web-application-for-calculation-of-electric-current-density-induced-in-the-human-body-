import { Component, ViewChild } from "@angular/core";
import { VoltageService } from "../shared/voltage.service";
import { Voltage } from "../shared/voltage";
import { HumanBodyService } from "../shared/human-body.service";
import { HumanBody } from "../shared/human-body";
import { calculate } from "../shared/second-calculation-helper";
import { SecondChartComponent } from "../second-chart/second-chart.component";

@Component({
  templateUrl: "./second-case.component.html",
  styleUrls: ["./second-case.component.css"]
})
export class SecondCaseComponent {
  @ViewChild("chart") chartRef: SecondChartComponent;

  I: number;
  armEnergyDensity: number;
  bodyEnergyDensity: number;
  legEnergyDensity: number;
  frequency: number;
  result = false;
  chart = false;
  message=false;
  
  voltages: Voltage[];
  selectedVoltageIndex: number;
  humanBody: HumanBody[];
  selectedHumanBodyId: number;

  u: number;
  r1: number;
  c1: number;
  r2: number;
  c2: number;
  armLength: number;
  armSurface: number;
  bodyLength: number;
  bodySurface: number;
  legLength: number;
  legSurface: number;
  dataReady = false;

  constructor(
    private voltagesService: VoltageService,
    private humanBodyService: HumanBodyService
  ) {
    this.voltages = voltagesService.voltages;
    this.humanBody = humanBodyService.humanBody;
  }

  onSelectionChange(newValue: string) {
    this.selectedVoltageIndex = parseInt(newValue, 10);
  }

  clickOnImage(newValue: string) {
    this.selectedHumanBodyId = parseInt(newValue, 10);
  }

  calculate(frequency) {
    const userFrequency = parseInt(frequency);
    this.u = this.voltages[this.selectedVoltageIndex].U;
    this.r1 = this.voltages[this.selectedVoltageIndex].R1;
    this.c1 = this.voltages[this.selectedVoltageIndex].C1;
    this.r2 = this.voltages[this.selectedVoltageIndex].R2;
    this.c2 = this.voltages[this.selectedVoltageIndex].C2;

    const selectedImage = this.humanBody.find(
      el => el.id === this.selectedHumanBodyId
    );
    this.armLength = selectedImage.armLength;
    this.armSurface = selectedImage.armSurface;
    this.bodyLength = selectedImage.bodyLength;
    this.bodySurface = selectedImage.bodySurface;
    this.legLength = selectedImage.legLength;
    this.legSurface = selectedImage.legSurface;
    this.dataReady = true;

    const calculation = calculate(
      userFrequency,
      this.u,
      this.r1,
      this.c1,
      this.r2,
      this.c2,
      this.armLength,
      this.armSurface,
      this.bodyLength,
      this.bodySurface,
      this.legLength,
      this.legSurface
    );
    this.I = calculation.I;
    this.armEnergyDensity = calculation.armEnergyDensity;
    this.bodyEnergyDensity = calculation.bodyEnergyDensity;
    this.legEnergyDensity = calculation.legEnergyDensity;
    if (!this.chartRef) {
      return;
    }
    this.chartRef.pushData();
  }

  /*izracunaj(frekvencija:number):void{
    const u = this.naponi[this.selectedNaponIndex].U;
    const r1 = this.naponi[this.selectedNaponIndex].R1;
    const c1 = this.naponi[this.selectedNaponIndex].C1;
    const r2 = this.naponi[this.selectedNaponIndex].R2;
    const c2 = this.naponi[this.selectedNaponIndex].C2;

    const selectedImage = this.mjereTijela.find(el => el.id === this.selectedMjeraTijelaId);
    console.log("id covjeka", selectedImage);

    const duljina_ruke=selectedImage.duljinaRuke;
    const presjek_ruke=selectedImage.presjekRuke;
    const duljina_trupa=selectedImage.duljinaTrupa;
    const presjek_trupa=selectedImage.presjekTrupa;
    const duljina_noge=selectedImage.duljinaNoge;
    const presjek_noge=selectedImage.presjekNoge;
    
    const otporRuke=duljina_ruke/(0.8*presjek_ruke);
    const otporTrupa=(duljina_trupa)/(0.52*presjek_trupa); 
    const otporNoge=(duljina_noge)/(0.8*presjek_noge);
    const ukupniOtpor=otporRuke + otporTrupa+(0.5*otporNoge);
    

    const Zc1=-1/(2*Math.PI*frekvencija*c1);
    const Z1_realni=(r1*Zc1*Zc1)/(r1*r1+Zc1*Zc1);
    const Z1_imaginarni=(r1*r1*Zc1)/(r1*r1+Zc1*Zc1);
  
    const Zc2=-1/(2*Math.PI*frekvencija*c2);
    const Z2_realni=(r2*Zc2*Zc2)/(r2*r2+Zc2*Zc2);
    const Z2_imaginarni=(r2*r2*Zc2)/(r2*r2+Zc2*Zc2);

    const Z_realni=2*Z1_realni + 2*Z2_realni + ukupniOtpor;
    const Z_imaginarni=2*Z1_imaginarni + 2*Z2_imaginarni;
   
    const Z=Math.sqrt(Z_realni*Z_realni + Z_imaginarni*Z_imaginarni);
    
    this.I=(u)/(Z);
    this.gustocaStrujeKrozRuku=(this.I)/(presjek_ruke);
    this.gustocaStrujeKrozTrup=(this.I)/(presjek_trupa);
    this.gustocaStrujeKrozNogu=(this.I)/(presjek_noge);
  }
*/
showResult(frequency) {
  if(frequency){
    this.result = true;
    this.message=false;
  }
  else{
    this.result=false;
    this.message=true;
  }
}

showChart(frequency) {
  if(frequency)
    this.chart = true;
  else
    this.chart=false;
}
}
