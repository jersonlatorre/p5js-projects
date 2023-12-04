extends Node3D

@export_color_no_alpha var color1: Color
@export_color_no_alpha var color2: Color
@export_color_no_alpha var color3: Color
@export_color_no_alpha var color4: Color
@export_color_no_alpha var color5: Color


var worm_scene = preload("res://worm.tscn")

@onready var colors = [color1, color2, color3, color4, color5]

func _ready():
	for i in 50:
		var worm = worm_scene.instantiate()
		worm.color = colors[randi() % colors.size()]
		add_child(worm)
