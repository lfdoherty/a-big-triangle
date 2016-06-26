'use strict'

var weakMap      = typeof WeakMap === 'undefined' ? require('weak-map') : WeakMap

var TriangleCache = new weakMap()

function createFastBigTriangle(gl) {

  var vertexBuf = TriangleCache.get(gl)
  if(!vertexBuf){
    const vertexBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 4, 4, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    TriangleCache.set(gl, vertexBuf)
  }
  //triangleVAO.bind()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
  gl.disable(gl.DEPTH_TEST);
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

module.exports = createFastBigTriangle
