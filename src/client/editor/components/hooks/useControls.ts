import { PublicApi, RaycastVehiclePublicApi } from '@react-three/cannon';
import { useEffect, useState } from 'react';

export const useControls = (vehicleApi: RaycastVehiclePublicApi, chassisApi: PublicApi) => {
  const [controls, setControls] = useState({
    w: false,
    a: false,
    s: false,
    d: false,

    r: false,
  });

  useEffect(() => {
    const keyDownPressHandler = (e: KeyboardEvent) => {
      setControls((origControls) => ({
        ...origControls,
        [e.key.toLowerCase()]: true,
      }));
    };

    const keyUpPressHandler = (e: KeyboardEvent) => {
      setControls((origControls) => ({
        ...origControls,
        [e.key.toLowerCase()]: false,
      }));
    };

    window.addEventListener('keydown', keyDownPressHandler);
    window.addEventListener('keyup', keyUpPressHandler);
    return () => {
      window.removeEventListener('keydown', keyDownPressHandler);
      window.removeEventListener('keyup', keyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    if (controls.w) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }
  }, [controls, vehicleApi, chassisApi]);
};
