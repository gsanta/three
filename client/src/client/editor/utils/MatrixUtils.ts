import { Euler, Matrix4, Quaternion, Vector3 } from 'three';

class MatrixUtils {
  static setRotation(matrix: Matrix4, rotation: number): Matrix4 {
    const rotationMatrix = new Matrix4();
    rotationMatrix.makeRotationFromEuler(new Euler(0, rotation, 0)); // Example rotation: 45 degrees around the Y-axis

    const clonedMatrix = matrix.clone();

    const translation = new Vector3();
    const scale = new Vector3();
    const quaternion = new Quaternion();
    clonedMatrix.decompose(translation, quaternion, scale);

    clonedMatrix.compose(translation, new Quaternion().setFromRotationMatrix(rotationMatrix), scale);

    return clonedMatrix;
  }

  static getBoxWorldPositions = (matrix: Matrix4) => {
    const vertices = [
      new Vector3(-0.5, -0.5, -0.5),
      new Vector3(0.5, -0.5, -0.5),
      new Vector3(0.5, -0.5, 0.5),
      new Vector3(-0.5, -0.5, 0.5),
      new Vector3(-0.5, 0.5, -0.5),
      new Vector3(0.5, 0.5, -0.5),
      new Vector3(0.5, 0.5, 0.5),
      new Vector3(-0.5, 0.5, 0.5),
    ];

    vertices.forEach((vertex) => vertex.applyMatrix4(matrix));

    return vertices;
  };
}

export default MatrixUtils;
