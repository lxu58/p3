"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

let worldSeed;
let tilesize = 40;

let tile_grass = 1;
let tile_ground = 2;
let tile_fence = 3;
let tile_water = 4;

function p3_preload() {

}

function p3_setup() {
}


function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return tilesize;
}
function p3_tileHeight() {
  return tilesize;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}

let tileType = {};

function set_tileType(i, j, type) {
  let key = [i, j];
  tileType[key] = type;
}

function p3_drawBefore() { }

function p3_drawTile(i, j) {


  let draw_grass = false;
  let draw_ground = false;
  let draw_fence = false;
  let draw_water = false;

  push();

  if (noise(i, j) > 0.6) {
    draw_grass = true;
    set_tileType(i, j, tile_grass);
    if (noise(i + 10, j + 10) > 0.7) {
      draw_fence = true;
      set_tileType(i, j, tile_fence);
    }
  } else {
    draw_ground = true;
    set_tileType(i, j, tile_ground);
    if (noise(i + 10, j + 10) > 0.7) {
      draw_water = true;
      set_tileType(i, j, tile_water);
    }
  }

  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);


  if (draw_grass) {
    noStroke();
    fill(197, 250, 162);
    quad(0, 0, th, 0, th, tw, 0, tw);
    draw_grass = false;
  }


  if (draw_ground) {
    noStroke();
    fill(237, 209, 145);
    quad(0, 0, th, 0, th, tw, 0, tw);
  }

  if (draw_fence) {
    textSize(25);
    textAlign(CENTER)
    text('🍀', th / 2, 2 * tw / 3);



    draw_fence = false;
  }

  if (draw_water) {
    fill(194, 233, 255);
    noStroke();
    ellipse(11, 18, 20, 10);
    ellipse(16, 20, 5, 5);
    ellipse(21, 20, 7, 7);
    draw_water = false;
  }




  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {

    let key = [i, j];

    if (tileType[key] == tile_fence) {

    } else if(tileType[key] == tile_water){
      textSize(20);
      text('🐽', 0, tw / 2);

    }
    else {
      textSize(20);
      let key2 = [i - 1, j];
      let key3 = [i , j + 1];
      let key4 = [i - 1 , j + 1];
      if (tileType[key2] == tile_fence || tileType[key3] == tile_fence || tileType[key4] == tile_fence ) {
        text('🐏', 0, tw / 2);
      } else {
        text('🐖', 0, tw / 2);
      }
    }
  }
  pop();

}







function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("(" + [i, j] + ")", 0, 0);
}


function p3_drawAfter() {

}



