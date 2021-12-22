import { Transform, Vector3 } from 'decentraland-ecs';
import { Spawner } from 'decentraland-builder-scripts/lib/spawner';
import Banca, { Props } from './Banca';

const spawner = new Spawner<Props>(new Banca());
spawner.spawn('banca', new Transform({ position: new Vector3(8, 0, 8) }));
