import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { calculationHelper } from '../first-case-shared/calculation-helper';
import {
  CalculationData,
  CalculationResult
} from "../first-case-shared/calculation-types";
import { SelectedElectricityProps } from '../first-case-shared/selected-electricity-props';
import isEqual from "lodash-es/isEqual";
import sortBy from "lodash-es/sortBy";

@Component({
  selector: 'app-first-chart',
  templateUrl: './first-chart.component.html',
  styleUrls: ['./first-chart.component.css']
})
export class FirstChartComponent implements OnChanges {
  @Input() selectedElectricityProps: SelectedElectricityProps;

  dataAdapter: any;
  I: number;
  armEnergyDensity: number;
  bodyEnergyDensity: number;
  test:number;

  ngOnChanges(changes: SimpleChanges) {
    if (!isEqual(
      changes.selectedElectricityProps.currentValue,
      changes.selectedElectricityProps.previousValue
    )
    ) {
      this.pushData(this.selectedElectricityProps);
    }
  }

  pushData(data: SelectedElectricityProps) {
    const newDataAdapter = [];
    let userFreq = data.frequency;
    const calculationHelperData: CalculationData = {
      u: data.u,
      r1: data.r1,
      c1: data.c1,
      r2: data.r2,
      c2: data.c2,
      armLength: data.armLength,
     armSurface: data.armSurface,
      upperBodyLength: data.upperBodyLength,
      upperBodySurface: data.upperBodySurface,
    };
    const userCalculation = calculationHelper(userFreq, calculationHelperData);
    newDataAdapter.push({
      Frequency: userFreq,
      Arm: userCalculation.armEnergyDensity,
      Body: userCalculation.bodyEnergyDensity
    });

    this.I = userCalculation.I;
    this.armEnergyDensity = userCalculation.armEnergyDensity;
    this.bodyEnergyDensity = userCalculation.bodyEnergyDensity;

    let freq: number;
    let simulatedCalculation: CalculationResult;
    for (let i = 0; i <= 10; i++) {
      freq = i === 0 ? 1 : i * 200;
      if (freq !== userFreq) {
        simulatedCalculation = calculationHelper(freq, calculationHelperData);
        newDataAdapter.push({
          Frequency: freq,
          Arm: simulatedCalculation.armEnergyDensity,
          Body: simulatedCalculation.bodyEnergyDensity,
        });
      }
    }

    this.dataAdapter = sortBy(newDataAdapter, ['Frequency']);
    console.log('ChartsComponent ubaciPodatke dataAdapter:', this.dataAdapter);
  }

  // graph properties
  padding: any = { left: 5, top: 5, right: 25, bottom: 5 };

  titlePadding: any = { left: 90, top: 0, right: 0, bottom: 30 };

  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '100%';
    }

    return 600;
  }
  

  getTitle(): any {
    if (document.body.offsetWidth < 850) {
      return false;
    }
    return 'Ovisnost gustoće struje o frekvenciji';
  }

  xAxis: any = {
    dataField: 'Frequency',
    displayText: 'Frekvencija',
    minValue: 0,
    maxValue: 2000,
    unitInterval: 200,
    tickMarks: {
      visible: true,
      interval: 1
    },

    gridLines: {
      visible: true,
      interval: 200
    }
  };

  seriesGroups: any[] = [
    {
      type: 'spline',
      valueAxis: {
        padding: { left: 10 },
        title: { text: 'Gustoća struje [A/m²] <br>' },
        gridLines: { visible: false }
      },
      series: [
        { dataField: 'Arm', displayText: 'Gustoća struje kroz ruku [A/m²]' },
        { dataField: 'Body', displayText: 'Gustoća struje kroz trup [A/m²]' },
      ]
    }
  ];
}
