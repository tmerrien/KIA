// Renderer contract. UI/main own the canvas element and the game loop; the renderer only draws.
import type { GameState, GameEvent, Ref } from '../sim/api';

export interface Camera { x: number; y: number; zoom: number } // x,y = world tile at the top-left of the canvas; zoom = px per tile

export interface Renderer {
  resize(cssWidth: number, cssHeight: number, dpr: number): void;
  // Draw one frame. `selected` gets a highlight. `events` from this frame spawn effects (coin pops, sparkles, floating "+12").
  draw(s: GameState, cam: Camera, dt: number, opts: { selected: Ref | null; events: GameEvent[]; pouring: string | null; coinScreen: { x: number; y: number } }): void;
  screenToTile(cam: Camera, px: number, py: number): { x: number; y: number }; // css px -> integer tile
}

export { createRenderer } from './renderer'; // createRenderer(canvas: HTMLCanvasElement): Renderer
