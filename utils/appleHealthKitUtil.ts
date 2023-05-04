import { Platform } from 'react-native';
import AppleHealthKit, { HealthKitPermissions, HealthInputOptions, HealthValue } from 'react-native-health';
import { getDateBefore } from './dateUtil';

/* Permission options */
const PERMS = AppleHealthKit.Constants.Permissions;
const permissions = {
    permissions: {
      read: [PERMS.HeartRate, PERMS.StepCount],
      write: [PERMS.Steps],
    },
  } as HealthKitPermissions;

export const useHealthKit = {
    init: async(): Promise<HealthValue | string> => {
        if (Platform.OS !== "ios") return "Init Failed";
        const initResult: HealthValue = await new Promise((res, rej) => {
            AppleHealthKit.initHealthKit(permissions, (err, results) => {
                if (err) rej(err);
                res(results);
            });
        });
        return initResult;
    },
    getStepCount: async(options?:HealthInputOptions): Promise<HealthValue> => {
        const defaultOptions:HealthInputOptions = {
            // date: getDateBefore(),
            date: new Date().toISOString(),
        };
        const stepCountOptions: HealthInputOptions = options ?? defaultOptions;

        const stepCountResult:HealthValue = await new Promise((res, rej) => {
            AppleHealthKit.getStepCount(stepCountOptions, (err, results) => {
                if (err) rej(err);
                res(results);
            });
        });
        return stepCountResult;
    },
    getDailyStepCount: async(options:HealthInputOptions): Promise<HealthValue[]> => {
        const stepCountResult:HealthValue[] = await new Promise((res, rej) => {
            AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
                if (err) rej(err);
                res(results);
            });
        });
        return stepCountResult;
    },
};