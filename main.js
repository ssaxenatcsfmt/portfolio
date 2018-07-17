var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    
    game.load.tilemap('world', 'assets/booyaa.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/retro.png');
    game.load.image('playa', 'assets/playa.png');

}

var player;
var playerHealth = 100;
var damageAmount = 2;
var cursors;
var map;
var tileset;
var layer;
var collision;
var killlayer;
var healthBar;
function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //  A simple background for our game

    map = game.add.tilemap('world');
    // needs to match name in JSON file under tileset!
    map.addTilesetImage('retro','tiles');
    layer = map.createLayer('background');
    layer.resizeWorld();
    collision = map.createLayer('collision');
    killlayer = map.createLayer('killlayer');
    collision.resizeWorld();
    collision.resizeWorld();
    map.setCollisionBetween(1,1000,true,collision);
    map.setCollisionBetween(1,1000,true,killlayer);
    // The player and its settings
    player = game.add.sprite(32, game.world.height - 300, 'playa');
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(0.5,0.5);
    game.camera.follow(player);
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
ddddddddddddddddddddddddddddddddddddddddswwwwwwd    player.body.collideWorldBounds = false;


    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    var barConfig = {x: 130, y: 30, bg:{
        color:"#00000000"
        }};
           healthBar =  new HealthBar(game, barConfig);
            healthBar.setFixedToCamera(true);
}

function update() {

   game.physics.arcade.collide(player,collision);
    game.physics.arcade.collide(player,killlayer, function(){
        console.log("OUCH!");

        //this is where we damage the player and then decide if the healthbar is empty
        playerHealth-=damageAmount;
//        myname = (enteredName=="Charles")?"Charles the amazing":"Who cares!";
        if(playerHealth<=0){
            playerHealth = 0;
            //player is dead
            die();
        }
        healthBar.setPercent(playerHealth)
    });
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        if (player.scale.x > 0) {
            player.scale.x *= -1;
        }
            
        player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        if (player.scale.x < 0) {
            player.scale.x *= -1;
        }
        player.body.velocity.x = 150;
    }
aawwwwwwwwwwwww
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.blocked.down)
    {
        player.body.velocity.y = -350;
    }

}

function die(){
    console.log("You dead");
}
d