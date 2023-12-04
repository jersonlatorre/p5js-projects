extends Camera3D

var distance_to_center: float = 1.0
var rotation_speed: float = 0.3
var current_angle: float = 0.0


func _ready():
	look_at(Vector3.ZERO, Vector3.UP)


func _process(delta):
	current_angle += rotation_speed * delta
	current_angle = fmod(current_angle, 2 * PI)

	var x = distance_to_center * cos(current_angle)
	var y = distance_to_center * sin(current_angle)

	global_transform.origin.x = x
	global_transform.origin.y = 2
	global_transform.origin.z = y

	look_at(Vector3.ZERO, Vector3.UP)
