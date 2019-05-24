import { Component, Input, OnInit } from "@angular/core";
import { calculate } from "../shared/second-calculation-helper";

@Component({
  selector: "app-second-chart",
  templateUrl: "./second-chart.component.html",
  styleUrls: ["./second-chart.component.css"]
})
export class SecondChartComponent implements OnInit {
  @Input() frequency: string;
  @Input() u: number;
  @Input() r1: number;
  @Input() c1: number;
  @Input() r2: number;
  @Input() c2: number;
  @Input() armLength: number;
  @Input() armSurface: number;
  @Input() bodyLength: number;
  @Input() bodySurface: number;
  @Input() legLength: number;
  @Input() legSurface: number;

  dataAdapter: any;

  pushData() {
    let data = [];

    for (let i = 0; i <= 10; i++) {
      const freq = i === 0 ? 1 : i * 200;
      const calculation = calculate(
        freq,
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

      data.push({
        Frequency: freq,
        Arm: calculation.armEnergyDensity,
        Body: calculation.bodyEnergyDensity,
        Leg: calculation.legEnergyDensity
      });
    }

    this.dataAdapter = data;
  }

  ngOnInit() {
    this.pushData();
  }

  padding: any = { left: 5, top: 5, right: 25, bottom: 5 };
  titlePadding: any = { left: 90, top: 0, right: 0, bottom: 30 };

  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return "90%";
    }
    return 600;
  }

  getTitle(): any {
    if (document.body.offsetWidth < 850) {
      return false;
    }
    return "Ovisnost gustoće struje o frekvenciji";
  }

  xAxis: any = {
    dataField: "Frequency",
    displayText: "Frekvencija",
    minValue: 0,
    maxValue: 2000,
    unitInterval: 200,
    tickMarks: {
      visible: true,
      interval: 1
    },
    gridLines: {
      visible: true,
      interval: 5
    }
  };
  seriesGroups: any[] = [
    {
      type: "spline",
      valueAxis: {
        padding: { left: 10 },
        title: { text: "Gustoća struje [A/m²]<br>" },
        gridLines: { visible: false }
      },
      series: [
        { dataField: "Arm", displayText: "Gustoća struje kroz ruku [A/m²]" },
        { dataField: "Body", displayText: "Gustoća struje kroz trup [A/m²]" },
        { dataField: "Leg", displayText: "Gustoća struje kroz nogu [A/m²]" }
      ]
    }
  ];
}
