import { createHandler } from '@rivetkit/cloudflare-workers';
import { registry } from './registry';

const { handler, ActorHandler } = createHandler(registry);

export { ActorHandler, handler as default };
