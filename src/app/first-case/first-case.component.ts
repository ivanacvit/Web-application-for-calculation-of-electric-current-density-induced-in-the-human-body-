import { Component } from "@angular/core";
import { HumanBody } from "../shared/human-body";
import { HumanBodyService } from "../shared/human-body.service";
import { Voltage } from "../shared/voltage";
import { VoltageService } from "../shared/voltage.service";
import { SelectedElectricityProps } from "../shared/selected-electricity-props";

@Component({
  templateUrl: "./first-case.component.html",
  styleUrls: ["./first-case.component.css"]
})
export class FirstCaseComponent {
  I: number;
  armEnergyDensity: number;
  bodyEnergyDensity: number;
  frequency: number;
  chart = false;

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

    this.selectedElectricityProps = {
      freq: Number(frequency),
      u: this.u,
      r1: this.r1,
      c1: this.c1,
      r2: this.r2,
      c2: this.c2,
      armLength: this.armLength,
      armSurface: this.armSurface,
      upperBodyLength: this.upperBodyLength,
      upperBodySurface: this.upperBodySurface
    };
  }

  showChart(frequency) {
    if (frequency) {
      this.chart = true;
    } else {
      this.chart = false;
    }
  }
}
