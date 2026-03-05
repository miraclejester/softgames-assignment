/**
 * Signal
 * 
 * A typed event system that allows objects to dispatch events and other objects to listen to them.
 * Listeners connect by providing a callback function, and are called when the signal is dispatched.
 * 
 * @template T - The type of data passed to listeners when the signal is dispatched
 * 
 * @example
 * // Create a signal that emits a number
 * const onCollision = new Signal<{ x: number; y: number }>();
 * 
 * // Connect a listener
 * onCollision.connect((data) => {
 *     console.log(`Collision at ${data.x}, ${data.y}`);
 * });
 * 
 * // Dispatch the signal
 * onCollision.dispatch({ x: 100, y: 200 });
 */
export class Signal<T = void> {
    private _listeners: Array<(data: T) => void> = [];

    /**
     * Connects a listener function to this signal.
     * The listener will be called whenever the signal is dispatched.
     * 
     * @param listener - The callback function to execute when the signal is dispatched
     * @returns A function that can be called to disconnect this listener
     */
    public connect(listener: (data: T) => void): () => void {
        this._listeners.push(listener);

        // Return a disconnect function
        return () => this.disconnect(listener);
    }

    /**
     * Disconnects a listener function from this signal.
     * 
     * @param listener - The callback function to remove
     * @returns True if the listener was removed, false if it wasn't found
     */
    public disconnect(listener: (data: T) => void): boolean {
        const index = this._listeners.indexOf(listener);
        if (index !== -1) {
            this._listeners.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Connects a listener that will only be called once, then automatically disconnects.
     * 
     * @param listener - The callback function to execute once
     * @returns A function that can be called to disconnect this listener before it fires
     */
    public once(listener: (data: T) => void): () => void {
        const onceWrapped = (data: T): void => {
            this.disconnect(onceWrapped);
            listener(data);
        };
        return this.connect(onceWrapped);
    }

    /**
     * Dispatches the signal, calling all connected listeners with the provided data.
     * 
     * @param data - The data to pass to all listeners
     */
    public dispatch(data: T): void {
        // Create a copy of the listeners array to allow disconnection during dispatch
        const listenersCopy = [...this._listeners];
        listenersCopy.forEach((listener) => listener(data));
    }

    /**
     * Disconnects all listeners from this signal.
     */
    public disconnectAll(): void {
        this._listeners.length = 0;
    }

    /**
     * Gets the number of listeners currently connected to this signal.
     */
    public getListenerCount(): number {
        return this._listeners.length;
    }

    /**
     * Checks if a specific listener is connected to this signal.
     */
    public hasListener(listener: (data: T) => void): boolean {
        return this._listeners.includes(listener);
    }
}