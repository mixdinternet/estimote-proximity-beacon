import { Observable } from 'tns-core-modules/data/observable';
import * as dialogs from 'tns-core-modules/ui/dialogs';

import {
  EstimoteProximityBeacon,
  ObserverOptions,
} from 'nativescript-estimote-beacon';
import { isAndroid, isIOS } from 'tns-core-modules/platform';

export class HelloWorldModel extends Observable {
  public message: string;
  private estimoteBeacon: EstimoteProximityBeacon;

  constructor() {
    super();

    this.estimoteBeacon = new EstimoteProximityBeacon(
        'beacon2019test-2e7',
        'b293cd03afe1df3d2a0d1b323aa89777',
    );
  }

  clicaeu() {

    console.log('cliquei');

    if (isAndroid) {

      const observerOptions: ObserverOptions = {
        onEnterRegion: function () {
          dialogs.alert('Entrou na regiao');
        },
        onExitRegion: function () {
          dialogs.alert('Saiu da regiao');
        },
        regionTag: 'desks',
      };

      this.estimoteBeacon.startObserving(observerOptions);
      return;
    }

    if (isIOS) {

    }
  }
}
