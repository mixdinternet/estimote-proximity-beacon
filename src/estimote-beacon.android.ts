import * as utils from 'tns-core-modules/utils/utils';

declare const com: any;
declare const kotlin: any;
declare const java: any;

const CloudCredentials = com.estimote.proximity_sdk.api.EstimoteCloudCredentials;
const ProximityObserverBuilder = com.estimote.proximity_sdk.api.ProximityObserverBuilder;
const ProximityZoneBuilder = com.estimote.proximity_sdk.api.ProximityZoneBuilder;

const kotlinFn1 = kotlin.jvm.functions.Function1;

export interface ZoneContext {

  getAttachments(): Function;
  getDeviceId(): Function;
  getTag(): string;
}

export interface ObserverOptions {

  onEnterRegion: Function;
  onExitRegion: Function;
  regionTag: string;
}

export class EstimoteProximityBeacon {

  private _cloudCredentials;
  private _proximityObserver;

  constructor(appId, appToken) {

    if (!appId) {

      throw new Error('Application ID is needed');
    }

    if (!appToken) {

      throw new Error('Application TOKEN is needed');
    }

    this._cloudCredentials = new CloudCredentials(appId, appToken);
  }

  startObserving({ onEnterRegion, onExitRegion, regionTag }: ObserverOptions) {

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
          .forTag(regionTag)
          .inNearRange()
          .onEnter(new kotlinFn1({
            invoke: function (zoneContext: ZoneContext) {

              if (onEnterRegion) {

                onEnterRegion();
              }

              console.log('Entered in region');
            },
          }))
          .onExit(new kotlinFn1({
            invoke: function (zoneContext: ZoneContext) {

              if (onExitRegion) {

                onExitRegion();
              }

              console.log('Out of region');
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
