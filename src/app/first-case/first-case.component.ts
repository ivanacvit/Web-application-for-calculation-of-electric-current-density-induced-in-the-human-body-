import { Component, ViewChild } from "@angular/core";
import { VoltageService } from "../shared/voltage.service";
import { Voltage } from "../shared/voltage";
import { HumanBodyService } from "../shared/human-body.service";
import { HumanBody } from "../shared/human-body";
import { calculate } from "../shared/first-calculation-helper";
import { ChartsComponent } from "../first-chart/first-chart.component";

@Component({
  templateUrl: "./first-case.component.html",
  styleUrls: ["./first-case.component.css"]
})
export class FirstCaseComponent {
  @ViewChild("chart") chartRef: ChartsComponent;

  I: number;
  armEnergyDensity: number;
  bodyEnergyDensity: number;
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
  upperBodyLength: number;
  upperBodySurface: number;
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
    this.upperBodyLength = selectedImage.upperBodyLength;
    this.upperBodySurface = selectedImage.upperBodySurface;
    //this.dataReady = true;

    const calculation = calculate(
      userFrequency,
      this.u,
      this.r1,
      this.c1,
      this.r2,
      this.c2,
      this.armLength,
      this.armSurface,
      this.upperBodyLength,
      this.upperBodySurface
    );
    this.I = calculation.I;
    this.armEnergyDensity = calculation.armEnergyDensity;
    this.bodyEnergyDensity = calculation.bodyEnergyDensity;

    console.log(
      "Izracunaj gustocaStrujeKrozRuku, gustocaStrujeKrozTrup:",
      this.armEnergyDensity,
      this.bodyEnergyDensity
    );
    if (!this.chartRef) {
      return;
    }
    this.chartRef.pushData();
  }

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