import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

const SkyBox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    'skybox/px.jpg',
    'skybox/nx.jpg',
    'skybox/py.jpg',
    'skybox/ny.jpg',
    'skybox/pz.jpg',
    'skybox/nz.jpg',
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
};

export default SkyBox;
