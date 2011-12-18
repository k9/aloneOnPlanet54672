function makeGroundLayer(size, lod, heightFn, isSky) {
    var layer = { height: new Array(size / lod), mesh: new GL.Mesh() };
    layer.mesh.vertices = new Array(layer.height.length * 2);
    layer.mesh.triangles = new Array((layer.height.length - 1) * 6);

    for(var i = 0; i < size / lod; i++) {
        layer.height[i] = heightFn(i * lod);
        layer.mesh.vertices[i * 2 + 1] = [i * lod, isSky ? 1000 : 0, 0];
        layer.mesh.vertices[i * 2] = [i * lod, layer.height[i], 0];

        if(i != layer.height.length - 1) {
            layer.mesh.triangles[i * 6] = i * 2;
            layer.mesh.triangles[i * 6 + 1] = i * 2 + 1;
            layer.mesh.triangles[i * 6 + 2] = i * 2 + 2;
            layer.mesh.triangles[i * 6 + 3] = i * 2 + 1;
            layer.mesh.triangles[i * 6 + 4] = i * 2 + 3;
            layer.mesh.triangles[i * 6 + 5] = i * 2 + 2;
        }
    }

    layer.mesh.compile();
    return layer;
}

function LevelOne() {
	this.ground = makeGroundLayer(4096, 1, function(i) { 
		return Math.sin(i / 9) * 1.5 + Math.sin(i / 30) * 5 + Math.sin(i / 40) * 5 + 100; });

	this.backGround = makeGroundLayer(4096, 4, function(i) { 
		return Math.sin(i / 14) * 2.5 + Math.cos(i / 40) * 5 + 80;  });

	this.backGround2 = makeGroundLayer(4096, 8, function(i) {
    	return Math.sin(i / 16) * 2.5 + Math.sin(i / 50) * 5 + 60; });

	this.backGround3 = makeGroundLayer(4096, 8, function(i) {
    return Math.sin(i / 24) * 2.5 + Math.sin(i / 40) * 5 + 40; });

	this.sky = makeGroundLayer(4096, 8, function(i) {
    	return Math.cos(i / 50) * 2.5 + Math.cos(i / 60) * 2.5 + 350; }, true);
}