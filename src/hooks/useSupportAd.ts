import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const AD_UNIT_ID = __DEV__
  ? TestIds.REWARDED
  : Platform.select({
      android: 'ca-app-pub-7256119170225426/4629970839',
      ios: 'ca-app-pub-7256119170225426/4629970839',
    }) ?? TestIds.REWARDED;

type AdResult = 'rewarded' | 'closed' | 'error';

export function useSupportAd() {
  const [loading, setLoading] = useState(false);

  const showAd = useCallback((): Promise<AdResult> => {
    setLoading(true);

    return new Promise<AdResult>((resolve) => {
      const ad = RewardedAd.createForAdRequest(AD_UNIT_ID);
      let earned = false;

      const cleanup = () => {
        unsubLoaded();
        unsubError();
        unsubEarned();
        unsubClosed();
      };

      const unsubLoaded = ad.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          ad.show();
        },
      );

      const unsubError = ad.addAdEventListener(AdEventType.ERROR, () => {
        setLoading(false);
        cleanup();
        resolve('error');
      });

      const unsubEarned = ad.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        () => {
          earned = true;
        },
      );

      const unsubClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
        setLoading(false);
        cleanup();
        resolve(earned ? 'rewarded' : 'closed');
      });

      ad.load();
    });
  }, []);

  return { loading, showAd };
}
