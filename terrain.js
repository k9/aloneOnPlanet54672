function makeGroundLayer(size, lod, heightFn, isSky, isDeep) {
	var vertsPerMeter = 2;
	var indicesPerMeter = 6;
	var indicesPattern = [0, 1, 2, 1, 3, 2];

    var layer = { height: new Array(size / lod), mesh: new GL.Mesh({ normals: isDeep }) };
    if(isDeep) layer.mesh.normals = new Array(layer.height.length * vertsPerMeter);
    layer.mesh.vertices = new Array(layer.height.length * vertsPerMeter);
    layer.mesh.triangles = new Array((layer.height.length - 1) * indicesPerMeter);

    for(var i = 0; i < layer.height.length; i++) {
        layer.height[i] = heightFn(i * lod);
    }

    for(var i = 0; i < layer.height.length; i++) {
        var y = 0, z = 0;

        if(isSky) y = 1000;

        if(isDeep) {
        	y = layer.height[i];
        	z = -5;
        }

        layer.mesh.vertices[i * vertsPerMeter] = [i * lod, y, z];
        layer.mesh.vertices[i * vertsPerMeter + 1] = [i * lod, layer.height[i], 0];
        
        if(isDeep) {
        	var prev = layer.height[Math.max(i - 1, 0)];
        	var next = layer.height[Math.min(i + 1, layer.height.length - 1)];
        	var normal = new CSG.Vector(2.0, next - prev, 0).cross(new CSG.Vector(0, 0, -1)).unit();

	        layer.mesh.normals[i * vertsPerMeter] = [normal.x, normal.y, normal.z];
	        layer.mesh.normals[i * vertsPerMeter + 1] = [normal.x, normal.y, normal.z];
	    }

        if(i != layer.height.length - 1) {
        	var start = i * indicesPerMeter;
        	for(var k in indicesPattern)
            	layer.mesh.triangles[start + k] = i * vertsPerMeter + indicesPattern[k];
        }
    }

    layer.mesh.compile();
    return layer;
}

function LevelOne() {
	var groundFn = function(i) { 
		return Math.sin(i / 9) * 1.5 + Math.sin(i / 30) * 5 + Math.sin(i / 40) * 5 + 100; 
	};

	this.ground = makeGroundLayer(4096, 1, groundFn, false, false);
	this.groundDepth = makeGroundLayer(4096, 1, groundFn, false, true);

	this.backGround = makeGroundLayer(4096, 4, function(i) { 
		return Math.sin(i / 14) * 2.5 + Math.cos(i / 40) * 5 + 80;  });

	this.backGround2 = makeGroundLayer(4096, 8, function(i) {
    	return Math.sin(i / 16) * 2.5 + Math.sin(i / 50) * 5 + 60; });

	this.backGround3 = makeGroundLayer(4096, 8, function(i) {
    return Math.sin(i / 24) * 2.5 + Math.sin(i / 40) * 5 + 40; });

	this.sky = makeGroundLayer(4096, 8, function(i) {
    	return Math.cos(i / 50) * 2.5 + Math.cos(i / 60) * 2.5 + 350; }, true);
}