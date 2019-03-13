import * as utils from 'tns-core-modules/utils/utils';
import { android } from 'tns-core-modules/application';

declare const com: any;
declare const kotlin: any;
declare const java: any;

const CloudCredentials = com.estimote.proximity_sdk.api.EstimoteCloudCredentials;
const ProximityObserverBuilder = com.estimote.proximity_sdk.api.ProximityObserverBuilder;
const ProximityZoneBuilder = com.estimote.proximity_sdk.api.ProximityZoneBuilder;

const kotlinFn0 = kotlin.jvm.functions.Function0;
const kotlinFn1 = kotlin.jvm.functions.Function1;

export class EstimoteBeacon {

  private _cloudCredentials;
  private _proximityObserver;
  private _zone;

  constructor() {

    // Credentials está sendo criado normalmente
    this._cloudCredentials = new CloudCredentials(
        'beacon2019test-2e7',
        'b293cd03afe1df3d2a0d1b323aa89777',
    );
  }

  startObserving() {

    try {

      this._proximityObserver = new ProximityObserverBuilder(
          utils.ad.getApplicationContext(),
          this._cloudCredentials,
      )
          .onError(new kotlinFn1({
            invoke: function (error) {

              console.error(error.getMessage());
            },
          }))
          .withBalancedPowerMode()
          .build();

      const zone = new ProximityZoneBuilder()
          .forTag('desks')
          .inNearRange()
          .onEnter(new kotlinFn1({
            invoke: function () {
              console.log('Execute something entering on region');
            },
          }))
          .onExit(new kotlinFn1({
            invoke: function () {
              console.log('Execute something exiting on region');
            },
          }))
          .build();

      const zoneList = java.util.Arrays.asList([zone]);

      this._proximityObserver.startObserving(zoneList);

    } catch (error) {

      console.error(error.getMessage());
    }
  }
}
