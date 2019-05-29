import { Component } from '@angular/core';
import { VoltageService } from '../shared/voltage.service';
import { Voltage } from '../shared/voltage';
import { HumanBodyService } from '../shared/human-body.service';
import { HumanBody } from '../shared/human-body';
import { SelectedElectricityProps } from '../second-case-shared/selected-electricity-props';

@Component({
  templateUrl: './second-case.component.html',
  styleUrls: ['./second-case.component.css']
})
export class SecondCaseComponent {
  I: number;
  armEnergyDensity: number;
  bodyEnergyDensity: number;
  legEnergyDensity: number;
  frequency: number;
  chart = false;
  enter = false;

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
  selectedElectricityProps: SelectedElectricityProps;

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

    this.selectedElectricityProps = {
      frequency: Number(frequency),
      u: this.u,
      r1: this.r1,
      c1: this.c1,
      r2: this.r2,
      c2: this.c2,
      armLength: this.armLength,
      armSurface: this.armSurface,
      bodyLength: this.bodyLength,
      bodySurface: this.bodySurface,
      legLength: this.legLength,
      legSurface: this.legSurface
    };
  }


  showChart(frequency) {
    if (frequency) {
      this.chart = true;
    } else {
      this.chart = false;
    }
  }

  enterFrequency(frequency) {
    if (frequency) {
      this.enter = false;
    } else {
      this.enter = true;
    }
  }

}
