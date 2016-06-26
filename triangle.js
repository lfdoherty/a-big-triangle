'use strict'

var weakMap      = typeof WeakMap === 'undefined' ? require('weak-map') : WeakMap

var TriangleCache = new weakMap()

function createFastBigTriangle(gl) {

  var vertexBuf = TriangleCache.get(gl)
  if(!vertexBuf){
    vertexBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 0, 
      -1,  4, 0, 
       4, -1, 0]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    TriangleCache.set(gl, vertexBuf)
  }
  //triangleVAO.bind()
  gl.disable(gl.DEPTH_TEST);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

module.exports = createFastBigTriangle
