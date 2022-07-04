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

function p3_preload() { }

function p3_setup() { }

let worldSeed;
let tilesize = 40;

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

function p3_drawBefore() { }

function p3_drawTile(i, j) {
  noStroke();

  push();
  



  if (noise(i, j) > 0.4) {
    tile_grass(i, j);
    if (noise(i + 20, j + 20) > 0.6) {
     // tile_fence(i, j);
     fill(255);
     //stroke(1);
     rect(i * tilesize + 0, j * tilesize + 8, 40, 5);
     //rect(i * tilesize + 5, j * tilesize + 5, 5, 15, 2);
     //rect(i * tilesize + 18, j * tilesize + 5, 5, 15, 2);
     //rect(i * tilesize + 31, j * tilesize + 5, 5, 15, 2);
    }
  } else {
    tile_ground(i, j);
    if (noise(i + 20, j + 20) > 0.7) {
      tile_waterPit(i, j)
    }
  }



  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  // let n = clicks[[i, j]] | 0;
  // if (n % 2 == 1) {
  //   fill(255, 255, 0, 180);
  //   ellipse(th/2, tw/2, 10, 10);
  // }

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



function tile_ground(i, j) {
  noStroke();
  fill(237, 209, 145);
  quad(i * tilesize, j * tilesize, (i + 1) * tilesize, j * tilesize,
    (i + 1) * tilesize, (j + 1) * tilesize, i * tilesize, (j + 1) * tilesize);
}

function tile_grass(i, j) {
  noStroke();
  fill(197, 250, 162);
  quad(i * tilesize, j * tilesize, (i + 1) * tilesize, j * tilesize,
    (i + 1) * tilesize, (j + 1) * tilesize, i * tilesize, (j + 1) * tilesize);


}

function tile_fence(i, j) {
  fill(255);
  stroke(1);
  rect(i * tilesize + 0, j * tilesize + 8, 40, 5);
  rect(i * tilesize + 5, j * tilesize + 5, 5, 15, 2);
  rect(i * tilesize + 18, j * tilesize + 5, 5, 15, 2);
  rect(i * tilesize + 31, j * tilesize + 5, 5, 15, 2);

}

function tile_waterPit(i, j) {
  fill(194, 233, 255);
  noStroke();
  ellipse(i * tilesize + 11, j * tilesize + 18, 20, 10);
  ellipse(i * tilesize + 16, j * tilesize + 20, 5, 5);
  ellipse(i * tilesize + 21, j * tilesize + 20, 7, 7);

}

function p3_drawAfter() { }
