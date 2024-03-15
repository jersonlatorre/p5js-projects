export let blurShaderSrc = `
  precision highp float;

  varying vec2 vTexCoord;
  uniform sampler2D tex0;
  uniform vec2 canvasSize;
  uniform float u_blur;

  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
      vec2 st = gl_FragCoord.xy / canvasSize;
      vec2 randDir = vec2(random(st)-0.5, random(st+vec2(1.0))-0.5) * 0.01; // Dirección aleatoria en x e y
      vec4 color = texture2D(tex0, vTexCoord + randDir); // Desplaza el píxel basado en la dirección aleatoria
      gl_FragColor = color;
  }
`
