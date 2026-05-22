class StockfishEngine {
  private engine: Worker | null = null;
  private onMoveCallback: ((move: string) => void) | null = null;
  private _isReady = false;

  get isReady() {
    return this._isReady;
  }

  async init() {
    const wasmSupported =
      typeof WebAssembly === "object" &&
      typeof WebAssembly.validate === "function";

    const workerUrl = wasmSupported
      ? "/stockfish/stockfish.wasm.js"
      : "/stockfish/stockfish.js";

    return new Promise<void>((resolve) => {
      this.engine = new Worker(workerUrl);

      this.engine.onmessage = (event: MessageEvent<string>) => {
        const message = event.data;

        if (message === "uciok" || message === "readyok") {
          if (!this._isReady) {
            this._isReady = true;
            resolve();
          }
        } else if (typeof message === "string" && message.startsWith("bestmove")) {
          const move = message.split(" ")[1];
          if (move && move !== "(none)" && this.onMoveCallback) {
            this.onMoveCallback(move);
          }
        }
      };

      this.send("uci");
      this.send("isready");
    });
  }

  private send(command: string) {
    this.engine?.postMessage(command);
  }

  setPosition(fen: string) {
    this.send(`position fen ${fen}`);
  }

  getBestMove(onMove: (move: string) => void, depth = 10) {
    this.onMoveCallback = onMove;
    this.send(`go depth ${depth}`);
  }

  stop() {
    this.send("stop");
  }

  quit() {
    if (this.engine) {
      this.send("quit");
      this.engine.terminate();
      this.engine = null;
      this._isReady = false;
    }
  }
}

export default StockfishEngine;
