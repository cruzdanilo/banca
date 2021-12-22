/// <reference path="../node_modules/decentraland-builder-scripts/types.d.ts"/>
/// <reference path="./assets.d.ts"/>
import {
  ActionButton, Entity, GLTFShape, OnPointerDown,
} from 'decentraland-ecs';
import model from './models/banca.gltf';

export type Props = {
  onOpen?: Actions;
  onClose?: Actions;
  distance?: number;
  hoverText?: string;
};

export default class Banca implements IScript<Props> {
  protected active = false;

  init() {} // eslint-disable-line class-methods-use-this

  toggle(value: boolean) {
    if (this.active === value) return;

    this.active = value;
  }

  spawn(host: Entity, {
    onOpen, onClose, hoverText, distance,
  }: Props, channel: IChannel) {
    host.addComponent(new GLTFShape(model));
    host.addComponent(new OnPointerDown(
      () => channel.sendActions([{ actionId: 'toggle', entityName: host.name, values: {} }]),
      { button: ActionButton.POINTER, hoverText, distance },
    ));

    channel.handleAction('open', ({ sender }) => {
      this.toggle(true);
      if (sender === channel.id) channel.sendActions(onOpen);
    });
    channel.handleAction('close', ({ sender }) => {
      this.toggle(false);
      if (sender === channel.id) channel.sendActions(onClose);
    });
    channel.handleAction('toggle', ({ sender }) => {
      const open = !this.active;
      this.toggle(open);
      if (sender === channel.id) channel.sendActions(open ? onOpen : onClose);
    });
  }
}
