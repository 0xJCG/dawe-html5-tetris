function add_to_all_blocks(a){for(block in a.blocks)all_blocks.push(a.blocks[block])}function draw_all_blocks(){ctx.rect(0,0,300,600);for(block in all_blocks)all_blocks[block].draw()}function Point(a,b){this.x=a,this.y=b}function Rectangle(){}function Block(a,b){var c=new Point(a.x*Block.BLOCK_SIZE,a.y*Block.BLOCK_SIZE),d=new Point(a.x*Block.BLOCK_SIZE+Block.BLOCK_SIZE-Block.OUTLINE_WIDTH/2,a.y*Block.BLOCK_SIZE+Block.BLOCK_SIZE-Block.OUTLINE_WIDTH/2);this.init(c,d),this.x=a.x,this.y=a.y,this.setFill(b),this.setLineWidth(Block.OUTLINE_WIDTH)}function Shape(){}function I_Shape(a){var b=[new Point(a.x-2,a.y),new Point(a.x-1,a.y),new Point(a.x,a.y),new Point(a.x+1,a.y)];Shape.prototype.init.call(this,b,"blue"),this.shift_rotation_dir=!0,this.center_block=this.blocks[2]}function J_Shape(a){var b=[new Point(a.x-1,a.y),new Point(a.x,a.y),new Point(a.x+1,a.y),new Point(a.x+1,a.y+1)];Shape.prototype.init.call(this,b,"orange"),this.shift_rotation_dir=!1,this.center_block=this.blocks[1]}function L_Shape(a){var b=[new Point(a.x-1,a.y),new Point(a.x,a.y),new Point(a.x+1,a.y),new Point(a.x-1,a.y+1)];Shape.prototype.init.call(this,b,"cyan"),this.shift_rotation_dir=!1,this.center_block=this.blocks[1]}function O_Shape(a){var b=[new Point(a.x-1,a.y),new Point(a.x,a.y),new Point(a.x-1,a.y+1),new Point(a.x,a.y+1)];Shape.prototype.init.call(this,b,"red"),this.shift_rotation_dir=!0,this.center_block=this.blocks[1]}function S_Shape(a){var b=[new Point(a.x,a.y),new Point(a.x+1,a.y),new Point(a.x,a.y+1),new Point(a.x-1,a.y+1)];Shape.prototype.init.call(this,b,"green"),this.shift_rotation_dir=!0,this.center_block=this.blocks[0]}function T_Shape(a){var b=[new Point(a.x-1,a.y),new Point(a.x,a.y),new Point(a.x+1,a.y),new Point(a.x,a.y+1)];Shape.prototype.init.call(this,b,"yellow"),this.shift_rotation_dir=!1,this.center_block=this.blocks[1]}function Z_Shape(a){var b=[new Point(a.x,a.y),new Point(a.x-1,a.y),new Point(a.x,a.y+1),new Point(a.x+1,a.y+1)];Shape.prototype.init.call(this,b,"magenta"),this.shift_rotation_dir=!0,this.center_block=this.blocks[0]}function Board(a,b){this.width=a,this.height=b,this.grid={}}function Tetris(){this.board=new Board(Tetris.BOARD_WIDTH,Tetris.BOARD_HEIGHT),this.reloj,this.game_paused=!1,this.game_muted=!1,this.game_over=!1,this.level=1,this.total_lines=0}var all_blocks=new Array;Rectangle.prototype.init=function(a,b){this.px=a.x,this.py=a.y,this.width=b.x-a.x,this.height=b.y-a.y,this.lineWidth=1,this.color="black"},Rectangle.prototype.draw=function(){ctx.fillStyle=this.color,ctx.lineWidth=this.lineWidth,ctx.strokeStyle="black",ctx.strokeRect(this.px,this.py,this.width,this.height),ctx.fillRect(this.px,this.py,this.width,this.height)},Rectangle.prototype.move=function(a,b){this.px+=a,this.py+=b},Rectangle.prototype.erase=function(){ctx.beginPath(),ctx.lineWidth=this.lineWidth+2,ctx.strokeStyle=Tetris.BOARD_COLOR,ctx.rect(this.px,this.py,this.width,this.height),ctx.stroke(),ctx.fillStyle=Tetris.BOARD_COLOR,ctx.fill()},Rectangle.prototype.setLineWidth=function(a){this.lineWidth=a},Rectangle.prototype.setFill=function(a){this.color=a},Block.prototype=new Rectangle,Block.prototype.constructor=Block,Block.prototype.can_move=function(a,b,c){return a.can_move(this.x+b,this.y+c)},Block.prototype.move=function(a,b){this.x+=a,this.y+=b,Rectangle.prototype.move.call(this,a*Block.BLOCK_SIZE,b*Block.BLOCK_SIZE)},Block.BLOCK_SIZE=30,Block.OUTLINE_WIDTH=2,Shape.prototype.init=function(a,b){this.blocks=[];for(coord in a)this.blocks[coord]=new Block(a[coord],b);this.rotation_dir=1,this.shift_rotation_dir=!0,this.center_block=this.blocks[2]},Shape.prototype.draw=function(){for(block in this.blocks)this.blocks[block].draw()},Shape.prototype.can_move=function(a,b,c){for(block in this.blocks)if(!this.blocks[block].can_move(a,b,c))return!1;return!0},Shape.prototype.can_rotate=function(a){var b=this.center_block,c=this.rotation_dir;for(block in this.blocks)if(x=b.x-c*b.y+c*this.blocks[block].y,y=b.y+c*b.x-c*this.blocks[block].x,!a.can_move(x,y))return!1;return!0},Shape.prototype.move=function(a,b){for(block in this.blocks)this.blocks[block].erase();for(block in this.blocks)this.blocks[block].move(a,b)},Shape.prototype.rotate=function(){for(block in this.blocks)this.blocks[block].erase();var a=this.center_block,b=this.rotation_dir;for(block in this.blocks)x=a.x-b*a.y+b*this.blocks[block].y,y=a.y+b*a.x-b*this.blocks[block].x,this.blocks[block].move(x-this.blocks[block].x,y-this.blocks[block].y);this.shift_rotation_dir&&(this.rotation_dir*=-1)},Shape.prototype.getName=function(){var a=/function (.{1,})\(/,b=a.exec(this.constructor.toString());return b&&b.length>1?b[1]:""},I_Shape.prototype=new Shape,I_Shape.prototype.constructor=I_Shape,J_Shape.prototype=new Shape,J_Shape.prototype.constructor=J_Shape,L_Shape.prototype=new Shape,L_Shape.prototype.constructor=L_Shape,O_Shape.prototype=new Shape,O_Shape.prototype.constructor=O_Shape,O_Shape.prototype.can_rotate=function(){return!1},S_Shape.prototype=new Shape,S_Shape.prototype.constructor=S_Shape,T_Shape.prototype=new Shape,T_Shape.prototype.constructor=T_Shape,Z_Shape.prototype=new Shape,Z_Shape.prototype.constructor=Z_Shape,Board.prototype.add_shape=function(a){for(block in a.blocks)this.grid[a.blocks[block].x+","+a.blocks[block].y]=a.blocks[block]},Board.prototype.draw_shape=function(a){for(block in a.blocks)if(void 0!=this.grid[a.blocks[block].x+","+a.blocks[block].y])return!1;return a.draw(),!0},Board.prototype.can_move=function(a,b){return a<this.width&&a>=0&&b<this.height&&b>=0&&void 0==this.grid[a+","+b]},Board.prototype.is_row_complete=function(a){for(var b=0;b<10;b++)if(void 0==this.grid[b+","+a])return!1;return!0},Board.prototype.move_down_rows=function(a){for(var b=a;b>=0;b--)for(var c=b+1,d=0;d<10;d++)this.grid[d+","+c]=this.grid[d+","+b],void 0!=this.grid[d+","+b]&&(this.grid[d+","+b].erase(),this.grid[d+","+b].move(0,1)),delete this.grid[d+","+b]},Board.prototype.delete_row=function(a){for(var b=0;b<10;b++)void 0!=this.grid[b+","+a]&&(block=this.grid[b+","+a],this.grid[b+","+a].erase(),delete this.grid[b+","+a],index=all_blocks.indexOf(block),all_blocks.splice(index,1))},Board.prototype.remove_complete_rows=function(){for(var a=0,b=0;b<20;b++)this.is_row_complete(b)&&(this.delete_row(b),this.move_down_rows(b-1),a++);return a},Board.prototype.game_over=function(){var a=new Image;a.src="images/game_over.png",a.onload=function(){ctx.drawImage(a,0,0)}},Tetris.prototype.init=function(){this.current_shape=this.create_new_shape(),this.next_shape=this.create_new_shape(),this.show_next_shape(),add_to_all_blocks(this.current_shape),this.score=0,this.board.draw_shape(this.current_shape),document.addEventListener("keydown",this.key_pressed.bind(this)),this.animate_shape()},Tetris.SHAPES=[I_Shape,J_Shape,L_Shape,O_Shape,S_Shape,T_Shape,Z_Shape],Tetris.DIRECTION={Left:[-1,0],Right:[1,0],Down:[0,1]},Tetris.BOARD_WIDTH=10,Tetris.BOARD_HEIGHT=20,Tetris.BOARD_COLOR="white",Tetris.prototype.create_new_shape=function(){var a=new Point(Tetris.BOARD_WIDTH/2,0),b=Math.floor(Math.random()*Tetris.SHAPES.length);return new Tetris.SHAPES[b](a)},Tetris.prototype.do_rotate=function(){!this.game_paused&&this.current_shape.can_rotate(this.board)&&(this.current_shape.rotate(),draw_all_blocks(),this.play_sound(rotate_audio))},Tetris.prototype.key_pressed=function(a){switch(a||(a=window.event),a.keyCode){case 32:if(!this.game_over)for(;this.do_move("Down"););break;case 37:this.game_over||this.do_move("Left");break;case 38:this.game_over||this.do_rotate();break;case 39:this.game_over||this.do_move("Right");break;case 40:this.game_over||this.do_move("Down");break;case 77:this.game_paused||this.game_over||(this.game_muted?this.game_muted=!1:this.game_muted=!0,this.pause_resume_music());break;case 109:this.game_paused||this.game_over||(this.game_muted?this.game_muted=!1:this.game_muted=!0,this.pause_resume_music());case 80:this.game_over||this.pause_resume_game();break;case 112:this.game_over||this.pause_resume_game()}},Tetris.prototype.do_move=function(a){if(this.game_paused)return!1;var b=Tetris.DIRECTION[a][0],c=Tetris.DIRECTION[a][1];if(!this.current_shape.can_move(this.board,b,c)){if("Down"==a){this.play_sound(falldown_audio),this.board.add_shape(this.current_shape),draw_all_blocks();var d=this.board.remove_complete_rows();d>0&&(this.play_sound(linekill_audio),this.score+=10*d*this.level,this.total_lines+=d,this.show_score());var e=Math.floor(this.total_lines/10)+1;e>this.level&&(this.level=e,this.play_sound(levelup_audio),this.show_level()),this.current_shape=this.next_shape,this.board.draw_shape(this.current_shape)?(this.next_shape=this.create_new_shape(),this.show_next_shape(),add_to_all_blocks(this.current_shape),draw_all_blocks()):(this.board.game_over(),this.update_record(),clearInterval(this.reloj),delete this.current_shape,this.play_sound(gameover_audio),background_audio.pause(),background_audio.currentTime=0,this.game_over=!0)}return!1}return this.current_shape.move(b,c),draw_all_blocks(),!0},Tetris.prototype.pause_resume_game=function(){this.play_sound(pause_audio),this.game_paused?(document.getElementById("pause").setAttribute("style","display: none"),this.animate_shape(),this.game_paused=!1):(document.getElementById("pause").setAttribute("style","display: initial"),clearInterval(this.reloj),this.game_paused=!0),this.pause_resume_music()},Tetris.prototype.animate_shape=function(a){var b=this;clearInterval(this.reloj),this.reloj=setInterval(function(){b.do_move("Down")},1e3/this.level)},Tetris.prototype.show_next_shape=function(){document.getElementById("shape").src="images/"+this.next_shape.getName().substring(0,7)+".png";},Tetris.prototype.show_level=function(){document.getElementById("level").innerHTML=this.level,this.animate_shape()},Tetris.prototype.show_score=function(){var a=document.getElementById("score");a.innerHTML=this.score},Tetris.prototype.update_record=function(){record<this.score&&(localStorage.setItem("tetris_record",this.score),document.getElementById("record").innerHTML=this.score)},Tetris.prototype.play_sound=function(a){this.game_muted||(a.play(),a.currentTime=0)},Tetris.prototype.pause_resume_music=function(){background_audio.paused?this.game_muted||(document.getElementById("mute").setAttribute("style","display: none"),document.getElementById("sound").setAttribute("style","display: initial"),background_audio.play(),this.game_muted=!1):(document.getElementById("mute").setAttribute("style","display: initial"),document.getElementById("sound").setAttribute("style","display: none"),background_audio.pause())};