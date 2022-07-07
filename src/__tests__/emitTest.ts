import EventEmitter from '../EventEmitter';

test('Test subscribe + emit', () => {
	const mockHandler = jest.fn(() => {});

	const eventEmitter = new EventEmitter();

	eventEmitter.subscribe(mockHandler);

	eventEmitter.emit();
	eventEmitter.emit();

	expect(mockHandler.mock.calls.length).toBe(2);
});

test('Test unsubscribe', () => {
	const mockHandler = jest.fn(() => {});

	const eventEmitter = new EventEmitter();

	eventEmitter.subscribe(mockHandler);

	eventEmitter.emit();
	eventEmitter.emit();

	eventEmitter.unsubscribe(mockHandler);

	eventEmitter.emit();
	eventEmitter.emit();

	expect(mockHandler.mock.calls.length).toBe(2);
});

test('Test cleanup', () => {
	const mockHandler = jest.fn(() => {});

	const eventEmitter = new EventEmitter();

	const cleanup = eventEmitter.subscribe(mockHandler);

	eventEmitter.emit();
	eventEmitter.emit();

	cleanup();

	eventEmitter.emit();
	eventEmitter.emit();

	expect(mockHandler.mock.calls.length).toBe(2);
});

test('Test no call after removal', () => {
	const mockHandler = jest.fn(() => {});

	const eventEmitter = new EventEmitter();

	const cleanup = eventEmitter.subscribe(mockHandler);
	cleanup();

	eventEmitter.emit();
	eventEmitter.emit();

	expect(mockHandler.mock.calls.length).toBe(0);
});

test('Test once', () => {
	const mockHandler = jest.fn(() => {});

	const eventEmitter = new EventEmitter();

	eventEmitter.once(mockHandler);

	eventEmitter.emit();
	eventEmitter.emit();

	expect(mockHandler.mock.calls.length).toBe(1);
});

test('Test parameter', () => {
	const mockHandler = jest.fn((e: number) => {});

	const eventEmitter = new EventEmitter<number>();

	eventEmitter.subscribe(mockHandler);

	eventEmitter.emit(1);
	eventEmitter.emit(2);

	expect(mockHandler.mock.calls.length).toBe(2);
	expect(mockHandler.mock.calls[0][0]).toBe(1);
	expect(mockHandler.mock.calls[1][0]).toBe(2);
});

test('Test clear', () => {
	const mockHandler1 = jest.fn((e: number) => {});
	const mockHandler2 = jest.fn((e: number) => {});

	const eventEmitter = new EventEmitter<number>();

	eventEmitter.subscribe(mockHandler1);
	eventEmitter.subscribe(mockHandler2);

	eventEmitter.emit(1);

	expect(mockHandler1.mock.calls.length).toBe(1);
	expect(mockHandler2.mock.calls.length).toBe(1);

	eventEmitter.clear();
	eventEmitter.emit(1);

	expect(mockHandler1.mock.calls.length).toBe(1);
	expect(mockHandler2.mock.calls.length).toBe(1);
});
