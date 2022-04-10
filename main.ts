import "/utils/reflect.ts";

import ApiServer from "./api/server.ts";
import beans from "./core/beans.ts";
import getContainer from "/core/container.ts";

const container = getContainer();
await container.get<ApiServer>(beans.API_SERVER).start();
