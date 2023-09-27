import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: { [event: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [event: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }
    
    register(event: string, handler: EventHandlerInterface<EventInterface>): void {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        this.eventHandlers[event].push(handler);
    }
    unregister(event: string, handler: EventHandlerInterface<EventInterface>): void {
        if(this.eventHandlers[event]) {
            const index = this.eventHandlers[event].indexOf(handler);
            if (index !== -1) {
                this.eventHandlers[event].splice(index, 1);
            }

        }
    }
    unregisterAll(): void {
        this.eventHandlers = {};
    }
    
    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach(eventHandler => {
                eventHandler.handle(event);
            });
        }
    }
}