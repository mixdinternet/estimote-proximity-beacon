// define your typings manually
// or..
// take the ios or android .d.ts files and copy/paste them here
export declare class ZoneContext {

  getAttachments(): Function;

  getDeviceId(): Function;

  getTag(): string;
}

export declare class ObserverOptions {

  onEnterRegion;
  onExitRegion;
  regionTag;
}

export declare class EstimoteProximityBeacon {

  constructor(appId: string, appToken: string);

  startObserving(observerOptions: ObserverOptions);
}
