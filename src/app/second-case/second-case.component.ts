import { Component, ViewChild } from '@angular/core';
import { VoltageService } from '../shared/voltage.service';
import { Voltage } from '../shared/voltage';
import { HumanBodyService } from '../shared/human-body.service';
import { HumanBody } from '../shared/human-body';
import { calculationHelper } from '../shared/second-calculation-helper';
import { SecondChartComponent } from '../second-chart/second-chart.component';

@Component({
  templateUrl: './second-case.component.html',
  styleUrls: ['./second-case.component.css']
})
export class SecondCaseComponent {
  @ViewChild('chart') chartRef: SecondChartComponent;

  I: number;
  armEnergyDensity: number;
  bodyEnergyDensity: number;
  legEnergyDensity: number;
  frequency: number;
  result = false;
  chart = false;
  message = false;

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
    const userFrequency = parseInt(frequency, 10);
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

    const calculation = calculationHelper(
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

  showResult(frequency) {
  if (frequency) {
    this.result = true;
    this.message = false;
  } else {
    this.result = false;
    this.message = true;
  }
}

showChart(frequency) {
  if (frequency) {
    this.chart = true;
  } else {
    this.chart = false;
  }
  }
}
