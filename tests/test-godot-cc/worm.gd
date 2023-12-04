extends Node3D

const SCALE = 0.05

var sphere_script = preload("res://sphere.gd")
var sphere_seed = randi()
var color


func _ready():
	position = Vector3(randf_range(-2, 2), randf_range(-2, 2), randf_range(-2, 2))
	for i in range(100):
		var sphere = MeshInstance3D.new()
		sphere.set_script(sphere_script)
		sphere.mesh = SphereMesh.new()
		sphere.position = Vector3(0, 0, 0)
		sphere.index = i * 0.1
		sphere.sphere_seed = sphere_seed
		sphere.center = position
		sphere.scale = Vector3(SCALE, SCALE, SCALE)
		sphere.mesh.radial_segments = 6
		sphere.mesh.rings = 4

		var material = StandardMaterial3D.new()
		material.albedo_color = Color.from_hsv(color.h, color.s, color.v)
		material.emission = Color.from_hsv(color.h, color.s, color.v)
		material.emission_enabled	= true
		material.emission_energy_multiplier = 1.5
		material.subsurf_scatter_enabled = true
		material.subsurf_scatter_strength = 1.0
		material.roughness = 0.2
		sphere.mesh.surface_set_material(0, material)
		add_child(sphere)
