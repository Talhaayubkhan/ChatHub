import { createSocketRegistry } from "../services/socketRegistry.js";

const socketRegistry = createSocketRegistry();

const getAllSocketIDs = (users = []) => socketRegistry.getSocketIds(users);

export { socketRegistry, getAllSocketIDs };
