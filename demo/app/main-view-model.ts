import { Observable } from 'tns-core-modules/data/observable';
import { EstimoteBeacon } from 'nativescript-estimote-beacon';

export class HelloWorldModel extends Observable {
  public message: string;
  private estimoteBeacon: EstimoteBeacon;

  constructor() {
    super();

    this.estimoteBeacon = new EstimoteBeacon();
  }

  clicaeu() {

    this.estimoteBeacon.startObserving();
  }
}
