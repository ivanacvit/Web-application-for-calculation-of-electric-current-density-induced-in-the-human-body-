import { Injectable } from "@angular/core";
import { Voltage } from "./voltage";

@Injectable({
  providedIn: "root"
})
export class VoltageService {
  voltages: Voltage[] = [];

  constructor() {
    this.voltages.push(
      new Voltage(10, 2104, 0.00000064, 399, 0.00000024),
      new Voltage(25, 1299, 0.00000103, 147.5, 0.00000092),
      new Voltage(50, 975.8, 0.00000169, 133.1, 0.00000149),
      new Voltage(100, 590.6, 0.00000275, 82.1, 0.00000232),
      new Voltage(225, 292.3, 0.00000452, 59.7, 0.00000351),
      new Voltage(1000, 62, 0.00000444, 51.8, 0.00004091)
    );
  }
}
