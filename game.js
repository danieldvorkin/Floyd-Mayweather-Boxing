var score = 0;
var circles = [];

function showScore(){
	score += 100;
	$('#score').text(score);
}

function checkMatch(){
	console.log(circles.length);
	if(circles.length === 1){
		swal({   
			title: "You've defeated Mayweather!!!",
			text: "Click below to restart",      
			type: "success",   
			imageUrl: "manny.gif",
			imageSize: "400x300",
			showCancelButton: false,   
			confirmButtonColor: "green",   
			confirmButtonText: "Restart Match",   
			closeOnConfirm: false 
		}, 
		function(){   
			window.location.reload();
		});
	}
}

//Where the game goes
function Circle(elem){
	this.diameter = 30 + Math.random() * 50;
	this.x = (Math.random() * 800);
	this.y = (Math.random() * 600);
	this.speed = 1500 + Math.random() * 500;
	this.elem = elem;

	this.elem.css({
		width: this.diameter,
		height: this.diameter,
		top: this.y,
		left: this.x
	});

	this.move = function(){
		var that = this;
		this.elem.animate({
			top: (Math.random() * 600) - this.diameter,
		 	left: (Math.random() * 800) - this.diameter
		}, {
			duration: this.speed,
			complete: function(){
				that.move();
			},
			queue: false
		});
	};

	this.listen = function(){
		this.elem.on('click', function(){
			showScore();
			checkMatch();
			$(this).effect('explode', {
				pieces: 64
			}, {
				duration: 200,
				queue: false
			})
			circles.pop();
		});
	}
}

$(document).ready(function(){
	$.each($('.circle'), function(){
		var circle = new Circle($(this));
		circles.push(circle);
		circle.move();
		circle.listen();
	})
});