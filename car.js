function Car() {
	this.x = 300;
	this.y = 0; 
	this.fuelCell = new GL.Mesh.sphere({ detail: 6, normals: true });
	this.trailMesh = new GL.Mesh();

	var slices = 24, stacks = 24;
	var bodyMesh = CSG.cube({ radius: 1.25, center: [0, 0, 0] })
	    .intersect(CSG.sphere({ radius: 1.5, slices: slices, stacks: stacks, center: [0, 0, 0] }));

	var slices = 16, stacks = 16;
	var leftSphere = CSG.sphere({ radius: 1.0, slices: slices, stacks: stacks, center: [-2, 0, 0] })
	    .subtract(CSG.sphere({ radius: 0.9, slices: slices, stacks: stacks, center: [-2, 0, 0] }))
	    .subtract(CSG.cube({ radius: 1.0, center: [-3.0, 0, 0] }));

	var rightSphere = CSG.sphere({ radius: 1.0, slices: slices, stacks: stacks, center: [2, 0, 0] })
	    .subtract(CSG.sphere({ radius: 0.9, slices: slices, stacks: stacks, center: [2, 0, 0] }))
	    .subtract(CSG.cube({ radius: 1.0, center: [3.0, 0, 0] }));

	var bottomSphere = CSG.sphere({ radius: 1.25, slices: slices, stacks: stacks, center: [0, -2, 0] })
	    .subtract(CSG.sphere({ radius: 1.0, slices: slices, stacks: stacks, center: [0, -2, 0] }))
	    .subtract(CSG.cube({ radius: 1.5, center: [0, -3.0, 0] }));

	this.mesh = leftSphere.union(rightSphere).union(bottomSphere).union(bodyMesh).toMesh();

	var radius = 0.7;
	this.fuelCell = CSG.cylinder({ start: [0, 0, 0], end: [0, 1.75, 0], radius: radius, slices: slices })
		.intersect(CSG.sphere({ radius: 1.3, slices: slices, stacks: stacks, center: [0, 0.25, 0] })).toMesh();


	var trailSize = 30;
	this.trailMesh.triangles = new Array(trailSize * 3);
	this.trailMesh.indices = new Array(trailSize * 3)
	for(var i = 0; i < trailSize; i++) {
	    var x = i / trailSize;
	    this.trailMesh.vertices[i * 3] = [-(0.4 + x), 1 - x, 0];
	    this.trailMesh.vertices[i * 3 + 1] = [-(0.4 + x), -1 + x, 0];
	    this.trailMesh.vertices[i * 3 + 2] = [-x, 0, 0];
	}

	for(var i = 0; i < trailSize * 3; i++)
		this.trailMesh.triangles[i] = i;

	this.trailMesh.compile();
}