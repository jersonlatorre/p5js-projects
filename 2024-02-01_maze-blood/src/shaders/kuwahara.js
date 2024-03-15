export let kuwaharaShaderSrc = `
  precision highp float;
  varying vec2 vTexCoord;
  uniform sampler2D tex0;
  uniform vec2 texelSize;
  const int radius = 2; // Puedes ajustar el radio para diferentes efectos

  vec4 kuwahara(sampler2D image, vec2 uv) {
      float kSize = float((radius + 1) * (radius + 1));
      float halfkSize = kSize * 0.5;
      vec2 texOffset = texelSize * float(radius);
      vec4 sum = vec4(0.0);
      vec4 sumSq = vec4(0.0);
      vec4 mean[4];
      vec4 stdDev[4];
      vec2 offset[4];
      
      offset[0] = vec2(-texOffset.x, -texOffset.y);
      offset[1] = vec2(texOffset.x, -texOffset.y);
      offset[2] = vec2(-texOffset.x, texOffset.y);
      offset[3] = vec2(texOffset.x, texOffset.y);
      
      for(int i = 0; i < 4; i++) {
          sum = vec4(0.0);
          sumSq = vec4(0.0);
          for(int dx = -radius; dx <= 0; dx++) {
              for(int dy = -radius; dy <= 0; dy++) {
                  vec4 pixel = texture2D(image, uv + vec2(float(dx), float(dy)) * texelSize + offset[i]);
                  sum += pixel;
                  sumSq += pixel * pixel;
              }
          }
          mean[i] = sum / kSize;
          stdDev[i] = sqrt(abs(sumSq / kSize - mean[i] * mean[i]));
      }
      
      float minStdDev = stdDev[0].r + stdDev[0].g + stdDev[0].b;
      vec4 result = mean[0];
      for(int i = 1; i < 4; i++) {
          float currentStdDev = stdDev[i].r + stdDev[i].g + stdDev[i].b;
          if(currentStdDev < minStdDev) {
              minStdDev = currentStdDev;
              result = mean[i];
          }
      }
      
      return result;
  }

  void main() {
      gl_FragColor = kuwahara(tex0, vTexCoord);
  }
`
