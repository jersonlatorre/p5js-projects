extends MeshInstance3D


func _ready():
	mesh.surface_begin(Mesh.PRIMITIVE_TRIANGLES)
	mesh.surface_add_vertex(Vector3(-1, -1, 0))
	mesh.surface_add_vertex(Vector3(-1, 1, 0))
	mesh.surface_add_vertex(Vector3(1, -1, 0))
	mesh.surface_add_vertex(Vector3(1, 1, 0))
	mesh.surface_add_vertex(Vector3(1, -1, 0))
	mesh.surface_add_vertex(Vector3(-1, 1, 0))
	mesh.surface_end()
