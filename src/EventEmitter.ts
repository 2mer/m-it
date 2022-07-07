import EventListener from './EventListener';

export default class EventEmitter<T = void> {
	listeners: EventListener<T>[] = [];

	// subscribe alias
	sub(handler: (e: T) => void) {
		return this.subscribe(handler);
	}
	// subscribe a handler to the emitter,
	// returns a function to unsubscribe the handle
	subscribe(handler: (e: T) => void) {
		this.listeners.push(handler);

		let cleanupCalled = false;

		return () => {
			if (!cleanupCalled) {
				cleanupCalled = true;
				this.unsubscribe(handler);
			}
		};
	}

	// add a handler, once the handler has been called the handler will remove itself from the emitter
	// returns a function to unsubscribe the handler
	once(handler: (e: T) => void) {
		const cleanup = this.subscribe((e: T) => {
			handler(e);

			cleanup();
		});

		return cleanup;
	}

	// unsubscribe alias
	unsub(handler: EventListener<T>) {
		this.unsubscribe(handler);
	}
	unsubscribe(handler: EventListener<T>) {
		const index = this.listeners.indexOf(handler);

		if (index !== -1) {
			this.listeners.splice(index, 1);
		}
	}

	// dispatch an event
	emit(event: T) {
		this.listeners.forEach((handler) => handler(event));
	}

	clear() {
		this.listeners.length = 0;
	}
}
