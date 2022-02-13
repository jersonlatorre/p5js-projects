class SimplexNoise {
  constructor(seed, octaves, persistence) {
    this.rootSeed = seed || 0
    console.log(this.rootSeed)
    this.iOctaves = octaves || 1
    this.fPersistence = persistence || 0.5
    this.fResult
    this.fFreq
    this.fPers
    this.aOctFreq // frequency per octave
    this.aOctPers // persistance per octave
    this.fPersMax // 1 / max persistence

    // Skewing and unskewing factors for 2, 3, and 4 dimensions
    this.F2 = 0.5 * (Math.sqrt(3.0) - 1.0)
    this.G2 = (3.0 - Math.sqrt(3.0)) / 6.0
    this.F3 = 1.0 / 3.0
    this.G3 = 1.0 / 6.0
    this.F4 = (Math.sqrt(5.0) - 1.0) / 4.0
    this.G4 = 5.0 - Math.sqrt(5.0) / 20.0

    this.perm = new Uint8Array(512)
    this.permMod12 = new Uint8Array(512)

    this.p = new Uint8Array(256)

    // Prepopulate the permutation table with values from lookup table
    // To remove the need for index wrapping, double the permutation table length
    this.grad3 = new Float32Array([
        1,1,0, -1,1,0, 1,-1,0, -1,-1,0,
        1,0,1, -1,0,1, 1,0,-1, -1,0,-1,
        0,1,1, 0,-1,1, 0,1,-1, 0,-1,-1
    ])
    
    this.grad4 = new Float32Array([
        0,1,1,1, 0,1,1,-1, 0,1,-1,1, 0,1,-1,-1,
        1,0,1,1, 1,0,1,-1, 1,0,-1,1, 1,0,-1,-1,
        -1,0,1,1, -1,0,1,-1, -1,0,-1,1, -1,0,-1,-1,
        1,1,0,1, 1,1,0,-1, 1,-1,0,1, 1,-1,0,-1,
        -1,1,0,1, -1,1,0,-1, -1,-1,0,1, -1,-1,0,-1,
        1,1,1,0, 1,1,-1,0, 1,-1,1,0, 1,-1,-1,0,
        -1,1,1,0, -1,1,-1,0, -1,-1,1,0, -1,-1,-1,0
    ])

    this.init()
  }

  octaveFreq() {
    let fFreq, fPers
    this.aOctFreq = new Array()
    this.aOctPers = new Array()
    this.fPersMax = 0

    for (let i = 0; i < this.iOctaves; i++) {
      fFreq = Math.pow(2, i)
      fPers = Math.pow(this.fPersistence, i)
      this.fPersMax += fPers
      this.aOctFreq.push(fFreq)
      this.aOctPers.push(fPers)
    }

    this.fPersMax = 1 / this.fPersMax
  }

  seed(x) {
    x = (x << 13) ^ x
    return 1.0 - ((x * (x * x * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0
  }

  init() {
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.abs(~~(this.seed(i) * 256))
    }

    // To remove the need for index wrapping, double the permutation table length
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255]
      this.permMod12[i] = this.perm[i] % 12
    }

    this.octaveFreq()
  }

  noise2D(xin, yin) {
    let n0, n1, n2, i1, j1

    // Skew the input space to determine which simplex cell we're in
    let s = (xin + yin) * this.F2
    let i = Math.floor(xin + s)
    let j = Math.floor(yin + s)

    let t = (i + j) * this.G2 // Simple skew factor for 2D
    // Unskew the cell origin back to (x, y) space
    let X0 = i - t
    let Y0 = j - t
    // The x,y distances from the cell origin
    let x0 = xin - X0
    let y0 = yin - Y0

    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    if (x0 > y0) {
      i1 = 1
      j1 = 0
    } else {
      // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      i1 = 0
      j1 = 1
    } // upper triangle, YX order: (0,0)->(0,1)->(1,1)

    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6

    let x1 = x0 - i1 + this.G2 // Offsets for middle corner in (x,y) unskewed coords
    let y1 = y0 - j1 + this.G2
    let x2 = x0 - 1.0 + 2.0 * this.G2 // Offsets for last corner in (x,y) unskewed coords
    let y2 = y0 - 1.0 + 2.0 * this.G2

    // Work out the hashed gradient indices of the three simplex corners
    let ii = i & 255
    let jj = j & 255

    // Calculate the contribution from the three corners
    let t0 = 0.5 - x0 * x0 - y0 * y0
    if (t0 < 0) n0 = 0.0
    else {
      let gi0 = this.permMod12[ii + this.perm[jj]]
      t0 *= t0
      n0 = t0 * t0 * (this.grad3[gi0] * x0 + this.grad3[gi0 + 1] * y0)
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1
    if (t1 < 0) n1 = 0.0
    else {
      let gi1 = this.permMod12[ii + i1 + this.perm[jj + j1]]
      t1 *= t1
      n1 = t1 * t1 * (this.grad3[gi1] * x1 + this.grad3[gi1 + 1] * y1)
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2
    if (t2 < 0) n2 = 0.0
    else {
      let gi2 = this.permMod12[ii + 1 + this.perm[jj + 1]]
      t2 *= t2
      n2 = t2 * t2 * (this.grad3[gi2] * x2 + this.grad3[gi2 + 1] * y2)
    }

    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70.0 * (n0 + n1 + n2)
  }

  noise3D(xin, yin, zin) {
    // Noise contribution from the four corners
    let n0, n1, n2, n3

    // Skew the input space to determine which simplex cell we are in
    let s = (xin + yin + zin) * this.F3 // Simple skew factor for 3D
    let i = Math.floor(xin + s)
    let j = Math.floor(yin + s)
    let k = Math.floor(zin + s)
    let t = (i + j + k) * this.G3
    let X0 = i - t
    let Y0 = j - t
    let Z0 = k - t

    // The x, y, z distances from the cell origin
    let x0 = xin - X0
    let y0 = yin - Y0
    let z0 = zin - Z0

    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    let i1, j1, k1, i2, j2, k2

    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1
        j1 = 0
        k1 = 0
        i2 = 1
        j2 = 1
        k2 = 0 // XYZ order
      } else if (x0 >= z0) {
        i1 = 1
        j1 = 0
        k1 = 0
        i2 = 1
        j2 = 0
        k2 = 1 // XZY order
      } else {
        i1 = 0
        j1 = 0
        k1 = 1
        i2 = 1
        j2 = 0
        k2 = 1 // ZXY order
      }
    } else {
      // x0<y0
      if (y0 < z0) {
        i1 = 0
        j1 = 0
        k1 = 1
        i2 = 0
        j2 = 1
        k2 = 1 // ZYX order
      } else if (x0 < z0) {
        i1 = 0
        j1 = 1
        k1 = 0
        i2 = 0
        j2 = 1
        k2 = 1 // YZX order
      } else {
        i1 = 0
        j1 = 1
        k1 = 0
        i2 = 1
        j2 = 1
        k2 = 0 // YXZ order
      }
    }

    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.

    let x1 = x0 - i1 + this.G3
    let y1 = y0 - j1 + this.G3
    let z1 = z0 - k1 + this.G3

    let x2 = x0 - i2 + 2.0 * this.G3 // Offsets for third corner in (x,y,z) coords
    let y2 = y0 - j2 + 2.0 * this.G3
    let z2 = z0 - k2 + 2.0 * this.G3

    let x3 = x0 - 1.0 + 3.0 * this.G3
    let y3 = y0 - 1.0 + 3.0 * this.G3
    let z3 = z0 - 1.0 + 3.0 * this.G3

    // Work out the hashed gradient indices of the four simplex corners
    let ii = i & 255
    let jj = j & 255
    let kk = k & 255

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0
    if (t0 < 0) n0 = 0.0
    else {
      t0 *= t0
      let gi0 = this.permMod12[ii + this.perm[jj + this.perm[kk]]]
      n0 = t0 * t0 * (this.grad3[gi0] * x0 + this.grad3[gi0 + 1] * y0 + this.grad3[gi0 + 2] * z0)
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1
    if (t1 < 0) n1 = 0.0
    else {
      t1 *= t1
      let gi1 = this.permMod12[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]]
      n1 = t1 * t1 * (this.grad3[gi1] * x1 + this.grad3[gi1 + 1] * y1 + this.grad3[gi1 + 2] * z1)
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2
    if (t2 < 0) n2 = 0.0
    else {
      t2 *= t2
      let gi2 = this.permMod12[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]]
      n2 = t2 * t2 * (this.grad3[gi2] * x2 + this.grad3[gi2 + 1] * y2 + this.grad3[gi2 + 2] * z2)
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3
    if (t3 < 0) n3 = 0.0
    else {
      t3 *= t3
      let gi3 = this.permMod12[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]]
      n3 = t3 * t3 * (this.grad3[gi3] * x3 + this.grad3[gi3 + 1] * y3 + this.grad3[gi3 + 2] * z3)
    }

    // Add contributions from each corner to get the final noise value.
    // The result is scaled to stay just inside [-1,1]
    return 32.0 * (n0 + n1 + n2 + n3)
  }

  noise4D(x, y, z, w) {
    // Noise contributions from the five corners
    let n0, n1, n2, n3, n4

    let s = (x + y + z + w) * this.F4 // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
    let i = Math.floor(x + s)
    let j = Math.floor(y + s)
    let k = Math.floor(z + s)
    let l = Math.floor(w + s)

    let t = (i + j + k + l) * this.G4 // Factor for 4D unskewing
    let X0 = i - t
    let Y0 = j - t
    let Z0 = z - t
    let W0 = w - t

    // The x, y, z, w distances from the cell origin
    let x0 = x - X0
    let y0 = y - Y0
    let z0 = z - Z0
    let w0 = w - W0

    // For the 4D case, the simplex is a 4D shape I won't even try to describe.
    // To find out which of the 24 possible simplices we're in, we need to
    // determine the magnitude ordering of x0, y0, z0 and w0.
    // Six pair-wise comparisons are performed between each possible pair
    // of the four coordinates, and the results are used to rank the numbers.
    let rankx = 0,
      ranky = 0,
      rankz = 0,
      rankw = 0

    if (x0 > y0) rankx++
    else ranky++
    if (x0 > z0) rankx++
    else rankz++
    if (x0 > w0) rankx++
    else rankw++
    if (y0 > z0) ranky++
    else rankz++
    if (y0 > w0) ranky++
    else rankw++
    if (z0 > w0) rankz++
    else rankw++

    let i1, j1, k1, l1 // The integer offsets for the second simplex corner
    let i2, j2, k2, l2 // The integer offsets for the third simplex corner
    let i3, j3, k3, l3 // The integer offsets for the fourth simplex corner

    // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
    // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
    // impossible. Only the 24 indices which have non-zero entries make any sense.
    // We use a thresholding to set the coordinates in turn from the largest magnitude.

    // Rank 3 denotes the largest coordinate.
    i1 = rankx >= 3 ? 1 : 0
    j1 = ranky >= 3 ? 1 : 0
    k1 = rankz >= 3 ? 1 : 0
    l1 = rankw >= 3 ? 1 : 0

    // Rank 2 denotes the second largest coordinate.
    i2 = rankx >= 2 ? 1 : 0
    j2 = ranky >= 2 ? 1 : 0
    k2 = rankz >= 2 ? 1 : 0
    l2 = rankw >= 2 ? 1 : 0
    // Rank 1 denotes the second smallest coordinate.
    i3 = rankx >= 1 ? 1 : 0
    j3 = ranky >= 1 ? 1 : 0
    k3 = rankz >= 1 ? 1 : 0
    l3 = rankw >= 1 ? 1 : 0

    // The fifth corner has all coordinate offsets = 1, so no need to compute that.
    let x1 = x0 - i1 + this.G4 // Offsets for second corner in (x,y,z,w) coords
    let y1 = y0 - j1 + this.G4
    let z1 = z0 - k1 + this.G4
    let w1 = w0 - l1 + this.G4

    let x2 = x0 - i2 + 2.0 * this.G4 // Offsets for third corner in (x,y,z,w) coords
    let y2 = y0 - j2 + 2.0 * this.G4
    let z2 = z0 - k2 + 2.0 * this.G4
    let w2 = w0 - l2 + 2.0 * this.G4

    let x3 = x0 - i3 + 3.0 * this.G4 // Offsets for fourth corner in (x,y,z,w) coords
    let y3 = y0 - j3 + 3.0 * this.G4
    let z3 = z0 - k3 + 3.0 * this.G4
    let w3 = w0 - l3 + 3.0 * this.G4

    let x4 = x0 - 1.0 + 4.0 * this.G4 // Offsets for the last corner in (x,y,z,w) coords
    let y4 = y0 - 1.0 + 4.0 * this.G4
    let z4 = z0 - 1.0 + 4.0 * this.G4
    let w4 = w0 - 1.0 + 4.0 * this.G4

    // Work out the hashed gradient indices of the five simplex corners
    let ii = i & 255
    let jj = j & 255
    let kk = k & 255
    let ll = l & 255

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0
    if (t0 < 0) n0 = 0.0
    else {
      t0 *= t0
      let gi0 = this.perm[ii + this.perm[jj + this.perm[kk + this.perm[ll]]]] % 32
      n0 = t0 * t0 * (this.grad4[gi0] * x0 + this.grad4[gi0] * y0 + this.grad4[gi0] * z0 + this.grad4[gi0] * w0)
    }

    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1
    if (t1 < 0) n1 = 0.0
    else {
      t1 *= t1
      let gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1 + this.perm[ll + l1]]]] % 32
      n1 = t1 * t1 * (this.grad4[gi1] * x1 + this.grad4[gi1] * y1 + this.grad4[gi1] * z1 + this.grad4[gi1] * w1)
    }

    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2
    if (t2 < 0) n2 = 0.0
    else {
      t2 *= t2
      let gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2 + this.perm[ll + l2]]]] % 32
      n2 = t2 * t2 * (this.grad4[gi2] * x2 + this.grad4[gi2] * y2 + this.grad4[gi2] * z2 + this.grad4[gi2] * w2)
    }

    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3
    if (t3 < 0) n3 = 0.0
    else {
      t3 *= t3
      let gi3 = this.perm[ii + i3 + this.perm[jj + j3 + this.perm[kk + k3 + this.perm[ll + l3]]]] % 32
      n3 = t3 * t3 * (this.grad4[gi3] * x3 + this.grad4[gi3] * y3 + this.grad4[gi3] * z3 + this.grad4[gi3] * w3)
    }

    let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4
    if (t4 < 0) n4 = 0.0
    else {
      t4 *= t4
      let gi4 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1 + this.perm[ll + 1]]]] % 32
      n4 = t4 * t4 * (this.grad4[gi4] * x4 + this.grad4[gi4] * y4 + this.grad4[gi4] * z4 + this.grad4[gi4] * w4)
    }

    return 27.0 * (n0 + n1 + n2 + n3 + n4)
  }

  noise(x, y, z, w) {
    this.fResult = 0

    for (let i = 0; i < this.iOctaves; i++) {
      this.fFreq = this.aOctFreq[i]
      this.fPers = this.aOctPers[i]

      switch (arguments.length) {
        case 4:
          this.fResult += this.fPers * this.noise4D(this.rootSeed + this.fFreq * x, this.rootSeed + this.fFreq * y, this.rootSeed + this.fFreq * z, this.rootSeed + this.fFreq * w)
          break
        case 3:
          this.fResult += this.fPers * this.noise3D(this.rootSeed + this.fFreq * x, this.rootSeed + this.fFreq * y, this.rootSeed + this.fFreq * z)
          break
        default:
          this.fResult += this.fPers * this.noise2D(this.rootSeed + this.fFreq * x, this.rootSeed + this.fFreq * y)
      }
    }

    return (this.fResult * this.fPersMax + 1) * 0.5
  }
}
