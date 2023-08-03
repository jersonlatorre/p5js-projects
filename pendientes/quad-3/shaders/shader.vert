precision highp float;
attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vPosition = aPosition;
  vNormal = uNormalMatrix * aNormal;

  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
