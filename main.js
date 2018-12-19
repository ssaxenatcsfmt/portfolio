
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    
    game.load.tilemap('world', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/retro.png');
    game.load.image('playa', 'assets/playa.png');
    game.load.image('weirdo', 'assets/New Piskel.png')
    


}
var weirdo
var enemy
var player;
var finish
var enemyHealth = 100;
var playerHealth = 100;
var damageAmount = 0.5;
var cursors;
var map;
var tileset;
var layer;
var collision;
var killlayer;
var healthBar;
var enemyHealthBar
var upKey;
var downKey;
var leftKey;
var rightKey;
var enemyfinish;
var playerfinish;
var pdistance
var edistance
var weirdotarget

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
    finish = map.createLayer('finish')
    collision.resizeWorld();
    collision.resizeWorld();
    map.setCollisionBetween(1,1000,true,collision);
    map.setCollisionBetween(1,1000,true,killlayer);
    map.setCollisionBetween(1,1000,true,finish);
    // The player and its settings
    player = game.add.sprite(32, game.world.height - 300, 'playa');
    enemy = game.add.sprite(32, game.world.height - 320, 'playa');
    weirdo = game.add.sprite(240, game.world.height - 250, 'weirdo');
    weirdotarget = player;
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(0.5,0.5);
    game.camera.follow(player);
    enemy.anchor.setTo(0.5,0.5);
    enemy.scale.setTo(0.5,0.5);
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(enemy);
    game.physics.arcade.enable(weirdo);
    weirdo.body.immovable = true;
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 600;
    enemy.body.gravity.y = 600;
    enemy.body.bounce.y = 0.2;
    player.body.collideWorldBounds = false;
    enemy.body.collideWorldBounds = false;

    playerfinish = false;
    enemyfinish = false;

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    var barConfig = {x: 130, y: 30, bg:{
        color:"#00000000"
    }};
    healthBar =  new HealthBar(game, barConfig);
    healthBar.setFixedToCamera(true);


    upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    var barConfig = {x: 130, y: 75, bg:{
        color:"#00000000"
    }};
    enemyHealthBar =  new HealthBar(game, barConfig);
    enemyHealthBar.setFixedToCamera(true); 
}

function update() {
    if (playerHealth > 0){
        game.camera.follow(player);
    }
    else{
        game.camera.follow(enemy); 
    }

    game.physics.arcade.collide(player,finish, function(){
        console.log("player finished");
        playerfinish = true;
        if (playerfinish = true){
            
        };
    });
    game.physics.arcade.collide(enemy,finish, function(){
        console.log("enemy finished");
        enemyfinish = true;
    });
    game.physics.arcade.collide(player,weirdo, function(){
        console.log("OUCH-p!");
        
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
    game.physics.arcade.collide(weirdo,enemy, function(){
        enemyHealth-=damageAmount;
        console.log("OUCH-e!");
        if(enemyHealth<=0){
        enemyHealth = 0;
        //player is dead
        diee();
    }
    enemyHealthBar.setPercent(enemyHealth)

    });
    game.physics.arcade.collide(enemy,collision);
    game.physics.arcade.collide(player,collision);
    game.physics.arcade.collide(enemy,killlayer, function(){
        enemyHealth-=damageAmount;

        console.log("OUCH-e!");
        if(enemyHealth<=0){
            enemyHealth = 0;
            //player is dead
            diee();
        }
        enemyHealthBar.setPercent(enemyHealth)
    
    });
    game.physics.arcade.collide(player,killlayer, function(){
        console.log("OUCH-p!");
        
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
    if (playerHealth>0 && !playerfinish){

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

        
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.blocked.down)

        {
            player.body.velocity.y = -350;
        }
    }

//ENEMY OR PLAYER 2



    if (enemyHealth>0 && !enemyfinish)
    {    
        if (leftKey.isDown)
        {
        enemy.body.velocity.x = -150;
        }
        else if (rightKey.isDown)
        {
            enemy.body.velocity.x = +150;
        }
        else
        {
            enemy.body.velocity.x = 0;
        }
        if (upKey.isDown && enemy.body.blocked.down)
        {
            enemy.body.velocity.y = -350;
        }
    }

    updateEnemy();
}

function updateEnemy()
{
    if (playerHealth == 0){
        weirdotarget = enemy;
    }
    else if (enemyHealth == 0){
        weirdotarget = player;
    }
    else{
        pdistance = calcDistance(player,weirdo);
        edistance = calcDistance(enemy,weirdo); 
        if (pdistance >= edistance){
            weirdotarget = enemy
        }
        else{
            weirdotarget = player
        }

    }
    if (!(playerfinish || enemyfinish)){

        if (weirdo.y > weirdotarget.y){
            weirdo.y -= 0.4
         }
         else{
             weirdo.y += 0.4
         }
         if (weirdo.x > weirdotarget.x){
             weirdo.x -= 0.4
         }
          else{
             weirdo.x += 0.4
         }

    }
    
    //console.log('enemyDistance', calcDistance(enemy,weirdo))
    //console.log('playerDistance', calcDistance(player,weirdo))


function calcDistance(sprite1,sprite2)
{
    return Math.sqrt((sprite1.y-sprite2.y)**2 + (sprite1.x-sprite2.x)**2);
}}

function die(){
    console.log("You dead");
    
}
function diee(){

    console.log("YOU ARE DEADDDDDDDDDDD");
}
function render(){
    game.debug.spriteInfo(player, 32, 32);
}

