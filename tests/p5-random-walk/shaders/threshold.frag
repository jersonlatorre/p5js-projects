// threshold.frag
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uTexture;
uniform float uThreshold;
varying vec2 pos;

void main() {
  vec4 texColor = texture2D(uTexture, pos);
  float gray = (texColor.r + texColor.g + texColor.b) / 3.0;
  // float bw = step(uThreshold, gray);
  gl_FragColor = vec4(vec3(gray), 1.0);
}